// 📄 /lib/api/categories.ts - FIXED IMPORTS
import { 
  Category, 
  CategoryWithSubcategories, 
  CategoriesResponse,
  CategoryResponse,
  CategoryFilter,
  Pagination,
  CategoryTree
} from '@/lib/data/categories/types';
import { 
  MOCK_CATEGORIES, 
  MOCK_CATEGORY_DETAIL, 
  MOCK_BREADCRUMBS,
  MOCK_CATEGORY_TREE,
  generateCategories,
  getCategoryBySlug 
} from '@/lib/data/categories/mock-data';

// API Client Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development';

// Helper function to handle API calls
async function apiCall<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getMockData<T>(endpoint, options);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Mock data handler
function getMockData<T>(endpoint: string, options?: RequestInit): T {
  const method = options?.method || 'GET';
  
  switch (endpoint) {
    case '/categories':
      if (method === 'POST') {
        // Simulate creating a category
        return { success: true, data: MOCK_CATEGORIES[0] } as T;
      }
      // Get categories with pagination and filters
      const url = new URL(`http://localhost${endpoint}`);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '12');
      const search = url.searchParams.get('search') || '';
      
      let filteredCategories = [...MOCK_CATEGORIES];
      
      // Apply search filter
      if (search) {
        filteredCategories = filteredCategories.filter(cat => 
          cat.name.toLowerCase().includes(search.toLowerCase()) ||
          cat.description.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedCategories = filteredCategories.slice(start, end);
      
      return {
        success: true,
        data: paginatedCategories,
        pagination: {
          page,
          limit,
          total: filteredCategories.length,
          totalPages: Math.ceil(filteredCategories.length / limit)
        }
      } as T;
      
    case '/categories/tree':
      return { success: true, data: MOCK_CATEGORY_TREE } as T;
      
    default:
      if (endpoint.startsWith('/categories/') && !endpoint.includes('/products')) {
        const slug = endpoint.split('/').pop() || '';
        const category = getCategoryBySlug(slug);
        
        if (!category) {
          throw new Error('Category not found');
        }
        
        // Create CategoryWithSubcategories
        const categoryWithSub: CategoryWithSubcategories = {
          ...category,
          subcategories: MOCK_CATEGORIES.filter(c => c.slug.startsWith(`${slug}-`)).slice(0, 3)
        };
        
        return { 
          success: true, 
          data: {
            category: categoryWithSub,
            breadcrumbs: MOCK_BREADCRUMBS,
            relatedCategories: MOCK_CATEGORIES.slice(0, 4)
          }
        } as T;
      }
      
      return { success: true, data: null } as T;
  }
}

// Category API Functions
export const categoriesApi = {
  // Get all categories with pagination and filters
  async getCategories(params?: {
    page?: number;
    limit?: number;
    search?: string;
    parentId?: string | null;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<CategoriesResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.search) queryParams.set('search', params.search);
    if (params?.parentId !== undefined) queryParams.set('parentId', params.parentId || '');
    if (params?.featured !== undefined) queryParams.set('featured', params.featured.toString());
    if (params?.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.set('sortOrder', params.sortOrder);
    
    const queryString = queryParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<CategoriesResponse>(endpoint);
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<CategoryResponse> {
    return apiCall<CategoryResponse>(`/categories/${slug}`);
  },

  // Get category tree
  async getCategoryTree(): Promise<{ data: CategoryTree[] }> {
    return apiCall<{ data: CategoryTree[] }>('/categories/tree');
  },

  // Get subcategories
  async getSubcategories(parentSlug: string): Promise<{ data: Category[] }> {
    return apiCall<{ data: Category[] }>(`/categories/${parentSlug}/subcategories`);
  },

  // Get category products
  async getCategoryProducts(
    slug: string,
    filters?: CategoryFilter,
    pagination?: { page: number; limit: number }
  ): Promise<{
    data: any[];
    pagination: Pagination;
  }> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v.toString()));
          } else {
            queryParams.set(key, value.toString());
          }
        }
      });
    }
    
    if (pagination) {
      queryParams.set('page', pagination.page.toString());
      queryParams.set('limit', pagination.limit.toString());
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/categories/${slug}/products${queryString ? `?${queryString}` : ''}`;
    
    return apiCall(endpoint);
  },

  // Create category
  async createCategory(data: Partial<Category>): Promise<{ data: Category }> {
    return apiCall<{ data: Category }>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update category
  async updateCategory(slug: string, data: Partial<Category>): Promise<{ data: Category }> {
    return apiCall<{ data: Category }>(`/categories/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete category
  async deleteCategory(slug: string): Promise<{ success: boolean }> {
    return apiCall<{ success: boolean }>(`/categories/${slug}`, {
      method: 'DELETE',
    });
  },

  // Bulk update categories
  async bulkUpdateCategories(updates: Array<{ id: string; sortOrder?: number; parentId?: string | null }>): Promise<{ success: boolean }> {
    return apiCall<{ success: boolean }>('/categories/bulk-update', {
      method: 'PUT',
      body: JSON.stringify({ updates }),
    });
  },

  // Get category stats
  async getCategoryStats(slug: string): Promise<{ data: any }> {
    return apiCall<{ data: any }>(`/categories/${slug}/stats`);
  }
};