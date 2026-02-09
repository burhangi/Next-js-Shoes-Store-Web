// 📄 /app/(shop)/products/flash-deals/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Flame, Zap, AlertTriangle, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { ProductListingPage } from '@/components/products/listing/ProductListingPage';
import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';
import { Product } from '@/lib/data/products/types';

export default function FlashDealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Show all products on sale with any discount, sorted by discount percentage
      const allProducts = MOCK_PRODUCTS as unknown as Product[];
      
      const flashDeals = allProducts
        .filter(product => product.isOnSale && (product.discountPercent || 0) > 0)
        .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
        .slice(0, 24);
      
      // Get some recommended products (Best Sellers or New Arrivals)
      const recommended = allProducts
        .filter(product => !product.isOnSale && (product.isBestSeller || product.isNew))
        .slice(0, 8);

      setProducts(flashDeals);
      setRecommendedProducts(recommended);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const heroStats = [
    { label: 'Active Deals', value: products.length, icon: <Flame className="h-4 w-4 text-red-600" /> },
    { label: '50%+ Off', value: products.filter(p => (p.discountPercent || 0) >= 50).length, icon: <Zap className="h-4 w-4 text-red-600" /> },
    { label: 'Ending Soon', value: '8', icon: <AlertTriangle className="h-4 w-4 text-red-600" /> },
    { label: 'Total Savings', value: '$2,500+', icon: <TrendingDown className="h-4 w-4 text-red-600" /> }
  ];

  return (
    <>
      <ProductListingPage
        // Hero Section
        pageTitle="Flash Deals"
        pageDescription="Exclusive discounts for a limited time only. Grab these deals before they're gone!"
        heroIcon={<Flame className="h-5 w-5" />}
        heroBgColor="bg-gradient-to-r from-red-600 to-red-700"
        heroStats={heroStats}
        
        // Products Section
        products={products.length > 0 ? products : recommendedProducts}
        loading={loading}
        sectionTitle={products.length > 0 ? "Hot Deals of the Day" : "Recommended For You"}
        sectionDescription={products.length > 0 ? "Limited quantities available at these unbeatable prices" : "Check out these top picks while you wait for new deals"}
        showDiscountBadge={true}
        
        // CTA Section
        ctaIcon={<Zap className="h-10 w-10 text-red-500" />}
        ctaTitle="Never Miss a Deal Again!"
        ctaDescription="Sign up for deal alerts and get notified when new flash sales go live."
        ctaBgColor="bg-gradient-to-r from-gray-900 to-gray-800"
        ctaTextColor="text-white"
        primaryButton={{
          text: "View All Products",
          href: "/products",
          variant: "outline"
        }}
      />
      
      {/* Recommended/Related Products Section when Flash Deals exist */}
      {products.length > 0 && (
        <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] pb-20">
            <div className="border-t border-gray-100 pt-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h3 className="text-[24px] md:text-[32px] font-black text-[#1A1A1A] tracking-tighter leading-none mb-3">
                            You May Also Like
                        </h3>
                        <p className="text-gray-500 text-[14px]">
                            Handpicked premium products to complement your style
                        </p>
                    </div>
                    <Link href="/products" className="text-[#FF6B35] font-bold text-[14px] hover:underline flex items-center gap-1">
                        View All Products <Zap className="w-3 h-3" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {recommendedProducts.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            slug={product.slug || `product-${product.id}`}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            image={product.images?.[0] || product.image || '/api/placeholder/400/400'}
                            rating={product.rating || 4.5}
                            reviews={product.reviews || 0}
                            isNew={product.isNew}
                            isBestSeller={product.isBestSeller}
                            brand={product.brand}
                            stockStatus={product.stockStatus}
                            stockQuantity={product.stockQuantity}
                            stock={product.stock}
                        />
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* Flash Deal Notice */}
      <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] pb-12">
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-1 text-[14px] md:text-[15px]">Important Notice</h4>
              <p className="text-amber-800/90 text-[12px] md:text-[13px]">
                Flash deals are limited time offers with limited quantities. 
                Prices will return to normal once stock runs out. 
                Don't wait — these deals won't last!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
