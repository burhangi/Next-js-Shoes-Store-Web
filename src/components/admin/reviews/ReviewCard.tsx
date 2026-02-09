'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Clock, AlertCircle, Flag, ThumbsUp, MessageSquare, Image as ImageIcon, User, Package, ExternalLink, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Review, ReviewStatus } from '@/lib/data/reviews';
import { Button } from '@/components/ui/button';

interface ReviewCardProps {
  review: Review;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showActions = true,
  onApprove,
  onReject,
  onDelete,
  onViewDetails,
  className = '',
}) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusConfig = (status: ReviewStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          label: 'Pending',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
        };
      case 'approved':
        return {
          icon: CheckCircle,
          label: 'Approved',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
        };
      case 'rejected':
        return {
          icon: AlertCircle,
          label: 'Rejected',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
        };
      case 'reported':
        return {
          icon: Flag,
          label: 'Reported',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          borderColor: 'border-purple-200',
        };
    }
  };

  const statusConfig = getStatusConfig(review.status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`bg-white rounded-xl border ${statusConfig.borderColor} p-6 hover:shadow-lg transition-shadow ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              {review.customerAvatar ? (
                <img src={review.customerAvatar} alt={review.customerName} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
              {review.verifiedPurchase && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{review.customerEmail}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
          <statusConfig.icon className="w-3 h-3" />
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/admin/products/${review.productId}`}
              className="font-medium text-gray-900 hover:text-[#FF6B35] truncate block"
            >
              {review.productName}
            </Link>
            <p className="text-xs text-gray-600">{review.productCategory}</p>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.title && (
          <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
        )}
        <p className="text-gray-700 mb-3 line-clamp-3">{review.comment}</p>
        
        {review.comment.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-[#FF6B35] hover:text-[#E85A28] flex items-center gap-1"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        
        {expanded && review.comment.length > 150 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-gray-700">{review.comment}</p>
          </div>
        )}
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Customer photos ({review.images.length})</span>
          </div>
          <div className="flex gap-2">
            {review.images.map((image, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80"
                onClick={() => window.open(image, '_blank')}
              >
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{review.helpfulCount} helpful</span>
          </div>
          {review.reportCount > 0 && (
            <div className="flex items-center gap-1 text-red-600">
              <Flag className="w-4 h-4" />
              <span>{review.reportCount} reports</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {review.adminNotes && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              Has notes
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(review.id)}
            className="flex-1"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Details
          </Button>
          
          {review.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => onApprove?.(review.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onReject?.(review.id)}
                className="flex-1"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </>
          )}

          {review.status === 'reported' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(review.id)}
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Flag className="w-4 h-4 mr-1" />
              Review
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(review.id)}
            className="text-gray-400 hover:text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};