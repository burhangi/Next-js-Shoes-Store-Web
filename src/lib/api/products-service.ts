// 📄 /lib/api/products-service.ts - FIXED VERSION
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
  getHomepageProducts,
} from '../data/products/mock-data';

// ✅ Safe date parser helper
const parseSafeDate = (dateStr?: string): Date => {
  if (!dateStr) return new Date();
  try {
    return new Date(dateStr);
  } catch {
    return new Date();
  }
};

export class ProductsService {
  // Get all products with optional filtering
  async getProducts(filters?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
    limit?: number;
    page?: number;
  }) {
    let products = [...MOCK_PRODUCTS];

    // Apply filters
    if (filters?.category) {
      products = products.filter(p => p.categorySlug === filters.category || p.category === filters.category);
    }

    if (filters?.brand) {
      products = products.filter(p => p.brand?.toLowerCase() === filters.brand?.toLowerCase());
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
          products.sort((a, b) => parseSafeDate(b.createdAt).getTime() - parseSafeDate(a.createdAt).getTime());
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
      }
    }

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      products: products.slice(startIndex, endIndex),
      total: products.length,
      page,
      pages: Math.ceil(products.length / limit),
      hasMore: endIndex < products.length,
    };
  }

  async getProduct(slug: string) {
    return getProductBySlug(slug);
  }

  async getNewArrivals(limit?: number) {
    return getNewArrivals(limit);
  }

  async getBestSellers(limit?: number) {
    return getBestSellers(limit);
  }

  async getFlashDeals(limit?: number) {
    return getFlashDeals(limit);
  }

  async getOnSale(limit?: number) {
    return getOnSaleProducts(limit);
  }

  async getFeatured(limit?: number) {
    return getFeaturedProducts(limit);
  }

  async getRelatedProducts(productId: string, limit?: number) {
    return getRelatedProducts(productId, limit);
  }

  async search(query: string, limit?: number) {
    return searchProducts(query, limit);
  }

  async getHomepageProducts() {
    return getHomepageProducts();
  }

  async getTopRated(limit?: number) {
    return getTopRatedProducts(limit);
  }

  // For compare functionality
  async getCompareProducts(productIds: string[]) {
    return MOCK_PRODUCTS.filter(product => productIds.includes(product.id));
  }

  // Get stats for dashboard
  async getStats() {
    const totalProducts = MOCK_PRODUCTS.length;
    const totalStock = MOCK_PRODUCTS.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);
    const totalSold = MOCK_PRODUCTS.reduce((sum, p) => sum + (p.soldCount || 0), 0);
    const averageRating = MOCK_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / totalProducts;

    return {
      totalProducts,
      totalStock,
      totalSold,
      averageRating: parseFloat(averageRating.toFixed(1)),
      newArrivalsCount: getNewArrivals().length,
      bestSellersCount: getBestSellers().length,
      onSaleCount: getOnSaleProducts().length,
    };
  }
}

// Singleton instance
export const productsService = new ProductsService();