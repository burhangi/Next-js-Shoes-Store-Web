// 📄 /components/products/ProductQuickView.tsx - FIXED VERSION
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import { Product } from '@/lib/data/products/types';
import { WishlistButton } from './WishlistButton';
import { Button } from '@/components/ui/button';
import { STOCK_STATUS } from '@/lib/data/products/constants';
import { useCartStore } from '@/store/cartStore';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
}) => {
  const router = useRouter();
  const { addToCart, getItemById } = useCartStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  // Check cart state only on client side after mount
  useEffect(() => {
    setIsMounted(true);
    const cartItem = getItemById(product.id);
    setIsInCart(!!cartItem);
  }, [product.id, getItemById]);
  
  // Update cart state when store changes
  useEffect(() => {
    if (!isMounted) return;
    const cartItem = getItemById(product.id);
    setIsInCart(!!cartItem);
  }, [product.id, getItemById, isMounted]);

  // Calculate discount percentage safely
  const discountPercentage = product.salePrice && product.price > product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  // Get stock status info safely
  const stockStatusInfo = STOCK_STATUS[product.stockStatus] || STOCK_STATUS.in_stock;

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // Use cart store directly
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
    }
    
    // Navigate to cart after adding
    setTimeout(() => {
      router.push('/cart');
      onClose();
    }, 500);
    
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleViewDetails = () => {
    router.push(`/products/${product.slug}`);
    onClose();
  };

  const handleQuantityChange = (value: number) => {
    const maxStock = product.stockQuantity || product.stock || 0;
    const newQuantity = Math.max(1, Math.min(maxStock, quantity + value));
    setQuantity(newQuantity);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary-100">
            <h2 className="text-2xl font-bold text-primary-900">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-primary-50 rounded-xl overflow-hidden">
                <Image
                  src={product.images?.[selectedImageIndex] || product.thumbnail || '/api/placeholder/400/400'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    -{discountPercentage}%
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                        selectedImageIndex === index 
                          ? "border-accent-500 scale-105" 
                          : "border-transparent hover:border-primary-300"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Stock Status */}
              <div className="flex items-center gap-4">
                <div className={cn(
                  "px-3 py-1 text-sm font-medium rounded-full border",
                  stockStatusInfo.bgColor,
                  stockStatusInfo.color,
                  stockStatusInfo.borderColor
                )}>
                  {stockStatusInfo.label}
                </div>
                <span className="text-sm text-primary-600">
                  {product.stockQuantity || product.stock || 0} items in stock
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-primary-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary-600">
                  {(product.rating || 0).toFixed(1)} ({(product.reviewCount || product.reviews || 0).toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-accent-600">
                      ${(product.salePrice).toFixed(2)}
                    </span>
                    <span className="text-xl text-primary-500 line-through">
                      ${(product.price).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary-900">
                    ${(product.price).toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-primary-500">USD</span>
              </div>

              {/* Description */}
              <p className="text-primary-600">
                {product.shortDescription || product.description || ''}
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-primary-100">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-primary-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm font-medium">30-Day Returns</p>
                    <p className="text-xs text-primary-500">Hassle-free returns</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm font-medium">2-Year Warranty</p>
                    <p className="text-xs text-primary-500">Manufacturer warranty</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">Quantity:</span>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border-2 border-gray-200">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-md font-bold text-lg transition-all",
                        quantity <= 1 
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                          : "bg-white text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
                      )}
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stockQuantity || product.stock || 0)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-md font-bold text-lg transition-all",
                        quantity >= (product.stockQuantity || product.stock || 0)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                          : "bg-white text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
                      )}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={product.stockStatus === 'out_of_stock' || isAddedToCart}
                    className={cn(
                      "flex-1 font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
                      (isAddedToCart || (isMounted && isInCart))
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary-dark/90"
                        : "bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary-dark/90 hover:scale-[1.02]",
                      product.stockStatus === 'out_of_stock' && "bg-gray-300 hover:bg-gray-300 cursor-not-allowed opacity-60"
                    )}
                  >
                    {isAddedToCart || (isMounted && isInCart) ? (
                      <span className="flex items-center justify-center">
                        <Check className="h-5 w-5 mr-2 animate-in zoom-in duration-200" />
                        <span>Added to Cart</span>
                      </span>
                    ) : product.stockStatus === 'out_of_stock' ? (
                      <span>Out of Stock</span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        <span>Add to Cart</span>
                      </span>
                    )}
                  </Button>
                  <WishlistButton
                    productId={product.id}
                    initialLiked={false}
                    size="lg"
                    variant="outline"
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary/10"
                  />
                </div>

                {/* View Details Button */}
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium"
                  onClick={handleViewDetails}
                >
                  View Full Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};