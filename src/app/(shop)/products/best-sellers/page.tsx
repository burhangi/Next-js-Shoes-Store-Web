// 📄 /app/(shop)/products/best-sellers/page.tsx - FIXED
"use client";

import { useState, useEffect } from 'react';
import { Star, TrendingUp, Award, Zap } from 'lucide-react';
import { ProductListingPage } from '@/components/products/listing/ProductListingPage';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';
import { Product } from '@/lib/data/products/types';

export default function BestSellersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter best sellers - use safe access
      const bestSellers = MOCK_PRODUCTS
        .filter(product => product.isBestSeller)
        .sort((a, b) => {
          const aSold = (a as any).soldCount || 0;
          const bSold = (b as any).soldCount || 0;
          return bSold - aSold;
        })
        .slice(0, 16);
      
      // Format products with all required fields
      const formattedProducts = bestSellers.map((product) => {
        const productData = product as any; // Temporary type assertion
        return {
          ...product,
          slug: product.slug || `product-${product.id}`,
          description: product.description || `Description for ${product.name}`,
          shortDescription: product.shortDescription || product.description?.substring(0, 100) || '',
          images: product.images || ['/api/placeholder/400/400'],
          image: product.image || product.images?.[0] || '/api/placeholder/400/400',
          rating: product.rating || 4.5,
          reviews: product.reviews || Math.floor(Math.random() * 100),
          stockStatus: product.stockStatus || 'in_stock',
          variants: product.variants || [],
          features: product.features || [],
          specifications: product.specifications || {},
          status: product.status || 'active',
          soldCount: productData.soldCount || Math.floor(Math.random() * 1000),
        } as Product;
      });
      
      setProducts(formattedProducts);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate stats safely
  const totalSold = products.reduce((sum, product) => {
    const productData = product as any;
    return sum + (productData.soldCount || 0);
  }, 0);
  
  const avgRating = products.length > 0 
    ? products.reduce((sum, product) => sum + (product.rating || 0), 0) / products.length 
    : 0;

  const heroStats = [
    { 
      label: 'Best Sellers', 
      value: products.length, 
      icon: <Award className="h-4 w-4 text-amber-600" /> 
    },
    { 
      label: 'Total Sold', 
      value: totalSold.toLocaleString(), 
      icon: <TrendingUp className="h-4 w-4 text-amber-600" /> 
    },
    { 
      label: 'Avg Rating', 
      value: avgRating.toFixed(1), 
      icon: <Star className="h-4 w-4 text-amber-600" /> 
    },
    { 
      label: 'Popular Now', 
      value: '🔥', 
      icon: <Zap className="h-4 w-4 text-amber-600" /> 
    }
  ];

  return (
    <ProductListingPage
      // Hero Section
      pageTitle="Best Sellers"
      pageDescription="Discover our most loved products, curated by thousands of satisfied customers. Join the trend!"
      heroIcon={<Award className="h-5 w-5 text-white" />}
      heroBgColor="bg-gradient-to-r from-amber-600 to-amber-700"
      heroStats={heroStats}
      
      // Products Section
      products={products}
      loading={loading}
      sectionTitle="Top Rated Collection"
      sectionDescription="Join thousands of satisfied customers with these proven favorites"
      showDiscountBadge={true}
      showRating={true}
      showBestSellerBadge={true}
      
      // CTA Section
      ctaIcon={<Star className="h-10 w-10 text-amber-600" />}
      ctaTitle="Love Quality Products?"
      ctaDescription="Sign up for our newsletter to get updates on new best sellers and exclusive deals."
      ctaBgColor="bg-gradient-to-r from-amber-50 to-amber-100"
      primaryButton={{
        text: "View All Products",
        href: "/products",
        variant: "outline"
      }}
    />
  );
}