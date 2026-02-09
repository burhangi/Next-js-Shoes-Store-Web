// 📄 /app/(shop)/products/new-arrivals/page.tsx - FIXED
"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Calendar, Star, TrendingUp } from 'lucide-react';
import { ProductListingPage } from '@/components/products/listing/ProductListingPage';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with timeout
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Filter new arrivals from mock data
        const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 12);
        setProducts(newArrivals);
      } catch (error) {
        console.error('Error loading new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      loadProducts();
    }, 500);
  }, []);

  const heroStats = [
    { label: 'New Products', value: products.length, icon: <Sparkles className="h-4 w-4 text-primary" /> },
    { label: 'Added This Week', value: '24+', icon: <Calendar className="h-4 w-4 text-primary" /> },
    { label: 'High Rated', value: '15+', icon: <Star className="h-4 w-4 text-primary" /> },
    { label: 'Limited Stock', value: '8', icon: <TrendingUp className="h-4 w-4 text-primary" /> }
  ];

  return (
    <ProductListingPage
      pageTitle="New Arrivals"
      pageDescription="Fresh styles just landed — grab them before they're gone!"
      heroIcon={<Sparkles className="h-5 w-5" />}
      heroBgColor="bg-gradient-to-r from-primary to-primary-dark"
      heroStats={heroStats}
      
      products={products}
      loading={loading}
      sectionTitle="Latest Releases"
      sectionDescription="Fresh from the workshop, these are our newest additions"
      
      ctaIcon={<Sparkles className="h-10 w-10 text-primary" />}
      ctaTitle="Want to Be First?"
      ctaDescription="Sign up for our newsletter and be the first to know about new arrivals, exclusive drops, and special offers."
      ctaBgColor="bg-gradient-to-r from-[#FFF4EF] to-[#FFE8DD]"
      primaryButton={{
        text: "View All Products",
        href: "/products",
        variant: "outline"
      }}
      secondaryButton={{
        text: "Browse Categories",
        href: "/categories"
      }}
    />
  );
}