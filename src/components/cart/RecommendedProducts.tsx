"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';

interface RecommendedProductsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  className?: string;
  category?: string;
  showNavigation?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  title = "Frequently bought together",
  subtitle = "Customers who bought items in your cart also bought",
  limit = 4,
  className,
  category,
  showNavigation = true,
  autoSlide = false,
  autoSlideInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Simulate API call to get recommended products
    const timer = setTimeout(() => {
      let products = [...MOCK_PRODUCTS];

      // Filter by category if specified
      if (category) {
        products = products.filter(p => p.category === category);
      }

      // Sort by popularity/random
      products = products
        .filter(p => p.isBestSeller || p.isOnSale || p.isNew)
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
        .map(p => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.images?.[0] || '/api/placeholder/400/400',
          rating: p.rating || 4.5,
          reviews: p.reviews || Math.floor(Math.random() * 100),
          isNew: p.isNew,
          isBestSeller: p.isBestSeller,
          isOnSale: p.isOnSale,
          brand: p.brand,
          discountPercent: p.discountPercent,
          stockStatus: p.stockStatus || 'in_stock',
          stockQuantity: p.stock || 10,
        }));
      
      setRecommendedProducts(products);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [category, isMounted]);

  useEffect(() => {
    if (!autoSlide || recommendedProducts.length <= limit) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + 1 >= recommendedProducts.length - (limit - 1) ? 0 : prev + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, recommendedProducts.length, limit]);

  const handleAddToCart = async (product: any) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      slug: product.slug,
      brand: product.brand,
      stock: product.stockQuantity
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= recommendedProducts.length - (limit - 1) ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? recommendedProducts.length - limit : prev - 1
    );
  };

  const visibleProducts = recommendedProducts.slice(
    currentIndex, 
    currentIndex + Math.min(limit, recommendedProducts.length)
  );

  if (!isMounted || loading) {
    return (
      <div className={cn("py-8", className)}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className={cn("py-8", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        
        {/* Navigation Arrows */}
        {showNavigation && recommendedProducts.length > limit && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full border-gray-300 hover:border-primary"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full border-gray-300 hover:border-primary"
              aria-label="Next products"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                isOnSale={product.isOnSale}
                brand={product.brand}
                discountPercent={product.discountPercent}
                stockStatus={product.stockStatus}
                stockQuantity={product.stockQuantity}
                stock={product.stockQuantity}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress Dots */}
        {recommendedProducts.length > limit && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: recommendedProducts.length - limit + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index 
                    ? "bg-primary w-8" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary/10"
        >
          <Link href="/products">
            View All Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-bold text-gray-900">Best Sellers</h4>
          <p className="text-gray-600 text-sm mt-1">
            Our most popular products loved by customers
          </p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-xl">
          <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-bold text-gray-900">New Arrivals</h4>
          <p className="text-gray-600 text-sm mt-1">
            Fresh styles added weekly
          </p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-xl">
          <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-bold text-gray-900">Fast Shipping</h4>
          <p className="text-gray-600 text-sm mt-1">
            Free 2-3 day delivery on orders over $99
          </p>
        </div>
      </div>
    </div>
  );
};