import { MarketingBanner, MarketingCoupon, MarketingDiscount, MarketingEmailCampaign } from '@/lib/data/marketing';

// Banner Utilities
export const calculateBannerCTR = (banner: MarketingBanner): number => {
  if (banner.impressions === 0) return 0;
  return Number(((banner.clicks / banner.impressions) * 100).toFixed(1));
};

export const getBannerStatusColor = (status: MarketingBanner['status']): string => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800',
  };
  return colors[status];
};

// Coupon Utilities
export const formatCouponValue = (coupon: MarketingCoupon): string => {
  switch (coupon.type) {
    case 'percentage':
      return `${coupon.value}% OFF`;
    case 'fixed_amount':
      return `$${coupon.value} OFF`;
    case 'free_shipping':
      return 'FREE SHIPPING';
    case 'bogo':
      return `BUY 1 GET 1 ${coupon.value}% OFF`;
    default:
      return `${coupon.value}% OFF`;
  }
};

export const getCouponStatusColor = (status: MarketingCoupon['status']): string => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    expired: 'bg-red-100 text-red-800',
    used_up: 'bg-purple-100 text-purple-800',
  };
  return colors[status];
};

// Discount Utilities
export const formatDiscountValue = (discount: MarketingDiscount): string => {
  if (discount.valueType === 'percentage') {
    return `${discount.value}% OFF`;
  } else {
    return `$${discount.value} OFF`;
  }
};

export const getDiscountStatusColor = (status: MarketingDiscount['status']): string => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800',
    paused: 'bg-yellow-100 text-yellow-800',
  };
  return colors[status];
};

// Email Campaign Utilities
export const getCampaignStatusColor = (status: MarketingEmailCampaign['status']): string => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    sending: 'bg-yellow-100 text-yellow-800',
    sent: 'bg-green-100 text-green-800',
    paused: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status];
};

// Date Formatting
export const formatMarketingDate = (dateString: string, includeTime: boolean = false): string => {
  const date = new Date(dateString);
  
  if (includeTime) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Number Formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Validation Functions
export const validateBannerData = (data: Partial<MarketingBanner>): string[] => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) errors.push('Banner name is required');
  if (!data.description?.trim()) errors.push('Description is required');
  if (data.priority && (data.priority < 1 || data.priority > 10)) {
    errors.push('Priority must be between 1 and 10');
  }
  if (data.startDate && new Date(data.startDate) < new Date()) {
    errors.push('Start date must be in the future');
  }
  
  return errors;
};

export const validateCouponData = (data: Partial<MarketingCoupon>): string[] => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) errors.push('Coupon name is required');
  if (!data.code?.trim()) errors.push('Coupon code is required');
  if (data.value && data.value < 0) errors.push('Value must be positive');
  if (data.minPurchaseAmount && data.minPurchaseAmount < 0) {
    errors.push('Minimum purchase amount must be positive');
  }
  
  return errors;
};

// Helper Functions
export const generateCouponCode = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const calculateCampaignProgress = (campaign: MarketingEmailCampaign): number => {
  if (campaign.recipientCount === 0) return 0;
  return Math.round((campaign.sentCount / campaign.recipientCount) * 100);
};

export const getTimeRemaining = (endDate: string): string => {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
};

export default {
  calculateBannerCTR,
  getBannerStatusColor,
  formatCouponValue,
  getCouponStatusColor,
  formatDiscountValue,
  getDiscountStatusColor,
  getCampaignStatusColor,
  formatMarketingDate,
  formatCurrency,
  formatPercentage,
  validateBannerData,
  validateCouponData,
  generateCouponCode,
  calculateCampaignProgress,
  getTimeRemaining,
};