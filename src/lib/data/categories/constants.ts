// Category constants
export const CATEGORY_BADGES = {
  new: {
    label: 'NEW',
    color: 'bg-green-100 text-green-800',
    icon: '⚡'
  },
  trending: {
    label: 'TRENDING',
    color: 'bg-orange-100 text-orange-800',
    icon: '📈'
  },
  sale: {
    label: 'SALE',
    color: 'bg-red-100 text-red-800',
    icon: '🔥'
  },
  featured: {
    label: 'FEATURED',
    color: 'bg-blue-100 text-blue-800',
    icon: '⭐'
  },
  premium: {
    label: 'PREMIUM',
    color: 'bg-purple-100 text-purple-800',
    icon: '💎'
  }
} as const;

export const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Name: A-Z', value: 'name_asc' },
  { label: 'Name: Z-A', value: 'name_desc' }
] as const;

export const FILTER_OPTIONS = {
  priceRanges: [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200-10000' }
  ],
  ratings: [
    { label: '5 Stars', value: 5 },
    { label: '4 Stars & Up', value: 4 },
    { label: '3 Stars & Up', value: 3 },
    { label: '2 Stars & Up', value: 2 }
  ],
  brands: [
    { label: 'Nike', value: 'nike' },
    { label: 'Adidas', value: 'adidas' },
    { label: 'Puma', value: 'puma' },
    { label: 'New Balance', value: 'new-balance' },
    { label: 'Reebok', value: 'reebok' },
    { label: 'Converse', value: 'converse' }
  ],
  sizes: [
    { label: 'US 6', value: '6' },
    { label: 'US 7', value: '7' },
    { label: 'US 8', value: '8' },
    { label: 'US 9', value: '9' },
    { label: 'US 10', value: '10' },
    { label: 'US 11', value: '11' },
    { label: 'US 12', value: '12' }
  ],
  colors: [
    { label: 'Black', value: 'black', color: '#000000' },
    { label: 'White', value: 'white', color: '#FFFFFF' },
    { label: 'Red', value: 'red', color: '#DC2626' },
    { label: 'Blue', value: 'blue', color: '#2563EB' },
    { label: 'Green', value: 'green', color: '#059669' },
    { label: 'Gray', value: 'gray', color: '#6B7280' },
    { label: 'Brown', value: 'brown', color: '#92400E' }
  ]
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: {
    LIST: '/api/categories',
    DETAIL: '/api/categories/[slug]',
    PRODUCTS: '/api/categories/[slug]/products',
    SUBCATEGORIES: '/api/categories/[slug]/subcategories',
    TREE: '/api/categories/tree',
    STATS: '/api/categories/[slug]/stats',
    BULK_UPDATE: '/api/categories/bulk-update'
  }
} as const;

// Default Values
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 1
} as const;

export const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 10000,
  brands: [],
  sizes: [],
  colors: [],
  ratings: [],
  sortBy: 'popular' as const
};