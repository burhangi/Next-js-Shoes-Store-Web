// 📄 /lib/data/categories/types.ts - FIXED WITH PROPER EXPORTS
import type { 
  Category as BaseCategory, 
  Pagination, 
  CategoriesResponse, 
  CategoryResponse, 
  CategoryFilter,
  SortOption
} from '../types';

// Re-export using export type
export type {
  BaseCategory as Category,
  Pagination,
  CategoriesResponse,
  CategoryResponse,
  CategoryFilter,
  SortOption
};

// Add category-specific types
export interface CategoryWithSubcategories extends BaseCategory {
  subcategories: BaseCategory[];
}

export interface CategoryTree {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  children?: CategoryTree[];
}