// 📄 /lib/data/products/constants.ts - UPDATED
import { SortOption } from '../types';

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Name: A-Z', value: 'name-asc' },
  { label: 'Name: Z-A', value: 'name-desc' }
];

export const FILTER_PRICE_RANGES = [
  { label: 'Under $50', value: '0-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: '$100 - $200', value: '100-200' },
  { label: 'Over $200', value: '200-10000' }
];

export const FILTER_RATINGS = [
  { label: '5 Stars', value: 5 },
  { label: '4 Stars & Up', value: 4 },
  { label: '3 Stars & Up', value: 3 },
  { label: '2 Stars & Up', value: 2 }
];

export const FILTER_BRANDS = [
  { label: 'Nike', value: 'nike' },
  { label: 'Adidas', value: 'adidas' },
  { label: 'Puma', value: 'puma' },
  { label: 'New Balance', value: 'new-balance' }
];

export const FILTER_SIZES = [
  { label: 'US 6', value: '6' },
  { label: 'US 7', value: '7' },
  { label: 'US 8', value: '8' },
  { label: 'US 9', value: '9' },
  { label: 'US 10', value: '10' }
];

// Add STOCK_STATUS here
export const STOCK_STATUS = {
  in_stock: {
    label: 'In Stock',
    bgColor: 'bg-green-100',
    color: 'text-green-800',
    borderColor: 'border-green-200'
  },
  out_of_stock: {
    label: 'Out of Stock',
    bgColor: 'bg-red-100',
    color: 'text-red-800',
    borderColor: 'border-red-200'
  },
  low_stock: {
    label: 'Low Stock',
    bgColor: 'bg-yellow-100',
    color: 'text-yellow-800',
    borderColor: 'border-yellow-200'
  }
};