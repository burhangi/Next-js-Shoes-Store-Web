"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Share2, ArrowRight, Filter } from 'lucide-react';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { items, removeFromWishlist, moveToCart, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      slug: item.slug,
      brand: item.brand,
      stock: item.stock
    });
    removeFromWishlist(item.id);
  };

  const handleMoveSelectedToCart = () => {
    selectedItems.forEach(id => {
      const item = items.find(i => i.id === id);
      if (item) {
        handleMoveToCart(item);
      }
    });
    setSelectedItems([]);
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach(id => removeFromWishlist(id));
    setSelectedItems([]);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all items from your wishlist?')) {
      setIsClearing(true);
      setTimeout(() => {
        clearWishlist();
        setIsClearing(false);
      }, 300);
    }
  };

  if (isClearing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <CheckoutHeader 
          title="Wishlist"
          subtitle="Your saved items"
        />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Clearing wishlist...</p>
          </div>
        </div>
        <CheckoutFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CheckoutHeader 
        title="Wishlist"
        subtitle={`${items.length} item${items.length !== 1 ? 's' : ''} saved for later`}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-16 h-16 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600">
                  {selectedItems.length > 0
                    ? `${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''} selected`
                    : 'Select items to take action'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleSelectAll}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                </Button>
                
                {selectedItems.length > 0 && (
                  <>
                    <Button
                      variant="default"
                      onClick={handleMoveSelectedToCart}
                      className="bg-primary hover:bg-primary-dark"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add Selected to Cart
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleRemoveSelected}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Selected
                    </Button>
                  </>
                )}
                
                <Button
                  variant="ghost"
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    group relative bg-white rounded-xl border-2 transition-all duration-300
                    ${selectedItems.includes(item.id)
                      ? 'border-primary shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                    }
                  `}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-5 h-5 text-primary rounded focus:ring-primary/30"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 shadow-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Product Image */}
                  <Link href={`/products/${item.slug}`} className="block">
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl">👟</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/products/${item.slug}`} className="group block">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {item.brand && (
                      <p className="text-sm text-gray-600 mt-1">{item.brand}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
                        <span className={item.stock > 5 ? 'text-green-600' : 'text-red-600'}>
                          {item.stock > 5 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Wishlist Summary</h3>
                  <p className="text-gray-600">
                    Total value: ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    asChild
                    className="border-gray-300"
                  >
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <Button
                    onClick={() => {
                      items.forEach(item => handleMoveToCart(item));
                    }}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add All to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <CheckoutFooter showTrustBadges={items.length > 0} />
    </div>
  );
}