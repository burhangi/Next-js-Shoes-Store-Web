"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';
import { CartContent } from '@/components/cart/CartContent';
import { CartEmptyState } from '@/components/cart/CartEmptyState';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartItem } from '@/components/cart/CartItem';
import { RecommendedProducts } from '@/components/cart/RecommendedProducts';
import { ShippingEstimator } from '@/components/cart/ShippingEstimator';
import { PromoCodeInput } from '@/components/cart/PromoCodeInput';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useRouter } from 'next/navigation';
import { 
  Truck, 
  Package, 
  Shield, 
  Clock, 
  ArrowLeft, 
  RefreshCw, 
  Tag,
  ShoppingBag,
  Heart,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export default function CartPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize store with error handling
  let storeHook;
  try {
    storeHook = useCartStore();
  } catch (err) {
    console.error('Error initializing cart store:', err);
    // Continue with fallback values
  }
  
  const {
    items: storeItems = [],
    getSubtotal = () => 0,
    getShippingCost = () => 0,
    getTax = () => 0,
    getTotal = () => 0,
    getDiscountAmount = () => 0,
    promoCode = '',
    updateQuantity = () => {},
    removeFromCart = () => {},
    clearCart = () => {},
    applyPromoCode = () => false,
    setShippingOption = () => {},
    getItemCount = () => 0,
    startCheckout = async () => ({ success: false, error: 'Store not initialized' }),
  } = storeHook || {};
  
  // State for client-side values to prevent hydration mismatches
  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const { addToWishlist } = useWishlistStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [estimatedShipping, setEstimatedShipping] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'cart' | 'shipping' | 'summary'>('cart');

  // Handle client-side mounting and update cart state
  useEffect(() => {
    try {
      setIsMounted(true);
      setError(null);
    } catch (err) {
      console.error('Error mounting cart page:', err);
      setError('Failed to initialize cart page.');
    }
  }, []);

  // Update cart state after mount to prevent hydration issues
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      // Update cart state only after mount
      if (Array.isArray(storeItems)) {
        const validItems = storeItems.filter(item => item && item.id && item.name && typeof item.price === 'number');
        setItems(validItems);
        
        // Calculate values only after mount
        if (typeof getSubtotal === 'function') {
          setSubtotal(getSubtotal());
          setShippingCost(getShippingCost());
          setTax(getTax());
          setDiscountAmount(getDiscountAmount());
          setTotal(getTotal());
          setItemCount(getItemCount());
        }
      }
    } catch (err) {
      console.error('Error updating cart state:', err);
    }
  }, [isMounted, storeItems, getSubtotal, getShippingCost, getTax, getTotal, getDiscountAmount, getItemCount]);
  
  // Ensure items is always an array and filter out any invalid items
  const safeItems = Array.isArray(items) 
    ? items.filter(item => item && item.id && item.name && typeof item.price === 'number')
    : [];

  const handleApplyPromo = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = applyPromoCode(code);
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!isMounted || !safeItems || safeItems.length === 0) {
      alert('Your cart is empty. Add some items to proceed.');
      return;
    }
    
    setIsCheckingOut(true);
    try {
      const result = await startCheckout();
      if (result && result.success) {
        router.push('/checkout/shipping');
      } else {
        alert(result?.error || 'Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleMoveToWishlist = (itemId: string) => {
    if (!itemId || !isMounted || !safeItems) return;
    const item = safeItems.find(i => i && i.id === itemId);
    if (item) {
      try {
        addToWishlist({
          id: item.id,
          name: item.name || 'Product',
          price: typeof item.price === 'number' ? item.price : 0,
          originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : undefined,
          image: item.image || '/api/placeholder/400/400',
          slug: item.slug || item.id,
          brand: item.brand,
          stock: typeof item.stock === 'number' ? item.stock : 10,
          category: 'Shoes'
        });
        removeFromCart(itemId);
        // Update local state after removal
        setItems(prev => prev.filter(i => i.id !== itemId));
      } catch (error) {
        console.error('Error moving to wishlist:', error);
      }
    }
  };

  const handleClearCart = () => {
    if (!safeItems || safeItems.length === 0) return;
    
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('Are you sure you want to clear all items from your cart?');
      if (confirmed) {
        try {
          clearCart();
        } catch (error) {
          console.error('Error clearing cart:', error);
          alert('Failed to clear cart. Please try again.');
        }
      }
    }
  };

  const handleShippingEstimate = (shippingOption: any) => {
    if (!shippingOption || !shippingOption.id) return;
    try {
      setEstimatedShipping(shippingOption);
      // Update shipping option in store
      setShippingOption(shippingOption.id);
    } catch (error) {
      console.error('Error updating shipping:', error);
    }
  };

  const handleContinueShopping = () => {
    try {
      router.push('/products');
    } catch (error) {
      console.error('Error navigating:', error);
      window.location.href = '/products';
    }
  };

  const handleQuickView = (item: any) => {
    if (!item || !item.slug) return;
    try {
      router.push(`/products/${item.slug}`);
    } catch (error) {
      console.error('Error navigating to product:', error);
    }
  };

  const handleShare = (item: any) => {
    if (typeof window === 'undefined' || !item || !item.slug) return;
    
    try {
      const productUrl = `${window.location.origin}/products/${item.slug || item.id}`;
      
      if (navigator.share) {
        navigator.share({
          title: item.name || 'Product',
          text: `Check out ${item.name || 'this product'} on Luxury Store!`,
          url: productUrl,
        }).catch(() => {
          // Fallback if share fails
          if (navigator.clipboard) {
            navigator.clipboard.writeText(productUrl);
            alert('Product link copied to clipboard!');
          }
        });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(productUrl);
        alert('Product link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <CheckoutHeader 
          title="Shopping Cart"
          subtitle="Error loading cart"
          showSecurityBadge={false}
        />
        <main className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </main>
        <CheckoutFooter showTrustBadges={false} />
      </div>
    );
  }

  // Show loading state during hydration - but render empty cart structure to match server
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <CheckoutHeader 
          title="Shopping Cart"
          subtitle="Your shopping bag is waiting"
          showSecurityBadge={false}
        />
        <main className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </main>
        <CheckoutFooter showTrustBadges={false} />
      </div>
    );
  }

  // Show empty cart if no items after mount
  if (isMounted && safeItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <CheckoutHeader 
          title="Shopping Cart"
          subtitle="Your shopping bag is waiting"
          showSecurityBadge={false}
        />

        <main className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8">
          <CartEmptyState 
            primaryAction={{
              label: "Start Shopping",
              href: "/products",
              onClick: handleContinueShopping
            }}
            secondaryAction={{
              label: "View New Arrivals",
              href: "/products/new-arrivals"
            }}
          />
        </main>

        {/* Recommended Products Section */}
        <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-12">
          <RecommendedProducts 
            title="You Might Also Like"
            subtitle="Check out these popular products"
          />
        </div>

        <CheckoutFooter showTrustBadges={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <CheckoutHeader 
        title="Shopping Cart"
        subtitle={isMounted && itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart • Ready to checkout` : safeItems.length > 0 ? `${safeItems.length} item${safeItems.length !== 1 ? 's' : ''} in your cart` : 'Your shopping bag is waiting'}
        showBackButton={true}
        showSecurityBadge={true}
      />

      <main className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8 lg:py-12">
        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('cart')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors",
                activeTab === 'cart'
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              Cart Items
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors",
                activeTab === 'summary'
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              Order Summary
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items & Shipping */}
          <div className={cn(
            "lg:col-span-2 space-y-8",
            activeTab !== 'cart' && "hidden lg:block"
          )}>
            {/* Cart Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
                <p className="text-gray-600 text-lg">
                  Review and manage your items before checkout
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
                {safeItems.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold px-6"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {safeItems && safeItems.length > 0 ? (
                safeItems.map((item, index) => {
                  // Ensure item has all required properties
                  if (!item || !item.id || !item.name) return null;
                  
                  // Create a safe item object with all required fields
                  const safeItem = {
                    id: item.id,
                    name: item.name || 'Product',
                    price: typeof item.price === 'number' ? item.price : 0,
                    originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : undefined,
                    quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
                    image: item.image || '/api/placeholder/400/400',
                    slug: item.slug || item.id,
                    stock: typeof item.stock === 'number' && item.stock > 0 ? item.stock : 10,
                    brand: item.brand,
                    size: item.size,
                    color: item.color,
                    sku: item.sku,
                  };
                  
                  return (
                    <motion.div
                      key={safeItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden"
                    >
                      <CartItem
                        item={safeItem}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                        onMoveToWishlist={handleMoveToWishlist}
                        onQuickView={handleQuickView}
                        onShare={handleShare}
                        showActions={true}
                        showWishlist={true}
                        showShare={true}
                        variant="default"
                      />
                    </motion.div>
                  );
                }).filter(Boolean) // Remove any null entries
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No items in cart</p>
                </div>
              )}
            </div>

            {/* Trust Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 lg:p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border-2 border-primary/30 shadow-lg"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Over $99</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">30-Day Returns</p>
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">SSL Protected</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">24/7 Support</p>
                <p className="text-xs text-gray-600">Always Here</p>
              </div>
            </motion.div>

            {/* Shipping Estimator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ShippingEstimator
                onShippingChange={handleShippingEstimate}
                showTitle={true}
                compact={false}
              />
            </motion.div>

            {/* Promo Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <PromoCodeInput
                onApply={handleApplyPromo}
                initialCode={promoCode}
                size="md"
                showApplied={true}
                showPopularCodes={true}
                label="Apply Promo Code"
                placeholder="Enter promo code"
                disabled={isLoading}
              />
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className={cn(
            "lg:col-span-1 space-y-6",
            activeTab !== 'summary' && "hidden lg:block"
          )}>
            {/* Order Summary Card - Sticky */}
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CartSummary
                  subtotal={typeof subtotal === 'number' ? subtotal : 0}
                  shippingCost={typeof shippingCost === 'number' ? shippingCost : 0}
                  tax={typeof tax === 'number' ? tax : 0}
                  total={typeof total === 'number' ? total : 0}
                  discountAmount={typeof discountAmount === 'number' ? discountAmount : 0}
                  promoCode={promoCode || ''}
                  onCheckout={handleCheckout}
                  isLoading={isCheckingOut}
                  onApplyPromo={handleApplyPromo}
                  freeShippingThreshold={99}
                  checkoutLabel={`Proceed to Checkout • $${(typeof total === 'number' ? total : 0).toFixed(2)}`}
                  showProgressBar={true}
                  showSecurityNote={true}
                />
              </motion.div>
            </div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm">📞</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">1-800-SHOES-NOW</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm">💬</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm">✉️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@luxurystore.com</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/help/cart">View Cart FAQ</Link>
              </Button>
            </motion.div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">Your data is protected</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No card storage</span>
                </div>
              </div>
            </motion.div>

            {/* Continue Shopping Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/30 rounded-2xl shadow-lg p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-3">Continue Shopping</h4>
              <p className="text-gray-600 text-sm mb-4">
                Don't miss out on our latest collections and exclusive deals
              </p>
              <div className="space-y-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <Link href="/products/new-arrivals">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    New Arrivals
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Link href="/products/best-sellers">
                    <Tag className="w-4 h-4 mr-2" />
                    Best Sellers
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Link href="/wishlist">
                    <Heart className="w-4 h-4 mr-2" />
                    Your Wishlist
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Checkout Button */}
        <div className="lg:hidden mt-8 pt-8 border-t-2 border-gray-200">
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={cn(
              "w-full py-5 text-lg font-bold rounded-xl",
              "bg-gradient-to-r from-primary via-primary to-primary-dark",
              "hover:from-primary-dark hover:via-primary-dark hover:to-primary-dark/90",
              "hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]",
              "transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            {isCheckingOut ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Proceed to Checkout • ${(typeof total === 'number' ? total : 0).toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </main>

      {/* Recommended Products Section */}
      <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-12">
        <RecommendedProducts 
          title="Frequently bought together"
          subtitle="Customers who bought items in your cart also bought"
          limit={4}
          showNavigation={true}
          autoSlide={true}
        />
      </div>

      {/* Return Policy Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
              <p className="text-gray-600 text-sm">
                30-day return policy. Free returns on all orders.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Shipping</h4>
              <p className="text-gray-600 text-sm">
                Free shipping on orders over $99. 2-3 day delivery available.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-gray-600 text-sm">
                256-bit SSL encryption. Your data is always protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CheckoutFooter showTrustBadges={true} />
    </div>
  );
}