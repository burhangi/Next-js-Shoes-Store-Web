"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Share2, Search, Grid3X3, LayoutGrid, Star, Package, ArrowRight, ChevronRight, Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { Category, Product } from '@/lib/data/types';
import { categoryAPI, productAPI } from '@/lib/data/mockData';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { ProductCard } from '@/components/products/ProductCard';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

interface ProductFilters {
  sortBy: string;
  searchQuery: string;
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: 'newest',
    searchQuery: ''
  });

  useEffect(() => {
    if (slug && slug !== 'undefined') {
      loadCategory();
    } else {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (category) {
      loadProducts();
    }
  }, [category]);

  useEffect(() => {
    if (category && products.length > 0) {
      applyFilters();
    }
  }, [filters, products]);

  const loadCategory = async () => {
    try {
      const categoryData = await categoryAPI.getBySlug(slug);
      if (!categoryData) {
        setLoading(false);
        return;
      }
      setCategory(categoryData);
    } catch (error) {
      console.error('Error loading category:', error);
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    if (!category) return;
    setLoading(true);
    try {
      const categoryProducts = await productAPI.getByCategorySlug(category.slug);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    if (!category) return;
    const filtered = await productAPI.getAll({
      categorySlug: category.slug,
      ...filters
    });
    setFilteredProducts(filtered);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: category?.name,
        text: category?.description,
        url: window.location.href,
      });
    }
  };

  if (loading) return <LoadingState />;

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-12 bg-white">
        <EmptyState
          title="Category Not Found"
          description={`The category "${slug}" does not exist.`}
          onReset={() => router.push('/categories')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="py-6 md:py-10">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-xs font-medium text-white/60 mb-6"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{category.name}</span>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    {products.length} Products
                  </span>
                  {category.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
                  {category.name}
                </h1>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
                  >
                    Shop Collection
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-white">{products.length}</div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-wide">Products</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-white flex items-center gap-1">
                      4.8 <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-wide">Avg Rating</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">Premium</div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-wide">Quality</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                    <img
                      src={category.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {category.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg flex items-center gap-1.5">
                          <Star className="w-3 h-3 fill-primary" /> Featured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-6 md:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-sm md:text-base font-bold text-secondary flex items-center gap-2">
                Products
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-bold">
                  {filteredProducts.length}
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-full sm:w-52 text-sm transition-all"
                />
              </div>

              {/* Sort */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm bg-white cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg gap-0.5 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-700'
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-700'
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">No products found</h3>
              <p className="text-sm text-gray-600 mb-5">Try adjusting your search or filters.</p>
              <button
                onClick={() => setFilters({ sortBy: 'newest', searchQuery: '' })}
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5'
                : 'grid grid-cols-1 md:grid-cols-2 gap-4'
            )}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
                >
                  <ProductCard
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.images?.[0] || ""}
                    rating={product.rating}
                    reviews={product.reviews}
                    brand={product.brand}
                    isNew={product.isNew}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 md:py-14 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-secondary to-secondary/95 rounded-xl p-6 md:p-8">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                Explore More Collections
              </h2>
              <p className="text-sm text-white/70">
                Discover other categories and find your perfect style.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/categories"
                className="px-5 py-2.5 bg-white text-secondary rounded-lg font-bold text-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                All Categories <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-sm hover:bg-white/20 transition-all"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
