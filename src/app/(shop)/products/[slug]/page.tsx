"use client";

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Heart, Share2, ShoppingCart, Star, Check, 
  Truck, Shield, RotateCcw, ChevronLeft, ChevronRight,
  Minus, Plus, Info, Package, Award, Clock, ArrowLeft, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGallery } from '@/components/products/ProductDetail/ProductGallery';
import { ColorSelector } from '@/components/products/ProductDetail/ColorSelector';
import { SizeSelector } from '@/components/products/ProductDetail/SizeSelector';
import { QuantitySelector } from '@/components/products/ProductDetail/QuantitySelector';
import { RelatedProducts } from '@/components/products/ProductDetail/RelatedProducts';
import { ProductTabs } from '@/components/products/ProductDetail/ProductTabs';
import { productAPI } from '@/lib/data/mockData';
import { Product } from '@/lib/data/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  // Initialize stores with error handling
  let cartStore, wishlistStore;
  try {
    cartStore = useCartStore();
    wishlistStore = useWishlistStore();
  } catch (error) {
    console.error('Error initializing stores:', error);
  }
  
  const { addToCart, getItemById } = cartStore || {
    addToCart: () => {},
    getItemById: () => undefined,
  };
  const { addToWishlist, removeFromWishlist, isInWishlist } = wishlistStore || {
    addToWishlist: () => {},
    removeFromWishlist: () => {},
    isInWishlist: () => false,
  };
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!slug) {
          setError('No product slug provided');
          setLoading(false);
          return;
        }
        
        const data = await productAPI.getBySlug(slug);
        if (data) {
          setProduct(data);
          try {
            setIsWishlisted(isInWishlist(data.id));
          } catch (err) {
            console.error('Error checking wishlist:', err);
          }
        } else {
          setError(`Product not found: ${slug}`);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    } else {
      setError('No product slug provided');
      setLoading(false);
    }
  }, [slug, isInWishlist]);

  // Show error state
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-28">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-[#E5E7EB] rounded w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-[#E5E7EB] rounded-2xl" />
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-[#E5E7EB] rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-[#E5E7EB] rounded w-3/4" />
                <div className="h-6 bg-[#E5E7EB] rounded w-1/2" />
                <div className="h-4 bg-[#E5E7EB] rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show not found if no product after loading
  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!product) return;
    
    try {
      setAddedToCart(true);
      
      // Validate product data
      if (!product.id || !product.name || typeof product.price !== 'number') {
        console.error('Invalid product data:', product);
        alert('Unable to add product to cart. Invalid product data.');
        setAddedToCart(false);
        return;
      }
      
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || product.image || '/api/placeholder/400/400',
        slug: product.slug || product.id,
        brand: product.brand,
        stock: product.stock || product.stockQuantity || 10,
        size: selectedSize || undefined,
      });
      
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
      setAddedToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || product.image || '',
        slug: product.slug,
        brand: product.brand,
        stock: product.stock || product.stockQuantity || 0,
      });
      setIsWishlisted(true);
    }
  };

  // Make sure sizes exist and handle them properly
  const availableSizes = product?.sizes || [];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#FF6B35] transition-colors">Products</Link>
            <span>/</span>
            <Link 
              href={`/categories/${product.categorySlug}`} 
              className="hover:text-[#FF6B35] transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Images */}
          <div>
            <ProductGallery 
              images={product.images} 
              productName={product.name} 
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-4">
              {product.brand && (
                <span className="px-3 py-1 bg-[#F8F9FA] text-[#6B7280] text-sm rounded-full">
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="px-3 py-1 bg-[#FFF4EF] text-[#FF6B35] text-sm rounded-full">
                  {product.category}
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 bg-[#10B981] text-white text-sm rounded-full">
                  NEW
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#F59E0B] text-[#F59E0B]'
                        : 'text-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#1A1A1A] font-semibold">{product.rating}</span>
              <span className="text-[#6B7280]">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E5E7EB]">
              <span className="text-4xl font-bold text-[#FF6B35]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-xl text-[#9CA3AF] line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-[#EF4444] text-white text-sm rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-[#1A1A1A]">
                    Size
                  </label>
                  <button className="text-sm text-[#FF6B35] hover:underline flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-[#FF6B35] bg-[#FFF4EF] text-[#FF6B35]'
                          : 'border-[#E5E7EB] hover:border-[#FF6B35]/50 text-[#6B7280]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                  Color
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedImage === index
                          ? 'border-[#FF6B35] shadow-lg scale-110'
                          : 'border-[#E5E7EB] hover:border-[#FF6B35]/50 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Quantity
                  </label>
                  <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    min={1}
                    max={10}
                  />
                </div>
                <div className="flex-1">
                  <Button
                    onClick={handleAddToCart}
                    className="btn-primary w-full h-12"
                    disabled={addedToCart}
                  >
                    {addedToCart ? (
                      <span className="flex items-center">
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-[#FF6B35] text-[#FF6B35]' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFF4EF] flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Free Shipping</p>
                    <p className="text-xs text-[#6B7280]">Orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFF4EF] flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Easy Returns</p>
                    <p className="text-xs text-[#6B7280]">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFF4EF] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Secure Payment</p>
                    <p className="text-xs text-[#6B7280]">100% protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-[#E5E7EB] bg-transparent rounded-none h-auto p-0 mb-6">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] rounded-none pb-4"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] rounded-none pb-4"
                >
                  Product Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] rounded-none pb-4"
                >
                  Reviews ({product.reviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <p className="text-[#6B7280] leading-relaxed">
                  {product.description}
                </p>
                {product.shortDescription && (
                  <div className="mt-6 p-6 bg-[#F8F9FA] rounded-xl">
                    <h4 className="font-semibold text-[#1A1A1A] mb-3">Key Features</h4>
                    <p className="text-[#6B7280]">{product.shortDescription}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                  {product.brand && (
                    <div className="grid grid-cols-2 border-b border-[#E5E7EB] py-3">
                      <span className="font-medium text-[#1A1A1A]">Brand</span>
                      <span className="text-[#6B7280]">{product.brand}</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="grid grid-cols-2 border-b border-[#E5E7EB] py-3">
                      <span className="font-medium text-[#1A1A1A]">Category</span>
                      <span className="text-[#6B7280]">{product.category}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 border-b border-[#E5E7EB] py-3">
                    <span className="font-medium text-[#1A1A1A]">Rating</span>
                    <span className="text-[#6B7280]">{product.rating}/5</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-[#E5E7EB] py-3">
                    <span className="font-medium text-[#1A1A1A]">Reviews</span>
                    <span className="text-[#6B7280]">{product.reviews}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="text-center py-12">
                  <div className="text-5xl font-bold text-[#1A1A1A] mb-2">{product.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#F59E0B] text-[#F59E0B]'
                            : 'text-[#E5E7EB]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[#6B7280] mb-6">Based on {product.reviews} customer reviews</p>
                  <Button className="btn-secondary">Write a Review</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <RelatedProducts 
            category={product.categorySlug || product.category || ''}
            currentProductId={product.id}
          />
        </motion.div>
      </div>
    </div>
  );
}