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
  updateFilters: (filters: Partial<UseCategoriesOptions>) => void;
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
  const [filters, setFiltersState] = useState<UseCategoriesOptions>(options);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 600));

      const mockCategories: Category[] = [
        {
          id: '1',
          slug: 'running',
          name: 'Running Shoes',
          description: 'High-performance running shoes for athletes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
          bannerImage: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600',
          productCount: 245,
          parentId: null,
          featured: true,
          trending: true,
          sale: false,
          badge: 'trending',
          sortOrder: 1,
          status: 'active',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-20T14:45:00Z',
          metaTitle: 'Best Running Shoes 2024',
          metaDescription: 'Shop premium running shoes with advanced cushioning and support.'
        },
        {
          id: '2',
          slug: 'sneakers',
          name: 'Casual Sneakers',
          description: 'Stylish everyday sneakers for comfort and fashion',
          image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
          productCount: 312,
          parentId: null,
          featured: true,
          trending: true,
          sale: true,
          badge: 'new',
          sortOrder: 2,
          status: 'active',
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-22T16:30:00Z'
        },
      ];

      let filtered = [...mockCategories];

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(cat =>
          cat.name.toLowerCase().includes(query) ||
          cat.description.toLowerCase().includes(query)
        );
      }

      if (filters.featured) {
        filtered = filtered.filter(cat => cat.featured);
      }

      if (filters.parentId !== undefined) {
        filtered = filtered.filter(cat => cat.parentId === filters.parentId);
      }

      const start = (pagination.page - 1) * pagination.limit;
      const end = start + pagination.limit;
      const paginated = filtered.slice(start, end);

      setCategories(paginated);
      setPagination(prev => ({
        ...prev,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / prev.limit)
      }));
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const setPage = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const setSearch = (search: string) => {
    setFiltersState(prev => ({ ...prev, search }));
    setPage(1);
  };

  const updateFilters = (newFilters: Partial<UseCategoriesOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return {
    categories,
    loading,
    error,
    pagination,
    refetch: fetchCategories,
    setPage,
    setSearch,
    updateFilters
  };
}

// Simple filter state for product filters
export function useCategoryFilters() {
  const [filters, setFilters] = useState({
    brand: [] as string[],
    size: [] as string[],
    color: [] as string[],
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'popular' as const
  });

  const updateFilter = useCallback(<K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      brand: [],
      size: [],
      color: [],
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'popular'
    });
  }, []);

  const activeFilterCount =
    filters.brand.length +
    filters.size.length +
    filters.color.length +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 10000 ? 1 : 0);

  return {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount
  };
}