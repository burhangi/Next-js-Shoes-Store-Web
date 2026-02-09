// lib/hooks/useCategories.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/lib/data/categories/types';

interface UseCategoriesOptions {
  page?: number;
  limit?: number;
  search?: string;
  featured?: boolean;
  sortBy?: string;
  parentId?: string | null;
}

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setFilters: (filters: Partial<UseCategoriesOptions>) => void;
}

export function useCategories(options: UseCategoriesOptions = {}): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: options.page || 1,
    limit: options.limit || 12,
    total: 0,
    totalPages: 1
  });
  const [filters, setFilters] = useState<UseCategoriesOptions>(options);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data response
      const mockCategories: Category[] = [
        {
          id: '1',
          slug: 'running',
          name: 'Running Shoes',
          description: 'High-performance running shoes for athletes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
          productCount: 245,
          parentId: null,
          featured: true,
          trending: true,
          sale: false,
          badge: 'trending', // Correct badge type
          sortOrder: 1,
          status: 'active',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-20T14:45:00Z'
        },
        {
          id: '2',
          slug: 'sneakers',
          name: 'Sneakers',
          description: 'Casual streetwear sneakers',
          image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
          productCount: 178,
          parentId: null,
          featured: true,
          trending: false,
          sale: true,
          badge: 'sale', // Correct badge type
          sortOrder: 2,
          status: 'active',
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-18T16:20:00Z'
        },
        {
          id: '3',
          slug: 'boots',
          name: 'Boots',
          description: 'Durable boots for outdoor activities',
          image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
          productCount: 89,
          parentId: null,
          featured: false,
          trending: false,
          sale: false,
          badge: undefined,
          sortOrder: 3,
          status: 'active',
          createdAt: '2024-01-05T14:45:00Z',
          updatedAt: '2024-01-15T11:30:00Z'
        },
        {
          id: '4',
          slug: 'formal-shoes',
          name: 'Formal Shoes',
          description: 'Elegant shoes for professional settings',
          image: 'https://images.unsplash.com/photo-1529408686214-b48b8532f72c',
          productCount: 67,
          parentId: null,
          featured: false,
          trending: false,
          sale: true,
          badge: 'new', // Changed from 'New' to 'new'
          sortOrder: 4,
          status: 'active',
          createdAt: '2024-01-12T13:20:00Z',
          updatedAt: '2024-01-19T10:15:00Z'
        },
        {
          id: '5',
          slug: 'sandals',
          name: 'Sandals',
          description: 'Comfortable sandals for summer',
          image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a',
          productCount: 112,
          parentId: null,
          featured: true,
          trending: true,
          sale: false,
          badge: 'featured', // Changed from 'popular' to 'featured'
          sortOrder: 5,
          status: 'active',
          createdAt: '2024-01-08T11:45:00Z',
          updatedAt: '2024-01-16T15:30:00Z'
        },
        {
          id: '6',
          slug: 'sports-shoes',
          name: 'Sports Shoes',
          description: 'Performance shoes for various sports',
          image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
          productCount: 156,
          parentId: null,
          featured: false,
          trending: false,
          sale: true,
          badge: 'sale', // Correct badge type
          sortOrder: 6,
          status: 'active',
          createdAt: '2024-01-03T16:10:00Z',
          updatedAt: '2024-01-14T09:25:00Z'
        },
      ];
      
      // Apply filters
      let filteredCategories = [...mockCategories];
      
      if (filters.parentId !== undefined) {
        filteredCategories = filteredCategories.filter(cat => cat.parentId === filters.parentId);
      }
      
      if (filters.featured) {
        filteredCategories = filteredCategories.filter(cat => cat.featured);
      }
      
      if (filters.search) {
        filteredCategories = filteredCategories.filter(cat => 
          cat.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          cat.description.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      
      // Apply sorting
      if (filters.sortBy === 'name_asc') {
        filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'name_desc') {
        filteredCategories.sort((a, b) => b.name.localeCompare(a.name));
      } else if (filters.sortBy === 'count_desc') {
        filteredCategories.sort((a, b) => b.productCount - a.productCount);
      }
      
      // Apply pagination
      const start = (pagination.page - 1) * pagination.limit;
      const end = start + pagination.limit;
      const paginatedCategories = filteredCategories.slice(start, end);
      
      setCategories(paginatedCategories);
      setPagination({
        ...pagination,
        total: filteredCategories.length,
        totalPages: Math.ceil(filteredCategories.length / pagination.limit)
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleFiltersChange = (newFilters: Partial<UseCategoriesOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    categories,
    loading,
    error,
    pagination,
    refetch: fetchCategories,
    setPage: handlePageChange,
    setSearch: handleSearchChange,
    setFilters: handleFiltersChange
  };
}

// Create a simple category filter hook
export function useCategoryFilters() {
  const [filters, setFilters] = useState({
    brand: [] as string[],
    size: [] as string[],
    color: [] as string[],
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'popular'
  });

  const updateFilter = useCallback((key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      brand: [],
      size: [],
      color: [],
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'popular'
    });
  }, []);

  const activeFilterCount = 
    filters.brand.length + 
    filters.size.length + 
    filters.color.length + 
    (filters.minPrice > 0 ? 1 : 0) + 
    (filters.maxPrice < 1000 ? 1 : 0);

  return {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount
  };
}