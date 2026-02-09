// 📄 /lib/data/categories/mock-data.ts - FIXED
import { Category, CategoryTree } from './types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'men',
    name: 'Men',
    description: 'Elevate your style with our premium collection of men\'s footwear',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
    productCount: 24,
    itemCount: 24, // Added for FeaturedCategories component
    featured: true,
    badge: 'featured',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-11-20'
  },
  {
    id: '2',
    slug: 'women',
    name: 'Women',
    description: 'Discover elegance and comfort in our exclusive women\'s range',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    productCount: 32,
    itemCount: 32,
    featured: true,
    badge: 'trending',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-11-20'
  },
  {
    id: '3',
    slug: 'kids',
    name: 'Kids',
    description: 'Durable and fun shoes for the little ones',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
    productCount: 18,
    itemCount: 18,
    featured: false,
    badge: 'new',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-11-20'
  },
  {
    id: '4',
    slug: 'sports',
    name: 'Sports',
    description: 'High-performance gear for your active lifestyle',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee32280d?w=800&q=80',
    productCount: 28,
    itemCount: 28,
    featured: true,
    badge: 'featured',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-11-20'
  },
  {
    id: '5',
    slug: 'casual',
    name: 'Casual',
    description: 'Relaxed styles for everyday comfort',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    productCount: 26,
    itemCount: 26,
    featured: true,
    badge: 'trending',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-11-20'
  }
];

// ✅ Fix: CategoryTree without extra properties
export const MOCK_CATEGORY_TREE: CategoryTree[] = [
  {
    id: '1',
    slug: 'men',
    name: 'Men',
    children: [
      {
        id: '101',
        slug: 'men-sneakers',
        name: 'Sneakers'
      },
      {
        id: '102',
        slug: 'men-boots',
        name: 'Boots'
      }
    ]
  }
];

export const MOCK_BREADCRUMBS = [
  { name: 'Home', slug: '/' },
  { name: 'Categories', slug: '/categories' },
  { name: 'Men', slug: '/categories/men' }
];

export const MOCK_CATEGORY_DETAIL = MOCK_CATEGORIES[0];

// ✅ Add categories export for FeaturedCategories component
export const categories = MOCK_CATEGORIES;

export function generateCategories(count: number = 5): Category[] {
  return MOCK_CATEGORIES.slice(0, count);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return MOCK_CATEGORIES.find(c => c.slug === slug);
}

// API functions
export const categoryAPI = {
  getAll: async (filters?: { search?: string; featured?: boolean }): Promise<Category[]> => {
    let filtered = [...MOCK_CATEGORIES];
    
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }
    
    if (filters?.featured !== undefined) {
      filtered = filtered.filter(c => c.featured === filters.featured);
    }
    
    return Promise.resolve(filtered);
  },
  
  getBySlug: async (slug: string): Promise<Category | null> => {
    const category = getCategoryBySlug(slug);
    return Promise.resolve(category || null);
  },
  
  getTree: async (): Promise<CategoryTree[]> => {
    return Promise.resolve(MOCK_CATEGORY_TREE);
  },
  
  getBreadcrumbs: async (slug: string): Promise<Array<{ name: string; slug: string }>> => {
    return Promise.resolve(MOCK_BREADCRUMBS);
  }
};