"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, Grid, LayoutGrid, Search, X, RefreshCw, 
  SlidersHorizontal, ChevronDown, Star, Package, 
  Sparkles, TrendingUp, ArrowUpDown
} from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data/mockData';
import { Product } from '@/lib/data/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid2' | 'grid3'>('grid3');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000] as [number, number],
    brand: [] as string[],
    size: [] as string[],
    color: [] as string[],
    rating: 0,
    sortBy: 'popular'
  });

  // Extract filters from URL
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    if (category) setFilters(prev => ({ ...prev, category }));
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Filter products
  useEffect(() => {
    setLoading(true);
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      result = result.filter(p => p.categorySlug === filters.category);
    }

    result = result.filter(p =>
      p.price >= filters.priceRange[0] &&
      p.price <= filters.priceRange[1]
    );

    if (filters.brand.length > 0) {
      result = result.filter(p => p.brand && filters.brand.includes(p.brand));
    }

    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'rating': return b.rating - a.rating;
        case 'popular': return b.reviews - a.reviews;
        default: return 0;
      }
    });

    setTimeout(() => {
      setFilteredProducts(result);
      setLoading(false);
    }, 300);
  }, [filters, searchQuery]);

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '', priceRange: [0, 1000], brand: [], size: [], color: [], rating: 0, sortBy: 'popular'
    });
    setSearchQuery('');
  };

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    filters.brand.length +
    filters.size.length +
    filters.color.length +
    (filters.rating > 0 ? 1 : 0);

  const allBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
  const allCategories = Array.from(new Set(products.map(p => p.category)));

  const quickFilters = [
    { label: 'All', value: '', icon: Package },
    { label: 'New', value: 'new', icon: Sparkles },
    { label: 'Best Sellers', value: 'best', icon: TrendingUp },
    { label: 'On Sale', value: 'sale', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="py-10 md:py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Our Collection</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                All Products
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl">
                Discover our premium collection of footwear crafted for every occasion, style, and comfort.
              </p>
            </motion.div>

            {/* Search Bar in Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/15 transition-all text-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] md:top-[96px] z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-2 py-3 overflow-x-auto hide-scrollbar">
            {quickFilters.map((qf) => (
              <button
                key={qf.value}
                onClick={() => {
                  if (qf.value === '') resetFilters();
                  else if (qf.value === 'new') updateFilter('sortBy', 'newest');
                  else if (qf.value === 'best') updateFilter('sortBy', 'popular');
                  else if (qf.value === 'sale') updateFilter('sortBy', 'price-low');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all duration-300 ${
                  (qf.value === '' && !filters.category && filters.sortBy === 'popular') ||
                  (qf.value === 'new' && filters.sortBy === 'newest') ||
                  (qf.value === 'best' && filters.sortBy === 'popular' && activeFilterCount > 0) ||
                  (qf.value === 'sale' && filters.sortBy === 'price-low')
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary'
                }`}
              >
                <qf.icon className="w-3.5 h-3.5" />
                {qf.label}
              </button>
            ))}

            <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />

            {/* Results Count */}
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
              {filteredProducts.length} results
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-[140px]">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Filter Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-gray-50 to-orange-50/30 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                </div>

                <div className="p-4 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                  {/* Category */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Category</h4>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => updateFilter('category', '')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          !filters.category ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {allCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => updateFilter('category', cat.toLowerCase().replace(' ', '-'))}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            filters.category === cat.toLowerCase().replace(' ', '-')
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Price Range */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Price Range</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-center">
                        <span className="text-xs text-gray-500">Min</span>
                        <div className="text-sm font-bold text-secondary">${filters.priceRange[0]}</div>
                      </div>
                      <div className="text-gray-400 text-xs">—</div>
                      <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-center">
                        <span className="text-xs text-gray-500">Max</span>
                        <div className="text-sm font-bold text-secondary">${filters.priceRange[1]}</div>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.priceRange[0]}
                      onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                      className="w-full accent-primary mb-2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Brand */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Brand</h4>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                      {allBrands.map(brand => (
                        <label key={brand} className="flex items-center gap-2.5 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={filters.brand.includes(brand!)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFilter('brand', [...filters.brand, brand!]);
                              } else {
                                updateFilter('brand', filters.brand.filter(b => b !== brand));
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Rating */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Min Rating</h4>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2, 3, 4].map(r => (
                        <button
                          key={r}
                          onClick={() => updateFilter('rating', r === filters.rating ? 0 : r)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            filters.rating === r && r > 0
                              ? 'bg-primary/10 text-primary border-primary/30'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/30'
                          }`}
                        >
                          {r > 0 ? `${r}+` : 'All'}
                          {r > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl z-[110] lg:hidden flex flex-col"
                >
                  {/* Mobile Filter Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-secondary to-secondary/95 text-white">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </h3>
                    <button onClick={() => setShowFilters(false)} className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-5">
                    {/* Category */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</h4>
                      <div className="space-y-1">
                        <button
                          onClick={() => { updateFilter('category', ''); setShowFilters(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            !filters.category ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          All Categories
                        </button>
                        {allCategories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => { updateFilter('category', cat.toLowerCase().replace(' ', '-')); setShowFilters(false); }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.category === cat.toLowerCase().replace(' ', '-')
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* Price */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 px-2 py-1.5 bg-gray-50 rounded-lg text-center text-xs font-bold text-secondary">${filters.priceRange[0]}</div>
                        <span className="text-gray-400 text-xs">—</span>
                        <div className="flex-1 px-2 py-1.5 bg-gray-50 rounded-lg text-center text-xs font-bold text-secondary">${filters.priceRange[1]}</div>
                      </div>
                      <input type="range" min="0" max="500" step="10" value={filters.priceRange[0]} onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])} className="w-full accent-primary mb-2" />
                      <input type="range" min="0" max="1000" step="10" value={filters.priceRange[1]} onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])} className="w-full accent-primary" />
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* Brand */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Brand</h4>
                      <div className="space-y-1.5">
                        {allBrands.map(brand => (
                          <label key={brand} className="flex items-center gap-2.5 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={filters.brand.includes(brand!)}
                              onChange={(e) => {
                                if (e.target.checked) updateFilter('brand', [...filters.brand, brand!]);
                                else updateFilter('brand', filters.brand.filter(b => b !== brand));
                              }}
                              className="w-4 h-4 rounded accent-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Filter Actions */}
                  <div className="p-4 border-t border-gray-200 flex gap-3">
                    <button
                      onClick={resetFilters}
                      className="flex-1 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-primary/30 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                    >
                      Apply ({filteredProducts.length})
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 mb-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-700 hover:border-primary/40 transition-colors"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid3')}
                      className={`p-1.5 rounded-md transition-all ${
                        viewMode === 'grid3'
                          ? 'bg-white shadow-sm text-primary'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                      title="3 columns"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid2')}
                      className={`p-1.5 rounded-md transition-all ${
                        viewMode === 'grid2'
                          ? 'bg-white shadow-sm text-primary'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                      title="2 columns"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>

                  <span className="hidden md:block text-xs font-bold text-gray-500">
                    {filteredProducts.length} products
                  </span>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 hidden sm:block" />
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {filters.category && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">
                    {filters.category}
                    <button onClick={() => updateFilter('category', '')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.brand.map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">
                    {b}
                    <button onClick={() => updateFilter('brand', filters.brand.filter(x => x !== b))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {filters.rating > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">
                    {filters.rating}+ Stars
                    <button onClick={() => updateFilter('rating', 0)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-gray-500 hover:text-primary transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`grid gap-3 md:gap-5 ${
                  viewMode === 'grid2'
                    ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2'
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                  >
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image || (product as any).images?.[0]}
                      rating={product.rating}
                      reviews={product.reviews}
                      isNew={product.isNew}
                      isBestSeller={product.isBestSeller}
                      brand={product.brand}
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">No products found</h3>
                <p className="text-sm text-gray-600 mb-5">Try adjusting your filters or search</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
