// 📄 /lib/data/mockData.ts - COMPLETE
// Export everything from products and categories mock data
export { products, productAPI } from './products/mock-data';
export { 
  categories, 
  MOCK_CATEGORIES, 
  categoryAPI, 
  MOCK_CATEGORY_TREE,
  MOCK_BREADCRUMBS,
  MOCK_CATEGORY_DETAIL,
  generateCategories,
  getCategoryBySlug
} from './categories/mock-data';

// Export types
export type { Category, Product, SortOption } from './types';