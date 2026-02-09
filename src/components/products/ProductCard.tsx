// 📄 /components/products/ProductCard.tsx - UPDATED VERSION
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Eye, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { ProductQuickView } from './ProductQuickView';
import { Product } from '@/lib/data/products/types';

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  brand?: string;
  discountPercent?: number;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'low_stock';
  stockQuantity?: number;
  className?: string;
  stock?: number;
  
  // New props for conditional rendering
  showRating?: boolean;
  showDiscountBadge?: boolean;
  showBestSellerBadge?: boolean;
  
  // Event handlers
  onAddToCart?: () => void;
  onQuickView?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isNew,
  isBestSeller,
  isOnSale,
  isFeatured,
  brand,
  discountPercent,
  stockStatus,
  stockQuantity,
  stock = 10,
  
  // New props with defaults
  showRating = true,
  showDiscountBadge = true,
  showBestSellerBadge = true,
  
  // Event handlers (optional - will use store if not provided)
  onAddToCart,
  onQuickView,
  className = ''
}) => {
  const router = useRouter();
  const { addToCart, getItemById } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  // Use state to prevent hydration mismatches - initialize to false, update after mount
  const [isMounted, setIsMounted] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  // Check cart and wishlist state only on client side after mount
  useEffect(() => {
    setIsMounted(true);
    // Check cart state
    const cartItem = getItemById(id);
    setIsInCart(!!cartItem);
    // Check wishlist state
    setIsWishlisted(isInWishlist(id));
  }, [id, getItemById, isInWishlist]);
  
  // Update cart state when store changes (for when items are added/removed)
  useEffect(() => {
    if (!isMounted) return;
    const cartItem = getItemById(id);
    setIsInCart(!!cartItem);
  }, [id, getItemById, isMounted]);

  // Calculate discount percentage if not provided
  const calculatedDiscountPercent = discountPercent || 
    (originalPrice && price < originalPrice 
      ? Math.round(((originalPrice - price) / originalPrice) * 100) 
      : undefined);

  // Determine if we should show discount badge
  const shouldShowDiscountBadge = showDiscountBadge && calculatedDiscountPercent && calculatedDiscountPercent > 0;

  // Determine stock status
  const currentStock = stockQuantity || stock;
  const isLowStock = currentStock > 0 && currentStock <= 5;
  const isOutOfStock = stockStatus === 'out_of_stock' || currentStock <= 0;
  
  // Update cart state when adding to cart
  useEffect(() => {
    if (isMounted && !isAddingToCart) {
      const cartItem = getItemById(id);
      setIsInCart(!!cartItem);
    }
  }, [id, getItemById, isMounted, isAddingToCart]);

  // Handle Add to Cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) return;

    // If already in cart, navigate to cart page (only check if mounted)
    if (isMounted && isInCart) {
      router.push('/cart');
      return;
    }

    setIsAddingToCart(true);
    
    try {
      // Use provided handler or use cart store directly
      if (onAddToCart) {
        onAddToCart();
        // Navigate to cart after adding
        setTimeout(() => {
          router.push('/cart');
        }, 400);
      } else {
        // Validate data before adding
        if (!id || !name || typeof price !== 'number' || price < 0) {
          console.error('Invalid product data:', { id, name, price });
          alert('Unable to add product to cart. Invalid product data.');
          setIsAddingToCart(false);
          return;
        }
        
        addToCart({
          id,
          name,
          price,
          originalPrice,
          image: image || '/api/placeholder/400/400',
          slug: slug || id,
          brand,
          stock: currentStock,
        });
        
        // Navigate to cart page after adding
        setTimeout(() => {
          router.push('/cart');
        }, 400);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setTimeout(() => setIsAddingToCart(false), 600);
    }
  };

  // Handle Wishlist Toggle
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(id);
      setIsWishlisted(false);
    } else {
      addToWishlist({
        id,
        name,
        price,
        originalPrice,
        image,
        slug,
        brand,
        stock: currentStock,
      });
      setIsWishlisted(true);
    }
  };

  // Handle Quick View
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onQuickView) {
      onQuickView();
    } else {
      setIsQuickViewOpen(true);
    }
  };

  // Create product object for QuickView
  const productForQuickView: Product = {
    id,
    slug,
    name,
    price,
    originalPrice,
    description: '',
    shortDescription: '',
    images: [image],
    image,
    rating,
    reviews,
    brand,
    isNew,
    isBestSeller,
    isOnSale,
    isFeatured,
    category: '',
    categorySlug: '',
    discountPercent,
    stock: currentStock,
    stockStatus: stockStatus || 'in_stock',
    stockQuantity: currentStock,
  };

  return (
    <motion.div
      className={`group relative h-full flex flex-col ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Discount Badge - Conditionally rendered */}
      {shouldShowDiscountBadge && (
        <div className="absolute top-2 left-2 z-20">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
            -{calculatedDiscountPercent}%
          </div>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-20 p-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-3.5 h-3.5 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Product Card */}
      <Link href={`/products/${slug}`} className="flex-1 flex flex-col">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full hover:border-orange-300 transition-all duration-300">
          {/* IMAGE AREA */}
          <div className="relative pt-[110%] sm:pt-[100%] md:pt-[95%] lg:pt-[90%] overflow-hidden bg-gray-50 group-hover:bg-gray-100 transition-colors">
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Status Badges on Image - Conditionally rendered based on showBestSellerBadge */}
            <div className="absolute top-10 left-2 z-20 flex flex-col gap-1">
              {isNew && !shouldShowDiscountBadge && (
                <div className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold shadow-sm">
                  NEW
                </div>
              )}
              {showBestSellerBadge && isBestSeller && !isNew && !shouldShowDiscountBadge && (
                <div className="bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-semibold shadow-sm">
                  BEST
                </div>
              )}
              {isFeatured && !isNew && !isBestSeller && !shouldShowDiscountBadge && (
                <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-semibold shadow-sm">
                  FEATURED
                </div>
              )}
            </div>

            {/* Quick View Overlay - Desktop Only */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex z-10">
              <Button
                onClick={handleQuickView}
                className="bg-white text-gray-900 hover:bg-gray-50 border-2 border-white shadow-xl px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>
          
          {/* TEXT AREA */}
          <div className="p-2 sm:p-2.5 md:p-3 flex flex-col flex-1 min-h-0">
            {/* Brand */}
            {brand && (
              <div className="mb-0.5">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate block">
                  {brand}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h3 className="font-medium text-gray-900 mb-1.5 line-clamp-2 text-sm leading-tight hover:text-orange-600 transition-colors min-h-[36px] sm:min-h-[40px]">
              {name}
            </h3>

            {/* Price */}
            <div className="mb-1.5 sm:mb-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-sm text-gray-400 line-through hidden sm:inline">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Rating - Conditionally rendered */}
            {showRating && (
              <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(rating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 hidden sm:inline">({reviews})</span>
                
                {/* Low Stock Badge */}
                {isLowStock && !isOutOfStock && (
                  <span className="ml-auto text-xs font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                    Low Stock
                  </span>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="mt-auto pt-1">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                className={`
                  w-full rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200
                  shadow-sm hover:shadow-md
                  ${isOutOfStock 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200' 
                    : (isMounted && isInCart)
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0 hover:from-green-600 hover:to-green-700 shadow-md'
                    : 'bg-gradient-to-r from-primary to-primary-dark text-white border-0 hover:from-primary-dark hover:to-primary-dark/90 active:scale-[0.98] shadow-md hover:shadow-lg'
                  }
                `}
                variant="default"
                size="sm"
              >
                {isOutOfStock ? (
                  <span className="truncate">Out of Stock</span>
                ) : (isMounted && isInCart) ? (
                  <span className="flex items-center">
                    <Check className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span className="truncate">View Cart</span>
                  </span>
                ) : isAddingToCart ? (
                  <span className="flex items-center">
                    <div className="w-3.5 h-3.5 mr-1.5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    <span className="truncate">Adding...</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span className="truncate">Add to Cart</span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={productForQuickView}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={(product) => {
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image || product.images?.[0] || '/api/placeholder/400/400',
            slug: product.slug || product.id,
            brand: product.brand,
            stock: product.stock || product.stockQuantity || 10,
          });
          setIsQuickViewOpen(false);
        }}
      />
    </motion.div>
  );
};