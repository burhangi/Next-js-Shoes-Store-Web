// 📄 /components/products/listing/ProductListingPage.tsx
"use client";

import { ReactNode } from 'react';
import { Product } from '@/lib/data/products/types';
import { ProductListingHero } from './ProductListingHero';
import { ProductListingHeader } from './ProductListingHeader';
import { ProductListingGrid } from './ProductListingGrid';
import { ProductListingCTA } from './ProductListingCTA';

interface ProductListingPageProps {
  // Hero Section
  pageTitle: string;
  pageDescription: string;
  heroIcon: ReactNode;
  heroBgColor: string;
  heroTextColor?: string;
  heroStats?: Array<{ label: string; value: string | number; icon: ReactNode }>;
  
  // Products Section
  products: Product[];
  loading: boolean;
  sectionTitle: string;
  sectionDescription: string;
  showDiscountBadge?: boolean;
  showRating?: boolean;
  showBestSellerBadge?: boolean;
  
  // CTA Section
  ctaIcon: ReactNode;
  ctaTitle: string;
  ctaDescription: string;
  ctaBgColor?: string;
  ctaTextColor?: string;
  primaryButton?: { text: string; href: string; variant?: 'primary' | 'secondary' | 'outline' };
  secondaryButton?: { text: string; href: string };
  
  // Optional
  showFilter?: boolean;
  filterText?: string;
  onFilterClick?: () => void;
}

export const ProductListingPage = ({
  // Hero
  pageTitle,
  pageDescription,
  heroIcon,
  heroBgColor,
  heroTextColor,
  heroStats,
  
  // Products
  products,
  loading,
  sectionTitle,
  sectionDescription,
  showDiscountBadge = false,
  showRating = true,
  showBestSellerBadge = true,
  
  // CTA
  ctaIcon,
  ctaTitle,
  ctaDescription,
  ctaBgColor,
  ctaTextColor,
  primaryButton,
  secondaryButton,
  
  // Optional
  showFilter = true,
  filterText = "Filter",
  onFilterClick
}: ProductListingPageProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ProductListingHero
        title={pageTitle}
        description={pageDescription}
        icon={heroIcon}
        bgColor={heroBgColor}
        textColor={heroTextColor}
        stats={heroStats}
      />

      {/* Products Section */}
      <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8 md:py-12">
        <ProductListingHeader
          title={sectionTitle}
          description={sectionDescription}
          showFilter={showFilter}
          filterText={filterText}
          onFilterClick={onFilterClick}
        />

        <ProductListingGrid
          products={products}
          loading={loading}
          showDiscountBadge={showDiscountBadge}
          showRating={showRating}
          showBestSellerBadge={showBestSellerBadge}
        />

        {/* CTA Section */}
        {(primaryButton || secondaryButton) && (
          <div className="mt-12">
            <ProductListingCTA
              icon={ctaIcon}
              title={ctaTitle}
              description={ctaDescription}
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
              bgColor={ctaBgColor}
              textColor={ctaTextColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};