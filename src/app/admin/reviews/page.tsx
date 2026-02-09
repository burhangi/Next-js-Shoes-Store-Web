'use client';

import React, { useState, useMemo } from 'react';
import { ReviewCard } from '@/components/admin/reviews/ReviewCard';
import { ReviewFilters } from '@/components/admin/reviews/ReviewFilters';
import { ReviewStats } from '@/components/admin/reviews/ReviewStats';
import { getReviews, getReviewStats, updateReviewStatus, deleteReview, ReviewStatus } from '@/lib/data/reviews';
import { MessageSquare, CheckCircle, XCircle, Trash2, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReviewsPage() {
  const [filters, setFilters] = useState({
    status: 'all' as ReviewStatus | 'all',
    rating: undefined as number | undefined,
    search: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'newest' as 'newest' | 'oldest' | 'highest-rating' | 'lowest-rating' | 'most-helpful',
  });

  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [stats] = useState(getReviewStats());

  // Get filtered reviews
  const reviews = useMemo(() => {
    return getReviews(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
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
    if (updateReviewStatus(reviewId, 'approved')) {
      // Remove from selected if in list
      setSelectedReviews(prev => prev.filter(id => id !== reviewId));
      // Refresh would happen in real app
    }
  };

  const handleReject = (reviewId: string) => {
    if (window.confirm('Are you sure you want to reject this review?')) {
      if (updateReviewStatus(reviewId, 'rejected')) {
        setSelectedReviews(prev => prev.filter(id => id !== reviewId));
      }
    }
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      if (deleteReview(reviewId)) {
        setSelectedReviews(prev => prev.filter(id => id !== reviewId));
      }
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

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedReviews.length} selected reviews? This action cannot be undone.`)) {
      selectedReviews.forEach(reviewId => {
        deleteReview(reviewId);
      });
      setSelectedReviews([]);
    }
  };

  const handleViewDetails = (reviewId: string) => {
    // Navigate to review detail or open modal
    console.log('View review:', reviewId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600">Manage and moderate customer feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reviews/reported"
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            Reported Reviews
          </Link>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ReviewStats stats={stats} />

      {/* Filters */}
      <ReviewFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
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
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve Selected
                </Button>
                <Button
                  onClick={handleBulkReject}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject Selected
                </Button>
                <Button
                  onClick={handleBulkDelete}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Selected
                </Button>
              </div>
            </div>

            <Button
              onClick={() => setSelectedReviews([])}
              variant="ghost"
              size="sm"
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

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
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600 mb-6">
            {filters.search 
              ? `No reviews match "${filters.search}"`
              : 'No reviews match the selected filters'
            }
          </p>
          <Button
            onClick={handleClearFilters}
            variant="outline"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination (Optional) */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-gray-600">
            Showing {reviews.length} of {stats.total} reviews
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-[#FF6B35] text-white border-[#FF6B35]">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}