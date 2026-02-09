// Unified Product Types
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
  isFeatured?: boolean;
  colors?: string[];
  sizes?: string[];
  category: string;
  categorySlug: string;
  discountPercent?: number;
  stock?: number;
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
  stockQuantity?: number;
  tags?: string[];
  weight?: number;
  soldCount?: number;
  categoryId?: string;
  brandId?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  variants: Array<{
    color: string;
    size: string;
    sku: string;
    price: number;
    stock: number;
  }>;
  features: string[];
  specifications: Record<string, string>;
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt?: string;
  updatedAt?: string;
  badges?: ProductBadge[];
}

export interface MinimalProduct extends Partial<Product> {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface ProductBadge {
  type: 'new' | 'sale' | 'bestseller' | 'featured' | 'premium' | 'limited';
  text: string;
  color: string;
}

// Category Types
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount?: number;
  itemCount?: number;
  featured?: boolean;
  badge?: 'new' | 'trending' | 'sale' | 'featured' | 'premium';
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: 'user' | 'admin' | 'moderator';
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

// Sort Options
export type SortOption = 
  | 'popular' 
  | 'newest' 
  | 'price-low' 
  | 'price-high' 
  | 'rating' 
  | 'name-asc' 
  | 'name-desc';