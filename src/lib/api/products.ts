// 📄 /lib/api/products.ts - COMPLETE VERSION
import { Product } from '@/lib/data/types';
import { 
  MOCK_PRODUCTS,
  getProductBySlug,
  getNewArrivals,
  getBestSellers,
  getFlashDeals,
  getOnSaleProducts,
  getFeaturedProducts,
  getRelatedProducts,
  getTopRatedProducts,
  searchProducts,
  getHomepageProducts
} from '@/lib/data/products/mock-data';

// ✅ Safe date parser
const safeDateParse = (dateStr?: string): Date => {
  if (!dateStr) return new Date();
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? new Date() : date;
};

export const productAPI = {
  // Get all products with filters
  getAll: async (filters?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular' | 'name';
    limit?: number;
    page?: number;
  }): Promise<{ data: Product[]; total: number; page: number; pages: number }> => {
    let products = [...MOCK_PRODUCTS];

    // Apply filters
    if (filters?.category) {
      products = products.filter(p => 
        p.categorySlug === filters.category || 
        p.category === filters.category ||
        p.categoryId === filters.category
      );
    }

    if (filters?.brand) {
      products = products.filter(p => 
        p.brand?.toLowerCase() === filters.brand?.toLowerCase() ||
        p.brandId?.toLowerCase() === filters.brand?.toLowerCase()
      );
    }

    if (filters?.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          products.sort((a, b) => safeDateParse(b.createdAt).getTime() - safeDateParse(a.createdAt).getTime());
          break;
        case 'price-low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          products.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
          break;
        case 'name':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return Promise.resolve({
      data: products.slice(startIndex, endIndex),
      total: products.length,
      page,
      pages: Math.ceil(products.length / limit),
    });
  },

  // Get single product
  getBySlug: async (slug: string): Promise<{ data: Product | null }> => {
    const product = getProductBySlug(slug);
    return Promise.resolve({ data: product || null });
  },

  // Get product collections
  getNewArrivals: async (limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(getNewArrivals(limit));
  },

  getBestSellers: async (limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(getBestSellers(limit));
  },

  getFlashDeals: async (limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(getFlashDeals(limit));
  },

  getOnSale: async (limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(getOnSaleProducts(limit));
  },

  getFeatured: async (limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(getFeaturedProducts(limit));
  },

  getTopRated: async (limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(getTopRatedProducts(limit));
  },

  // Get related products
  getRelated: async (productId: string, limit: number = 4): Promise<Product[]> => {
    return Promise.resolve(getRelatedProducts(productId, limit));
  },

  // Search products
  search: async (query: string, limit: number = 12): Promise<Product[]> => {
    return Promise.resolve(searchProducts(query, limit));
  },

  // Get homepage collections
  getHomepageProducts: async () => {
    return Promise.resolve(getHomepageProducts());
  },

  // Compare products
  getCompareProducts: async (productIds: string[]): Promise<Product[]> => {
    return Promise.resolve(MOCK_PRODUCTS.filter(p => productIds.includes(p.id)));
  },

  // Get product stats
  getStats: async () => {
    const totalProducts = MOCK_PRODUCTS.length;
    const totalStock = MOCK_PRODUCTS.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);
    const totalSold = MOCK_PRODUCTS.reduce((sum, p) => sum + (p.soldCount || 0), 0);
    const averageRating = MOCK_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / totalProducts;

    return Promise.resolve({
      totalProducts,
      totalStock,
      totalSold,
      averageRating: parseFloat(averageRating.toFixed(1)),
      newArrivalsCount: getNewArrivals().length,
      bestSellersCount: getBestSellers().length,
      onSaleCount: getOnSaleProducts().length,
    });
  }
};