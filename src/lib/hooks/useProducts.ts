import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilter, MinimalProduct } from '@/lib/data/products/types';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';

interface UseProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  sortBy?: string;
  filters?: ProductFilter;
}

interface UseProductsReturn {
  products: Product[];
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
  setFilters: (filters: ProductFilter) => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: options.page || 1,
    limit: options.limit || 12,
    total: 0,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<ProductFilter>(options.filters || {});
  const [searchValue, setSearchValue] = useState<string>(options.search || '');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProducts = [...MOCK_PRODUCTS];
      
      // Apply search
      if (searchValue) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
        );
      }
      
      // Apply filters
      if (options.categoryId) {
        filteredProducts = filteredProducts.filter(product => 
          product.categoryId === options.categoryId
        );
      }
      
      if (options.brandId) {
        filteredProducts = filteredProducts.filter(product => 
          product.brandId === options.brandId
        );
      }
      
      if (options.isFeatured) {
        filteredProducts = filteredProducts.filter(product => product.isFeatured);
      }
      
      if (options.isNew) {
        filteredProducts = filteredProducts.filter(product => product.isNew);
      }
      
      if (options.isBestSeller) {
        filteredProducts = filteredProducts.filter(product => product.isBestSeller);
      }
      
      if (options.isOnSale) {
        filteredProducts = filteredProducts.filter(product => product.isOnSale);
      }
      
      // Apply custom filters
      if (filters.categories?.length) {
        filteredProducts = filteredProducts.filter(product =>
          filters.categories!.includes(product.categoryId)
        );
      }
      
      if (filters.brands?.length) {
        filteredProducts = filteredProducts.filter(product =>
          filters.brands!.includes(product.brandId)
        );
      }
      
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
          const price = product.salePrice || product.price;
          return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
        });
      }
      
      if (filters.rating) {
        filteredProducts = filteredProducts.filter(product =>
          product.rating >= filters.rating!
        );
      }
      
      // Apply sorting
      if (options.sortBy) {
        filteredProducts.sort((a, b) => {
          switch (options.sortBy) {
            case 'newest':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'price_asc':
              return (a.salePrice || a.price) - (b.salePrice || b.price);
            case 'price_desc':
              return (b.salePrice || b.price) - (a.salePrice || a.price);
            case 'rating_desc':
              return b.rating - a.rating;
            case 'bestselling':
              return b.soldCount - a.soldCount;
            case 'name_asc':
              return a.name.localeCompare(b.name);
            case 'name_desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });
      }
      
      // Apply pagination
      const start = (pagination.page - 1) * pagination.limit;
      const end = start + pagination.limit;
      const paginatedProducts = filteredProducts.slice(start, end);
      
      setProducts(paginatedProducts);
      setPagination(prev => ({
        ...prev,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / pagination.limit),
      }));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [options, filters, pagination, searchValue]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleSearchChange = (search: string) => {
    setSearchValue(search);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFiltersChange = (newFilters: ProductFilter) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchProducts,
    setPage: handlePageChange,
    setSearch: handleSearchChange,
    setFilters: handleFiltersChange,
  };
}