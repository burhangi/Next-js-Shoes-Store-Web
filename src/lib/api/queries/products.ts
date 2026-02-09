// lib/api/queries/products.ts
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../client'

// Types
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  images: string[]
  colors: Array<{ name: string; hex: string }>
  sizes: string[]
  category: string
  brand: string
  tags: string[]
  inStock: boolean
  isFeatured: boolean
  isNewArrival: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Queries
export const useProducts = (params?: {
  page?: number
  limit?: number
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
  search?: string
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>('/products', { params })
      return data
    },
  })
}

export const useInfiniteProducts = (params?: {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
  search?: string
}) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get<ProductsResponse>('/products', {
        params: { ...params, page: pageParam, limit: 12 },
      })
      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },
  })
}

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${slug}`)
      return data
    },
    enabled: !!slug,
  })
}

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products/featured')
      return data
    },
  })
}

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products/new-arrivals')
      return data
    },
  })
}

export const useBestSellers = () => {
  return useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products/best-sellers')
      return data
    },
  })
}

// Mutations
export const useAddToCart = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.post('/cart', { productId, quantity: 1 })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.post('/wishlist', { productId })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })
}