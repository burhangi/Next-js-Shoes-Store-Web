// 📄 /lib/utils/product-helpers.ts - FIXED
import { MinimalProduct } from '../data';
import { Product } from '@/lib/data/products/types';

export function convertMinimalToProduct(product: MinimalProduct): Product {
  return {
    id: product.id,
    slug: product.slug || `product-${product.id}`,
    name: product.name,
    description: product.description || `Description for ${product.name}`,
    shortDescription: product.shortDescription || product.description?.substring(0, 100) || '',
    category: product.category,
    categorySlug: product.categorySlug || product.category.toLowerCase().replace(/\s+/g, '-'),
    images: product.images || [`/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`],
    image: product.image || product.images?.[0] || `/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`,
    // Add thumbnail for compatibility
    thumbnail: product.image || product.images?.[0] || `/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
    // Add reviewCount for compatibility
    reviewCount: product.reviews || 0,
    brand: product.brand,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    isOnSale: product.isOnSale,
    isFeatured: product.isFeatured,
    colors: product.colors,
    sizes: product.sizes,
    discountPercent: product.discountPercent,
    stock: product.stock,
    stockStatus: product.stockStatus || 'in_stock',
    stockQuantity: product.stockQuantity,
    tags: product.tags,
    weight: product.weight,
    dimensions: product.dimensions,
    variants: product.variants || [],
    features: product.features || [],
    specifications: product.specifications || {},
    status: product.status || 'active',
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    soldCount: product.soldCount,
    categoryId: product.categoryId,
    brandId: product.brandId,
  };
}

// Add this helper to calculate sale price
export function getSalePrice(product: Product): number | undefined {
  if (product.originalPrice && product.originalPrice > product.price) {
    return product.price;
  }
  return undefined;
}

// Add this helper to get thumbnail
export function getThumbnail(product: Product): string {
  return product.thumbnail || product.images?.[0] || product.image || '/api/placeholder/400/400';
}