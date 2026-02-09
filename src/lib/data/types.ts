// 📄 /lib/data/types.ts - COMPLETE CENTRAL TYPES
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount?: number;
  itemCount?: number; // For backward compatibility
  featured?: boolean;
  badge?: 'new' | 'trending' | 'sale' | 'featured' | 'premium';
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  images: string[];
  image: string;
  rating: number;
  reviews: number;
  brand?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  colors?: string[];
  sizes?: string[];
  category: string;
  categorySlug: string;
  discountPercent?: number;
  stock?: number;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'low_stock';
  stockQuantity?: number;
  tags?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  variants?: {
    color: string;
    size: string;
    sku: string;
    price: number;
    stock: number;
  }[];
  features?: string[];
  specifications?: Record<string, string>;
  status?: 'active' | 'inactive' | 'out_of_stock';
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  pagination?: Pagination;
}

export interface CategoryResponse {
  success: boolean;
  data: {
    category: Category;
    breadcrumbs: Array<{ name: string; slug: string }>;
    relatedCategories: Category[];
  };
}

export interface CategoryFilter {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  sortBy?: string;
}

// Sort options type
export type SortOption = 
  | 'popular' 
  | 'newest' 
  | 'price-low' 
  | 'price-high' 
  | 'rating' 
  | 'name-asc' 
  | 'name-desc';