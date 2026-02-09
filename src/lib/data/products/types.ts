export interface MinimalProduct {
  id: string
  slug?: string
  name: string
  price: number
  originalPrice?: number
  description?: string
  shortDescription?: string
  images?: string[]
  image?: string
  rating?: number
  reviews?: number
  brand?: string
  isNew?: boolean
  isBestSeller?: boolean
  isOnSale?: boolean
  isFeatured?: boolean
  colors?: string[]
  sizes?: string[]
  category: string
  categorySlug: string
  discountPercent?: number
  stock?: number
  stockStatus?: 'in_stock' | 'out_of_stock' | 'low_stock'
  stockQuantity?: number
  tags?: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  variants?: {
    color: string
    size: string
    sku: string
    price: number
    stock: number
  }[]
  features?: string[]
  specifications?: Record<string, string>
  status?: 'active' | 'inactive' | 'out_of_stock'
  createdAt?: string
  updatedAt?: string
  soldCount?: number
  categoryId?: string
  brandId?: string
}

// 📄 /lib/data/products/types.ts - UPDATE TO MATCH YOUR DATA
// 📄 /lib/data/products/types.ts - UPDATE THIS FILE
// 📄 /lib/data/products/types.ts - UPDATE
export interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  description: string
  shortDescription?: string
  images: string[]
  image: string
  rating: number
  reviews: number
  brand?: string
  isNew?: boolean
  isBestSeller?: boolean
  isOnSale?: boolean
  isFeatured?: boolean
  colors?: string[]
  sizes?: string[]
  category: string
  categorySlug: string
  discountPercent?: number
  stock?: number
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock'
  stockQuantity?: number
  tags?: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  variants: {
    color: string
    size: string
    sku: string
    price: number
    stock: number
  }[]
  features: string[]
  specifications: Record<string, string>
  status: 'active' | 'inactive' | 'out_of_stock'
  createdAt?: string
  updatedAt?: string
  soldCount?: number // Make sure this exists
  categoryId?: string
  brandId?: string
  thumbnail?: string
  reviewCount?: number
  salePrice?: number
}

export interface ProductBadge {
  type: 'new' | 'sale' | 'bestseller' | 'featured' | 'premium' | 'limited'
  text: string
  color: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount?: number
  itemCount?: number
  featured?: boolean
  badge?: 'new' | 'trending' | 'sale' | 'featured' | 'premium'
  status?: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}