import { Product } from './types';

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'reported';
export type ReviewType = 'product' | 'service' | 'store';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  productCategory: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  reportCount: number;
  status: ReviewStatus;
  type: ReviewType;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  reportedBy?: Array<{
    userId: string;
    reason: string;
    reportedAt: string;
  }>;
}

export interface ReviewStats {
  total: number;
  averageRating: number;
  pending: number;
  approved: number;
  rejected: number;
  reported: number;
  ratingBreakdown: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  recentActivity: {
    date: string;
    reviews: number;
    averageRating: number;
  }[];
}

export interface ReviewFilter {
  status?: ReviewStatus | 'all';
  rating?: number;
  productId?: string;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'highest-rating' | 'lowest-rating' | 'most-helpful';
}

// Mock Data
export const mockReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    productName: 'Nike Air Max 270',
    productImage: '/products/nike-airmax-270.jpg',
    productCategory: 'Running',
    customerId: 'cust-001',
    customerName: 'Alex Johnson',
    customerEmail: 'alex.johnson@example.com',
    customerAvatar: '/avatars/alex-johnson.jpg',
    rating: 5,
    title: 'Best running shoes ever!',
    comment: 'I\'ve been using these for my daily runs and they\'re absolutely amazing. Perfect cushioning and great support. The quality is top-notch!',
    images: ['/reviews/rev-001-1.jpg', '/reviews/rev-001-2.jpg'],
    verifiedPurchase: true,
    helpfulCount: 24,
    reportCount: 0,
    status: 'approved',
    type: 'product',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'rev-002',
    productId: 'prod-002',
    productName: 'Adidas Ultraboost 22',
    productImage: '/products/adidas-ultraboost22.jpg',
    productCategory: 'Running',
    customerId: 'cust-002',
    customerName: 'Sarah Miller',
    customerEmail: 'sarah.miller@example.com',
    customerAvatar: '/avatars/sarah-miller.jpg',
    rating: 4,
    title: 'Great but runs small',
    comment: 'Comfortable shoes but they run a bit small. I recommend going half size up. Otherwise, excellent quality and great for workouts.',
    images: ['/reviews/rev-002-1.jpg'],
    verifiedPurchase: true,
    helpfulCount: 12,
    reportCount: 0,
    status: 'pending',
    type: 'product',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: 'rev-003',
    productId: 'prod-003',
    productName: 'Jordan 1 Retro High',
    productImage: '/products/jordan1-retro.jpg',
    productCategory: 'Lifestyle',
    customerId: 'cust-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.johnson@example.com',
    customerAvatar: '/avatars/mike-johnson.jpg',
    rating: 3,
    title: 'Expected better quality',
    comment: 'For the price, I expected better quality. The material feels cheap and they\'re not as comfortable as I hoped.',
    images: [],
    verifiedPurchase: true,
    helpfulCount: 5,
    reportCount: 3,
    status: 'reported',
    type: 'product',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    adminNotes: 'Customer reported issues with material quality',
    reportedBy: [
      {
        userId: 'user-101',
        reason: 'Inappropriate content',
        reportedAt: '2024-01-13T14:30:00Z',
      },
      {
        userId: 'user-102',
        reason: 'False information',
        reportedAt: '2024-01-13T15:45:00Z',
      },
    ],
  },
  {
    id: 'rev-004',
    productId: 'prod-004',
    productName: 'New Balance 574',
    productImage: '/products/newbalance-574.jpg',
    productCategory: 'Lifestyle',
    customerId: 'cust-004',
    customerName: 'Emily Chen',
    customerEmail: 'emily.chen@example.com',
    customerAvatar: '/avatars/emily-chen.jpg',
    rating: 5,
    title: 'Perfect for daily wear!',
    comment: 'I wear these every day and they\'re incredibly comfortable. The style is classic and goes with everything. Highly recommend!',
    images: ['/reviews/rev-004-1.jpg', '/reviews/rev-004-2.jpg'],
    verifiedPurchase: true,
    helpfulCount: 18,
    reportCount: 0,
    status: 'approved',
    type: 'product',
    createdAt: '2024-01-12T11:45:00Z',
    updatedAt: '2024-01-12T11:45:00Z',
  },
  {
    id: 'rev-005',
    productId: 'prod-005',
    productName: 'Converse Chuck 70',
    productImage: '/products/converse-chuck70.jpg',
    productCategory: 'Lifestyle',
    customerId: 'cust-005',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@example.com',
    customerAvatar: '/avatars/david-wilson.jpg',
    rating: 2,
    title: 'Poor quality control',
    comment: 'Received shoes with stitching issues. The right shoe had loose threads and the sole was coming apart. Very disappointed.',
    images: ['/reviews/rev-005-1.jpg'],
    verifiedPurchase: true,
    helpfulCount: 8,
    reportCount: 1,
    status: 'reported',
    type: 'product',
    createdAt: '2024-01-11T16:30:00Z',
    updatedAt: '2024-01-11T16:30:00Z',
    adminNotes: 'Quality issue reported, need to check with warehouse',
  },
  {
    id: 'rev-006',
    productId: 'prod-006',
    productName: 'Puma RS-X',
    productImage: '/products/puma-rsx.jpg',
    productCategory: 'Running',
    customerId: 'cust-006',
    customerName: 'Lisa Thompson',
    customerEmail: 'lisa.thompson@example.com',
    customerAvatar: '/avatars/lisa-thompson.jpg',
    rating: 4,
    title: 'Good value for money',
    comment: 'Great shoes for the price. Comfortable and stylish. Only complaint is they take a while to break in.',
    images: [],
    verifiedPurchase: true,
    helpfulCount: 7,
    reportCount: 0,
    status: 'approved',
    type: 'product',
    createdAt: '2024-01-10T13:20:00Z',
    updatedAt: '2024-01-10T13:20:00Z',
  },
  {
    id: 'rev-007',
    productId: 'prod-007',
    productName: 'Vans Old Skool',
    productImage: '/products/vans-oldskool.jpg',
    productCategory: 'Skate',
    customerId: 'cust-007',
    customerName: 'Robert Garcia',
    customerEmail: 'robert.garcia@example.com',
    customerAvatar: '/avatars/robert-garcia.jpg',
    rating: 5,
    title: 'Classic and durable',
    comment: 'Perfect skate shoes. Durable, comfortable, and the classic style never goes out of fashion.',
    images: ['/reviews/rev-007-1.jpg'],
    verifiedPurchase: true,
    helpfulCount: 15,
    reportCount: 0,
    status: 'approved',
    type: 'product',
    createdAt: '2024-01-09T10:10:00Z',
    updatedAt: '2024-01-09T10:10:00Z',
  },
  {
    id: 'rev-008',
    productId: 'prod-008',
    productName: 'Reebok Nano X3',
    productImage: '/products/reebok-nanox3.jpg',
    productCategory: 'Training',
    customerId: 'cust-008',
    customerName: 'Jennifer Lee',
    customerEmail: 'jennifer.lee@example.com',
    customerAvatar: '/avatars/jennifer-lee.jpg',
    rating: 3,
    title: 'Average performance',
    comment: 'Decent for light training but not suitable for heavy lifting. The grip could be better on certain surfaces.',
    images: [],
    verifiedPurchase: true,
    helpfulCount: 4,
    reportCount: 0,
    status: 'pending',
    type: 'product',
    createdAt: '2024-01-08T15:40:00Z',
    updatedAt: '2024-01-08T15:40:00Z',
  },
];

export const reviewStats: ReviewStats = {
  total: 1245,
  averageRating: 4.3,
  pending: 23,
  approved: 1156,
  rejected: 12,
  reported: 15,
  ratingBreakdown: [
    { rating: 5, count: 567, percentage: 46 },
    { rating: 4, count: 342, percentage: 27 },
    { rating: 3, count: 198, percentage: 16 },
    { rating: 2, count: 87, percentage: 7 },
    { rating: 1, count: 51, percentage: 4 },
  ],
  recentActivity: [
    { date: '2024-01-15', reviews: 45, averageRating: 4.5 },
    { date: '2024-01-14', reviews: 38, averageRating: 4.2 },
    { date: '2024-01-13', reviews: 42, averageRating: 4.3 },
    { date: '2024-01-12', reviews: 39, averageRating: 4.4 },
    { date: '2024-01-11', reviews: 35, averageRating: 4.1 },
    { date: '2024-01-10', reviews: 40, averageRating: 4.3 },
    { date: '2024-01-09', reviews: 37, averageRating: 4.2 },
  ],
};

// Helper Functions
export const getReviews = (filters?: ReviewFilter): Review[] => {
  let filteredReviews = [...mockReviews];

  if (filters?.status && filters.status !== 'all') {
    filteredReviews = filteredReviews.filter(review => review.status === filters.status);
  }

  if (filters?.rating) {
    filteredReviews = filteredReviews.filter(review => review.rating === filters.rating);
  }

  if (filters?.productId) {
    filteredReviews = filteredReviews.filter(review => review.productId === filters.productId);
  }

  if (filters?.customerId) {
    filteredReviews = filteredReviews.filter(review => review.customerId === filters.customerId);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredReviews = filteredReviews.filter(review =>
      review.productName.toLowerCase().includes(searchLower) ||
      review.customerName.toLowerCase().includes(searchLower) ||
      review.comment.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filteredReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'highest-rating':
        filteredReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest-rating':
        filteredReviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'most-helpful':
        filteredReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
    }
  }

  return filteredReviews;
};

export const getReviewStats = (): ReviewStats => reviewStats;

export const updateReviewStatus = (reviewId: string, status: ReviewStatus, notes?: string): boolean => {
  const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
  if (reviewIndex !== -1) {
    mockReviews[reviewIndex].status = status;
    mockReviews[reviewIndex].updatedAt = new Date().toISOString();
    if (notes) {
      mockReviews[reviewIndex].adminNotes = notes;
    }
    return true;
  }
  return false;
};

export const deleteReview = (reviewId: string): boolean => {
  const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
  if (reviewIndex !== -1) {
    mockReviews.splice(reviewIndex, 1);
    return true;
  }
  return false;
};