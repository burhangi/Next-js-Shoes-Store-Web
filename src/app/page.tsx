"use client";

import HeroCarousel from "@/components/home/HeroCarousel";
import { FeaturesBenefits } from "@/components/home/FeaturesBenefits";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FlashDeals } from "@/components/home/FlashDeals";
import { ShopByStyle } from "@/components/home/ShopByStyle";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { PremiumBrands } from "@/components/home/PremiumBrands";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialProof } from "@/components/home/SocialProof";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden w-full bg-white">
      {/* 1. Hero Carousel - Powerful First Impression */}
      <HeroCarousel />

      {/* 2. Features & Benefits - Build Trust Immediately */}
      <FeaturesBenefits />

      {/* 3. Featured Categories - Easy Navigation */}
      <FeaturedCategories />

      {/* 4. Flash Deals - Create Urgency & FOMO */}
      <FlashDeals />

      {/* 5. Shop By Style - Lifestyle Connection */}
      <ShopByStyle />

      {/* 6. New Arrivals - Fresh & Trending */}
      <NewArrivals />

      {/* 7. Best Sellers - Social Proof Through Popularity */}
      <BestSellers />

      {/* 8. Brand Story - Emotional Connection */}
      <BrandStory />

      {/* 9. Premium Brands - Brand Credibility */}
      <PremiumBrands />

      {/* 10. Testimonials - Customer Stories & Trust */}
      <Testimonials />

      {/* 11. Social Proof - Community & Engagement */}
      <SocialProof />

      {/* 12. Newsletter - Lead Capture */}
      <NewsletterSection />
    </div>
  );
}