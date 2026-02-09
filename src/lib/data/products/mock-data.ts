// 📄 /lib/data/products/mock-data.ts - COMPLETE
import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'nike-air-max-270',
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    description: 'Experience unparalleled comfort with the Nike Air Max 270.',
    shortDescription: 'Iconic Nike sneakers with maximum Air cushioning',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.8,
    reviews: 120,
    brand: 'Nike',
    isNew: true,
    isBestSeller: true,
    colors: ['red', 'black', 'white'],
    sizes: ['40', '41', '42', '43', '44'],
    category: 'Sports',
    categorySlug: 'sports',
    discountPercent: 17,
    stock: 45,
    stockStatus: 'in_stock',
    stockQuantity: 45,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-20'
  },
  {
    id: '2',
    slug: 'adidas-ultraboost',
    name: 'Adidas Ultraboost',
    price: 180,
    description: 'The Adidas Ultraboost combines style and performance with responsive Boost cushioning.',
    shortDescription: 'Premium running shoes with Boost technology',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    rating: 4.9,
    reviews: 250,
    brand: 'Adidas',
    isNew: false,
    isBestSeller: true,
    colors: ['black', 'gray'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    category: 'Sports',
    categorySlug: 'sports',
    stock: 32,
    stockStatus: 'in_stock',
    stockQuantity: 32,
    createdAt: '2024-02-10',
    updatedAt: '2024-11-20'
  },
  {
    id: '3',
    slug: 'puma-rs-x',
    name: 'Puma RS-X',
    price: 120,
    originalPrice: 150,
    description: 'Bold retro-inspired sneakers with maximum comfort.',
    shortDescription: 'Retro-inspired chunky sneakers',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    rating: 4.5,
    reviews: 89,
    brand: 'Puma',
    isNew: true,
    isBestSeller: false,
    colors: ['white', 'blue'],
    sizes: ['38', '39', '40', '41', '42'],
    category: 'Casual',
    categorySlug: 'casual',
    discountPercent: 20,
    stock: 28,
    stockStatus: 'in_stock',
    stockQuantity: 28,
    createdAt: '2024-03-01',
    updatedAt: '2024-11-20'
  },
  {
    id: '4',
    slug: 'new-balance-574',
    name: 'New Balance 574',
    price: 100,
    originalPrice: 130,
    description: 'Classic heritage style with modern comfort technology.',
    shortDescription: 'Classic heritage sneakers',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    rating: 4.7,
    reviews: 210,
    brand: 'New Balance',
    isNew: false,
    isBestSeller: true,
    colors: ['gray', 'navy'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    category: 'Casual',
    categorySlug: 'casual',
    discountPercent: 23,
    stock: 15,
    stockStatus: 'in_stock',
    stockQuantity: 15,
    createdAt: '2024-01-20',
    updatedAt: '2024-11-20'
  },
  {
    id: '5',
    slug: 'converse-chuck-taylor',
    name: 'Converse Chuck Taylor All Star',
    price: 65,
    originalPrice: 85,
    description: 'Iconic canvas sneakers with timeless style.',
    shortDescription: 'Classic canvas high-tops',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80',
    rating: 4.6,
    reviews: 520,
    brand: 'Converse',
    isNew: false,
    isBestSeller: true,
    colors: ['black', 'white', 'red'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    category: 'Casual',
    categorySlug: 'casual',
    discountPercent: 24,
    stock: 50,
    stockStatus: 'in_stock',
    stockQuantity: 50,
    createdAt: '2024-01-05',
    updatedAt: '2024-11-20'
  },
  {
    id: '6',
    slug: 'clarks-desert-boot',
    name: 'Clarks Desert Boot',
    price: 140,
    description: 'Premium suede desert boots with crepe sole.',
    shortDescription: 'Classic desert boots',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    rating: 4.8,
    reviews: 180,
    brand: 'Clarks',
    isNew: true,
    isBestSeller: false,
    colors: ['tan', 'brown', 'black'],
    sizes: ['40', '41', '42', '43', '44'],
    category: 'Formal',
    categorySlug: 'formal',
    stock: 25,
    stockStatus: 'in_stock',
    stockQuantity: 25,
    createdAt: '2024-03-15',
    updatedAt: '2024-11-20'
  },
  {
    id: '7',
    slug: 'oxford-leather-shoes',
    name: 'Classic Oxford Leather Shoes',
    price: 180,
    originalPrice: 220,
    description: 'Handcrafted leather Oxford shoes for formal occasions.',
    shortDescription: 'Premium leather Oxfords',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    rating: 4.9,
    reviews: 95,
    brand: 'Allen Edmonds',
    isNew: false,
    isBestSeller: true,
    colors: ['black', 'brown'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    category: 'Formal',
    categorySlug: 'formal',
    discountPercent: 18,
    stock: 12,
    stockStatus: 'low_stock',
    stockQuantity: 12,
    createdAt: '2024-02-01',
    updatedAt: '2024-11-20'
  },
  {
    id: '8',
    slug: 'reebok-classic-leather',
    name: 'Reebok Classic Leather',
    price: 75,
    originalPrice: 95,
    description: 'Timeless athletic style with soft leather upper.',
    shortDescription: 'Retro leather sneakers',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    rating: 4.5,
    reviews: 340,
    brand: 'Reebok',
    isNew: false,
    isBestSeller: false,
    colors: ['white', 'black', 'navy'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    category: 'Sports',
    categorySlug: 'sports',
    discountPercent: 21,
    stock: 35,
    stockStatus: 'in_stock',
    stockQuantity: 35,
    createdAt: '2024-01-10',
    updatedAt: '2024-11-20'
  },
  {
    id: '9',
    slug: 'vans-old-skool',
    name: 'Vans Old Skool',
    price: 70,
    description: 'Classic skate shoes with iconic side stripe.',
    shortDescription: 'Iconic skate sneakers',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    rating: 4.7,
    reviews: 450,
    brand: 'Vans',
    isNew: false,
    isBestSeller: true,
    colors: ['black/white', 'navy', 'gray'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    category: 'Casual',
    categorySlug: 'casual',
    stock: 40,
    stockStatus: 'in_stock',
    stockQuantity: 40,
    createdAt: '2024-01-25',
    updatedAt: '2024-11-20'
  },
  {
    id: '10',
    slug: 'timberland-6-inch-boot',
    name: 'Timberland 6-Inch Premium Boot',
    price: 200,
    description: 'Waterproof leather boots built for durability.',
    shortDescription: 'Classic waterproof boots',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
    rating: 4.9,
    reviews: 280,
    brand: 'Timberland',
    isNew: true,
    isBestSeller: true,
    colors: ['wheat', 'black'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    category: 'Casual',
    categorySlug: 'casual',
    stock: 22,
    stockStatus: 'in_stock',
    stockQuantity: 22,
    createdAt: '2024-03-20',
    updatedAt: '2024-11-20'
  }
];

// ✅ Add productAPI export
export const productAPI = {
  getAll: async (filters?: { 
    sortBy?: string; 
    limit?: number; 
    categorySlug?: string;
    searchQuery?: string;
  }): Promise<Product[]> => {
    let filtered = [...MOCK_PRODUCTS];
    
    // Filter by category
    if (filters?.categorySlug) {
      filtered = filtered.filter(p => p.categorySlug === filters.categorySlug);
    }
    
    // Filter by search query
    if (filters?.searchQuery) {
      const searchTerm = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-asc':
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviews - a.reviews);
          break;
      }
    }
    
    return Promise.resolve(filters?.limit ? filtered.slice(0, filters.limit) : filtered);
  },
  
  getBySlug: async (slug: string): Promise<Product | null> => {
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    return Promise.resolve(product || null);
  },
  
  getByCategorySlug: async (categorySlug: string): Promise<Product[]> => {
    const products = MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug);
    return Promise.resolve(products);
  },
  
  getNewArrivals: async (limit: number = 4): Promise<Product[]> => {
    const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew);
    return Promise.resolve(newArrivals.slice(0, limit));
  },
  
  getBestSellers: async (limit: number = 4): Promise<Product[]> => {
    const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller);
    return Promise.resolve(bestSellers.slice(0, limit));
  }
};

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find(p => p.slug === slug);
}

export function getNewArrivals(limit?: number): Product[] {
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew);
  return limit ? newArrivals.slice(0, limit) : newArrivals;
}

export function getBestSellers(limit?: number): Product[] {
  const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller);
  return limit ? bestSellers.slice(0, limit) : bestSellers;
}

export function getFlashDeals(limit?: number): Product[] {
  const flashDeals = MOCK_PRODUCTS
    .filter(p => p.originalPrice && p.price < p.originalPrice)
    .sort((a, b) => {
      const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
      const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
      return discountB - discountA;
    });
  return limit ? flashDeals.slice(0, limit) : flashDeals;
}

export function getOnSaleProducts(limit?: number): Product[] {
  const onSale = MOCK_PRODUCTS.filter(p => p.originalPrice && p.price < p.originalPrice);
  return limit ? onSale.slice(0, limit) : onSale;
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = MOCK_PRODUCTS.filter(p => p.isBestSeller || p.isNew);
  return limit ? featured.slice(0, limit) : featured;
}

export function getTopRatedProducts(limit?: number): Product[] {
  const topRated = [...MOCK_PRODUCTS].sort((a, b) => b.rating - a.rating);
  return limit ? topRated.slice(0, limit) : topRated;
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  if (!product) return [];
  
  return MOCK_PRODUCTS
    .filter(p => p.id !== productId && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}

export function searchProducts(query: string, limit?: number): Product[] {
  const searchTerm = query.toLowerCase();
  const results = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.brand?.toLowerCase().includes(searchTerm)
  );
  return limit ? results.slice(0, limit) : results;
}

export function getHomepageProducts() {
  return {
    featured: getFeaturedProducts(4),
    newArrivals: getNewArrivals(4),
    bestSellers: getBestSellers(4),
    flashDeals: getFlashDeals(4)
  };
}

export function getProductDetail(slug: string): Product | undefined {
  return getProductBySlug(slug);
}

// Alias for products
export const products = MOCK_PRODUCTS;