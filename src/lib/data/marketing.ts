import { colors, gradients } from '@/lib/theme';

// Marketing Data Types
export type BannerStatus = 'active' | 'inactive' | 'scheduled' | 'expired';
export type BannerPosition = 'home-hero' | 'home-middle' | 'category-top' | 'product-page' | 'sidebar' | 'checkout';
export type BannerType = 'image' | 'video' | 'carousel' | 'text';

export interface MarketingBanner {
  id: string;
  name: string;
  description: string;
  type: BannerType;
  position: BannerPosition;
  status: BannerStatus;
  imageUrl: string;
  mobileImageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
  startDate: string;
  endDate?: string;
  priority: number;
  clicks: number;
  impressions: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
}

export type CouponType = 'percentage' | 'fixed_amount' | 'free_shipping' | 'bogo';
export type CouponStatus = 'active' | 'inactive' | 'expired' | 'used_up';
export type CouponApplicableTo = 'all_products' | 'specific_categories' | 'specific_products' | 'specific_brands';

export interface MarketingCoupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: CouponType;
  value: number;
  status: CouponStatus;
  applicableTo: CouponApplicableTo;
  categories?: string[];
  products?: string[];
  brands?: string[];
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  userLimit?: number;
  startDate: string;
  endDate?: string;
  singleUse: boolean;
  createdAt: string;
  updatedAt: string;
}

export type DiscountType = 'seasonal' | 'flash_sale' | 'bulk_discount' | 'loyalty' | 'clearance';
export type DiscountStatus = 'active' | 'scheduled' | 'expired' | 'paused';

export interface MarketingDiscount {
  id: string;
  name: string;
  description: string;
  type: DiscountType;
  status: DiscountStatus;
  value: number;
  valueType: 'percentage' | 'fixed';
  applicableTo: CouponApplicableTo;
  categories?: string[];
  products?: string[];
  brands?: string[];
  minQuantity?: number;
  maxQuantity?: number;
  startDate: string;
  endDate: string;
  priority: number;
  usageCount: number;
  revenueGenerated: number;
  createdAt: string;
  updatedAt: string;
}

export type EmailCampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
export type EmailCampaignType = 'newsletter' | 'promotional' | 'abandoned_cart' | 'welcome' | 're_engagement';

export interface MarketingEmailCampaign {
  id: string;
  name: string;
  description: string;
  type: EmailCampaignType;
  status: EmailCampaignStatus;
  subject: string;
  previewText?: string;
  recipientCount: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  scheduleDate?: string;
  sentDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock Data with your color scheme
export const mockBanners: MarketingBanner[] = [
  {
    id: 'banner-001',
    name: 'Summer Sale 2024',
    description: 'Main homepage banner promoting summer collection',
    type: 'image',
    position: 'home-hero',
    status: 'active',
    imageUrl: '/banners/summer-sale-hero.jpg',
    mobileImageUrl: '/banners/summer-sale-hero-mobile.jpg',
    title: 'Summer Collection 2024',
    subtitle: 'Up to 50% off on all summer footwear',
    ctaText: 'Shop Now',
    ctaLink: '/products?category=running&sale=true',
    backgroundColor: colors.primary.DEFAULT,
    textColor: '#FFFFFF',
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    priority: 1,
    clicks: 1245,
    impressions: 15678,
    conversionRate: 7.9,
    createdAt: '2024-04-15T10:30:00Z',
    updatedAt: '2024-05-20T14:45:00Z',
  },
  // Additional banners with consistent color scheme...
];

export const mockCoupons: MarketingCoupon[] = [
  {
    id: 'coupon-001',
    code: 'SUMMER24',
    name: 'Summer Sale 2024',
    description: 'Summer collection discount',
    type: 'percentage',
    value: 20,
    status: 'active',
    applicableTo: 'all_products',
    minPurchaseAmount: 50,
    maxDiscountAmount: 100,
    usageLimit: 1000,
    usageCount: 456,
    userLimit: 1,
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    singleUse: true,
    createdAt: '2024-04-15T10:30:00Z',
    updatedAt: '2024-05-20T14:45:00Z',
  },
  // Additional coupons...
];

export const mockDiscounts: MarketingDiscount[] = [
  {
    id: 'discount-001',
    name: 'Summer Clearance',
    description: 'End of season clearance sale',
    type: 'clearance',
    status: 'active',
    value: 40,
    valueType: 'percentage',
    applicableTo: 'all_products',
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    priority: 1,
    usageCount: 3456,
    revenueGenerated: 45678.90,
    createdAt: '2024-05-01T09:30:00Z',
    updatedAt: '2024-05-20T16:45:00Z',
  },
  // Additional discounts...
];

export const mockEmailCampaigns: MarketingEmailCampaign[] = [
  {
    id: 'email-001',
    name: 'Weekly Newsletter #45',
    description: 'Weekly product updates and news',
    type: 'newsletter',
    status: 'sent',
    subject: 'New Arrivals & Summer Styles Inside!',
    previewText: 'Check out our latest collection and exclusive offers',
    recipientCount: 12500,
    sentCount: 12480,
    openRate: 24.5,
    clickRate: 8.2,
    bounceRate: 1.2,
    unsubscribeRate: 0.3,
    scheduleDate: '2024-05-15T10:00:00Z',
    sentDate: '2024-05-15T10:05:00Z',
    createdAt: '2024-05-14T14:30:00Z',
    updatedAt: '2024-05-16T09:45:00Z',
  },
  // Additional email campaigns...
];

// Helper Functions
export const getBanners = (filters?: { status?: BannerStatus; position?: BannerPosition }) => {
  let filtered = [...mockBanners];
  if (filters?.status) {
    filtered = filtered.filter(banner => banner.status === filters.status);
  }
  if (filters?.position) {
    filtered = filtered.filter(banner => banner.position === filters.position);
  }
  return filtered;
};

export const getCoupons = (filters?: { status?: CouponStatus; type?: CouponType }) => {
  let filtered = [...mockCoupons];
  if (filters?.status) {
    filtered = filtered.filter(coupon => coupon.status === filters.status);
  }
  if (filters?.type) {
    filtered = filtered.filter(coupon => coupon.type === filters.type);
  }
  return filtered;
};

export const getDiscounts = (filters?: { status?: DiscountStatus; type?: DiscountType }) => {
  let filtered = [...mockDiscounts];
  if (filters?.status) {
    filtered = filtered.filter(discount => discount.status === filters.status);
  }
  if (filters?.type) {
    filtered = filtered.filter(discount => discount.type === filters.type);
  }
  return filtered;
};

export const getEmailCampaigns = (filters?: { status?: EmailCampaignStatus; type?: EmailCampaignType }) => {
  let filtered = [...mockEmailCampaigns];
  if (filters?.status) {
    filtered = filtered.filter(campaign => campaign.status === filters.status);
  }
  if (filters?.type) {
    filtered = filtered.filter(campaign => campaign.type === filters.type);
  }
  return filtered;
};

// Marketing Utility Functions
export const calculateCTR = (clicks: number, impressions: number): string => {
  if (impressions === 0) return '0%';
  return ((clicks / impressions) * 100).toFixed(1) + '%';
};

export const formatMarketingDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatMarketingDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
    case 'sent':
      return colors.success;
    case 'scheduled':
    case 'sending':
      return colors.info;
    case 'inactive':
    case 'paused':
      return colors.warning;
    case 'expired':
    case 'cancelled':
    case 'used_up':
      return colors.error;
    case 'draft':
      return colors.neutral[500];
    default:
      return colors.neutral[400];
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'active':
    case 'sent':
      return 'CheckCircle';
    case 'scheduled':
      return 'Calendar';
    case 'sending':
      return 'Send';
    case 'inactive':
    case 'paused':
      return 'PauseCircle';
    case 'expired':
    case 'cancelled':
      return 'XCircle';
    case 'draft':
      return 'Edit';
    default:
      return 'Circle';
  }
};