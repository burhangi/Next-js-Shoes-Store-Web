'use client';

import React from 'react';
import { Percent, DollarSign, Truck, Gift, Tag, Copy, Calendar, Users, Edit, Trash2, Eye } from 'lucide-react';
import { MarketingCoupon } from '@/lib/data/marketing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface CouponCardProps {
  coupon: MarketingCoupon;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCopy?: (code: string) => void;
  onPreview?: (id: string) => void;
  className?: string;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onEdit,
  onDelete,
  onCopy,
  onPreview,
  className = '',
}) => {
  const getStatusConfig = (status: MarketingCoupon['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        };
      case 'inactive':
        return {
          label: 'Inactive',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
      case 'expired':
        return {
          label: 'Expired',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
        };
      case 'used_up':
        return {
          label: 'Used Up',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
        };
    }
  };

  const getTypeIcon = (type: MarketingCoupon['type']) => {
    switch (type) {
      case 'percentage': return Percent;
      case 'fixed_amount': return DollarSign;
      case 'free_shipping': return Truck;
      case 'bogo': return Gift;
      default: return Tag;
    }
  };

  const getApplicableToLabel = (applicableTo: MarketingCoupon['applicableTo']) => {
    const labels: Record<MarketingCoupon['applicableTo'], string> = {
      'all_products': 'All Products',
      'specific_categories': 'Specific Categories',
      'specific_products': 'Specific Products',
      'specific_brands': 'Specific Brands',
    };
    return labels[applicableTo];
  };

  const formatValue = () => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}% Off`;
      case 'fixed_amount':
        return `$${coupon.value} Off`;
      case 'free_shipping':
        return 'Free Shipping';
      case 'bogo':
        return `Buy 1 Get 1 ${coupon.value}% Off`;
      default:
        return `${coupon.value}% Off`;
    }
  };

  const statusConfig = getStatusConfig(coupon.status);
  const TypeIcon = getTypeIcon(coupon.type);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    onCopy?.(coupon.code);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TypeIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-900 text-lg">{coupon.name}</h3>
              <Badge variant="outline" className={`${statusConfig.bgColor} ${statusConfig.color} border-transparent`}>
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{coupon.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Coupon Code */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <code className="font-mono font-bold text-lg text-gray-900">{coupon.code}</code>
            <button
              onClick={handleCopyCode}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">{formatValue()}</div>
            <div className="text-xs text-gray-600">{getApplicableToLabel(coupon.applicableTo)}</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-sm">
            <div className="text-gray-600 mb-1">Min. Purchase</div>
            <div className="font-medium text-gray-900">
              {coupon.minPurchaseAmount ? `$${coupon.minPurchaseAmount}` : 'None'}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-600 mb-1">Max. Discount</div>
            <div className="font-medium text-gray-900">
              {coupon.maxDiscountAmount ? `$${coupon.maxDiscountAmount}` : 'None'}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-600 mb-1">Usage Limit</div>
            <div className="font-medium text-gray-900">
              {coupon.usageLimit ? `${coupon.usageCount}/${coupon.usageLimit}` : 'Unlimited'}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-600 mb-1">User Limit</div>
            <div className="font-medium text-gray-900">
              {coupon.userLimit ? `${coupon.userLimit} use${coupon.userLimit === 1 ? '' : 's'}` : 'Unlimited'}
            </div>
          </div>
        </div>

        {/* Dates & Usage */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(coupon.startDate)}
              {coupon.endDate && ` - ${formatDate(coupon.endDate)}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{coupon.usageCount.toLocaleString()} uses</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview?.(coupon.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(coupon.id)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(coupon.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};