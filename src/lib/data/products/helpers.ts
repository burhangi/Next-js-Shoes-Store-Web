import { MinimalProduct, Product, ProductBadge  } from '@/lib/utils/auth-utils'

/**
 * Convert MinimalProduct to full Product with defaults
 */
export function toFullProduct(minimal: MinimalProduct): Product {
  return {
    id: minimal.id || '',
    slug: minimal.slug || `product-${minimal.id}`,
    name: minimal.name || '',
    description: minimal.description || '',
    shortDescription: minimal.shortDescription || '',
    price: minimal.price || 0,
    originalPrice: minimal.originalPrice,
    images: minimal.images || [],
    image: minimal.image || '',
    rating: minimal.rating || 0,
    reviews: minimal.reviews || 0,
    category: minimal.category || '',
    categorySlug: minimal.categorySlug || '',
    brand: minimal.brand,
    isNew: minimal.isNew || false,
    isBestSeller: minimal.isBestSeller || false,
    isOnSale: minimal.isOnSale || false,
    isFeatured: minimal.isFeatured || false,
    colors: minimal.colors || [],
    sizes: minimal.sizes || [],
    discountPercent: minimal.discountPercent,
    stock: minimal.stock,
    stockStatus: minimal.stockStatus || 'in_stock',
    stockQuantity: minimal.stockQuantity || 0,
    tags: minimal.tags || [],
    weight: minimal.weight,
    soldCount: minimal.soldCount || 0,
    categoryId: minimal.categoryId,
    brandId: minimal.brandId,
    dimensions: minimal.dimensions,
    variants: minimal.variants || [],
    features: minimal.features || [],
    specifications: minimal.specifications || {},
    status: minimal.status || 'active',
    createdAt: minimal.createdAt,
    updatedAt: minimal.updatedAt,
  }
}

/**
 * Generate product badges based on product properties
 */
export function generateProductBadges(product: MinimalProduct): ProductBadge[] {
  const badges: ProductBadge[] = []

  if (product.isNew) {
    badges.push({ 
      type: 'new', 
      text: 'NEW', 
      color: 'bg-green-100 text-green-800 border-green-200' 
    })
  }
  if (product.isOnSale) {
    badges.push({ 
      type: 'sale', 
      text: 'SALE', 
      color: 'bg-red-100 text-red-800 border-red-200' 
    })
  }
  if (product.isBestSeller) {
    badges.push({ 
      type: 'bestseller', 
      text: 'BESTSELLER', 
      color: 'bg-purple-100 text-purple-800 border-purple-200' 
    })
  }
  if (product.isFeatured) {
    badges.push({ 
      type: 'featured', 
      text: 'FEATURED', 
      color: 'bg-blue-100 text-blue-800 border-blue-200' 
    })
  }

  return badges
}

// Re-export utility functions
export { 
  formatCurrency, 
  truncateText, 
  debounce 
} from '@/lib/utils'