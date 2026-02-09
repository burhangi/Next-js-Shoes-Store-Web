'use client';

import React, { useState, useMemo } from 'react';
import { ReviewCard } from '@/components/admin/reviews/ReviewCard';
import { ReviewFilters } from '@/components/admin/reviews/ReviewFilters';
import { getReviews, updateReviewStatus, deleteReview } from '@/lib/data/reviews';
import { Flag, AlertTriangle, Shield, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReportedReviewsPage() {
  const [filters, setFilters] = useState({
    status: 'reported' as const,
    rating: undefined as number | undefined,
    search: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'newest' as const,
  });

  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  // Get reported reviews
  const reviews = useMemo(() => {
    return getReviews(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'reported',
      rating: undefined,
      search: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'newest',
    });
    setSelectedReviews([]);
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map(r => r.id));
    }
  };

  const handleApprove = (reviewId: string) => {
    updateReviewStatus(reviewId, 'approved');
    setSelectedReviews(prev => prev.filter(id => id !== reviewId));
  };

  const handleReject = (reviewId: string) => {
    if (window.confirm('Are you sure you want to reject this reported review?')) {
      updateReviewStatus(reviewId, 'rejected');
      setSelectedReviews(prev => prev.filter(id => id !== reviewId));
    }
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this reported review?')) {
      deleteReview(reviewId);
      setSelectedReviews(prev => prev.filter(id => id !== reviewId));
    }
  };

  const handleBulkApprove = () => {
    if (window.confirm(`Approve ${selectedReviews.length} reported reviews?`)) {
      selectedReviews.forEach(reviewId => {
        updateReviewStatus(reviewId, 'approved');
      });
      setSelectedReviews([]);
    }
  };

  const handleBulkReject = () => {
    if (window.confirm(`Reject ${selectedReviews.length} reported reviews?`)) {
      selectedReviews.forEach(reviewId => {
        updateReviewStatus(reviewId, 'rejected');
      });
      setSelectedReviews([]);
    }
  };

  const handleViewDetails = (reviewId: string) => {
    console.log('View reported review:', reviewId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reported Reviews</h1>
          <p className="text-gray-600">Reviews reported by users for violating guidelines</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reviews"
            className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
          >
            Back to all reviews
          </Link>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800">Important Notice</h3>
            <p className="text-red-700 mt-1">
              These reviews have been reported by users for violating community guidelines. 
              Please review each case carefully before taking action. Consider the report reasons and community impact.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ReviewFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        showDateRange={false}
      />

      {/* Bulk Actions */}
      {selectedReviews.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedReviews.length === reviews.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-[#FF6B35] rounded border-gray-300 focus:ring-[#FF6B35]/20"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {selectedReviews.length} review{selectedReviews.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleBulkApprove}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Keep Selected
                </Button>
                <Button
                  onClick={handleBulkReject}
                  variant="destructive"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Remove Selected
                </Button>
              </div>
            </div>

            <Button
              onClick={() => setSelectedReviews([])}
              variant="ghost"
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Review Guidelines */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-purple-800">Report Review Guidelines</h3>
            <p className="text-purple-700 mt-2 mb-3">
              Common reasons for reporting reviews. Take action based on the severity:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-1">🚫 Inappropriate Content</h4>
                <p className="text-sm text-purple-700">Hate speech, harassment, or explicit content</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-1">📝 False Information</h4>
                <p className="text-sm text-purple-700">Misleading claims about the product</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-1">📢 Spam or Promotion</h4>
                <p className="text-sm text-purple-700">Advertising other products or services</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-1">👤 Impersonation</h4>
                <p className="text-sm text-purple-700">Pretending to be someone else</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="relative">
              <ReviewCard
                review={review}
                showActions
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                onViewDetails={handleViewDetails}
                className="border-purple-200"
              />
              
              {/* Report Count Badge */}
              {review.reportCount > 0 && (
                <div className="absolute -top-2 -right-2">
                  <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                    <Flag className="w-3 h-3" />
                    {review.reportCount} report{review.reportCount !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reported reviews</h3>
          <p className="text-gray-600 mb-6">
            Great news! All reported reviews have been processed.
          </p>
          <Link href="/admin/reviews">
            <Button>
              Back to all reviews
            </Button>
          </Link>
        </div>
      )}

      {/* Report Statistics */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {reviews.length}
              </div>
              <p className="text-sm text-gray-600">Currently Reported</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {reviews.filter(r => r.reportCount > 1).length}
              </div>
              <p className="text-sm text-gray-600">Multiple Reports</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(reviews.reduce((sum, r) => sum + r.reportCount, 0) / reviews.length)}
              </div>
              <p className="text-sm text-gray-600">Avg. Reports per Review</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}