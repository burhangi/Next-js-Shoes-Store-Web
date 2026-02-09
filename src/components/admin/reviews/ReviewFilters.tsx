'use client';

import React from 'react';
import { Search, Filter, Star, Calendar, X } from 'lucide-react';
import { ReviewStatus } from '@/lib/data/reviews';

interface ReviewFiltersProps {
  filters: {
    status: ReviewStatus | 'all';
    rating?: number;
    search: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy: 'newest' | 'oldest' | 'highest-rating' | 'lowest-rating' | 'most-helpful';
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
  showSort?: boolean;
  showDateRange?: boolean;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  showSort = true,
  showDateRange = true,
}) => {
  const statusOptions: Array<{ value: ReviewStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Reviews' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'reported', label: 'Reported' },
  ];

  const ratingOptions = [
    { value: 5, label: '★★★★★' },
    { value: 4, label: '★★★★☆' },
    { value: 3, label: '★★★☆☆' },
    { value: 2, label: '★★☆☆☆' },
    { value: 1, label: '★☆☆☆☆' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest-rating', label: 'Highest Rating' },
    { value: 'lowest-rating', label: 'Lowest Rating' },
    { value: 'most-helpful', label: 'Most Helpful' },
  ];

  const handleStatusChange = (value: ReviewStatus | 'all') => {
    onFiltersChange({ ...filters, status: value });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating: filters.rating === rating ? undefined : rating });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value as any });
  };

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    onFiltersChange({
      ...filters,
      [type === 'from' ? 'dateFrom' : 'dateTo']: value,
    });
  };

  const hasActiveFilters = filters.status !== 'all' || filters.rating || filters.search || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews by customer name, product, or comment..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
          />
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filters.status === option.value
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Star className="w-4 h-4 inline mr-1" />
            Rating
          </label>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleRatingChange(option.value)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filters.rating === option.value
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        {showDateRange && (
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date Range
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                />
              </div>
              <div className="flex-1">
                <input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Sort Options */}
        {showSort && (
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filters.status !== 'all' && (
                <span className="px-2 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs rounded-full">
                  Status: {statusOptions.find(s => s.value === filters.status)?.label}
                </span>
              )}
              {filters.rating && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  Rating: {ratingOptions.find(r => r.value === filters.rating)?.label}
                </span>
              )}
              {filters.dateFrom && filters.dateTo && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  Date: {filters.dateFrom} to {filters.dateTo}
                </span>
              )}
            </div>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};