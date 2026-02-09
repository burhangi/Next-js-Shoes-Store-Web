'use client';

import React, { useState, useMemo } from 'react';
import { ReviewCard } from '@/components/admin/reviews/ReviewCard';
import { ReviewFilters } from '@/components/admin/reviews/ReviewFilters';
import { getReviews, updateReviewStatus, deleteReview } from '@/lib/data/reviews';
import { Clock, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PendingReviewsPage() {
  const [filters, setFilters] = useState({
    status: 'pending' as const,
    rating: undefined as number | undefined,
    search: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'newest' as const,
  });

  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  // Get pending reviews
  const reviews = useMemo(() => {
    return getReviews(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'pending',
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
    if (window.confirm('Are you sure you want to reject this review?')) {
      updateReviewStatus(reviewId, 'rejected');
      setSelectedReviews(prev => prev.filter(id => id !== reviewId));
    }
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
      setSelectedReviews(prev => prev.filter(id => id !== reviewId));
    }
  };

  const handleBulkApprove = () => {
    if (window.confirm(`Approve ${selectedReviews.length} selected reviews?`)) {
      selectedReviews.forEach(reviewId => {
        updateReviewStatus(reviewId, 'approved');
      });
      setSelectedReviews([]);
    }
  };

  const handleBulkReject = () => {
    if (window.confirm(`Reject ${selectedReviews.length} selected reviews?`)) {
      selectedReviews.forEach(reviewId => {
        updateReviewStatus(reviewId, 'rejected');
      });
      setSelectedReviews([]);
    }
  };

  const handleViewDetails = (reviewId: string) => {
    console.log('View review:', reviewId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Reviews</h1>
          <p className="text-gray-600">Reviews awaiting moderation and approval</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reviews"
            className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
          >
            View all reviews
          </Link>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800">Pending Reviews Alert</h3>
            <p className="text-yellow-700 mt-1">
              You have {reviews.length} review{reviews.length !== 1 ? 's' : ''} waiting for approval. 
              Please review each one carefully before publishing.
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
                  Approve Selected
                </Button>
                <Button
                  onClick={handleBulkReject}
                  variant="destructive"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject Selected
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

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => {
            const allIds = reviews.map(r => r.id);
            setSelectedReviews(allIds);
            handleBulkApprove();
          }}
          className="flex-1 bg-green-600 hover:bg-green-700 h-14 text-lg"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Approve All Pending
        </Button>
        <Button
          onClick={() => {
            const allIds = reviews.map(r => r.id);
            setSelectedReviews(allIds);
            handleBulkReject();
          }}
          variant="destructive"
          className="flex-1 h-14 text-lg"
        >
          <XCircle className="w-5 h-5 mr-2" />
          Reject All Pending
        </Button>
      </div>

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showActions
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
          <p className="text-gray-600 mb-6">
            No pending reviews to moderate. All reviews have been processed.
          </p>
          <Link href="/admin/reviews">
            <Button>
              Back to all reviews
            </Button>
          </Link>
        </div>
      )}

      {/* Review Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800">Moderation Guidelines</h3>
            <ul className="text-blue-700 mt-2 space-y-1 list-disc list-inside">
              <li>Approve reviews that provide genuine feedback and follow community guidelines</li>
              <li>Reject reviews with inappropriate language, hate speech, or personal attacks</li>
              <li>Check for spam or promotional content in reviews</li>
              <li>Verify that reviews are based on actual purchases (check verified status)</li>
              <li>Ensure reviews are relevant to the product and provide helpful information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}