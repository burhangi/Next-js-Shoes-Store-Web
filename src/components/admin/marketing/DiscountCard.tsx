'use client';

import React from 'react';
import { Percent, DollarSign, Zap, Package, Award, Tag, Calendar, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { MarketingDiscount } from '@/lib/data/marketing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface DiscountCardProps {
  discount: MarketingDiscount;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
  className?: string;
}

export const DiscountCard: React.FC<DiscountCardProps> = ({
  discount,
  onEdit,
  onDelete,
  onPreview,
  className = '',
}) => {
  const getStatusConfig = (status: MarketingDiscount['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        };
      case 'expired':
        return {
          label: 'Expired',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
        };
      case 'paused':
        return {
          label: 'Paused',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
        };
    }
  };

  const getTypeIcon = (type: MarketingDiscount['type']) => {
    switch (type) {
      case 'seasonal': return Calendar;
      case 'flash_sale': return Zap;
      case 'bulk_discount': return Package;
      case 'loyalty': return Award;
      case 'clearance': return Tag;
      default: return Tag;
    }
  };

  const getTypeLabel = (type: MarketingDiscount['type']) => {
    const labels: Record<MarketingDiscount['type'], string> = {
      'seasonal': 'Seasonal Sale',
      'flash_sale': 'Flash Sale',
      'bulk_discount': 'Bulk Discount',
      'loyalty': 'Loyalty Discount',
      'clearance': 'Clearance Sale',
    };
    return labels[type];
  };

  const getApplicableToLabel = (applicableTo: MarketingDiscount['applicableTo']) => {
    const labels: Record<MarketingDiscount['applicableTo'], string> = {
      'all_products': 'All Products',
      'specific_categories': 'Specific Categories',
      'specific_products': 'Specific Products',
      'specific_brands': 'Specific Brands',
    };
    return labels[applicableTo];
  };

  const formatValue = () => {
    if (discount.valueType === 'percentage') {
      return `${discount.value}% Off`;
    } else {
      return `$${discount.value} Off`;
    }
  };

  const statusConfig = getStatusConfig(discount.status);
  const TypeIcon = getTypeIcon(discount.type);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatRevenue = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TypeIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-900 text-lg">{discount.name}</h3>
              <Badge variant="outline" className={`${statusConfig.bgColor} ${statusConfig.color} border-transparent`}>
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{discount.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{formatValue()}</div>
            <div className="text-xs text-gray-600">{getTypeLabel(discount.type)}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm">
            <div className="text-gray-600 mb-1">Applicable To</div>
            <div className="font-medium text-gray-900">{getApplicableToLabel(discount.applicableTo)}</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-600 mb-1">Priority</div>
            <div className="font-medium text-gray-900">{discount.priority}</div>
          </div>
          {discount.minQuantity && (
            <div className="text-sm">
              <div className="text-gray-600 mb-1">Min. Quantity</div>
              <div className="font-medium text-gray-900">{discount.minQuantity}</div>
            </div>
          )}
          {discount.maxQuantity && (
            <div className="text-sm">
              <div className="text-gray-600 mb-1">Max. Quantity</div>
              <div className="font-medium text-gray-900">{discount.maxQuantity}</div>
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(discount.startDate)} - {formatDate(discount.endDate)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <div className="text-lg font-bold text-gray-900">{discount.usageCount.toLocaleString()}</div>
            </div>
            <div className="text-xs text-gray-600">Times Used</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <div className="text-lg font-bold text-gray-900">{formatRevenue(discount.revenueGenerated)}</div>
            </div>
            <div className="text-xs text-gray-600">Revenue</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Percent className="w-4 h-4 text-gray-400" />
              <div className="text-lg font-bold text-gray-900">
                {discount.usageCount > 0 ? Math.round((discount.revenueGenerated / discount.usageCount)) : 0}
              </div>
            </div>
            <div className="text-xs text-gray-600">Avg. Order</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview?.(discount.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(discount.id)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(discount.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};