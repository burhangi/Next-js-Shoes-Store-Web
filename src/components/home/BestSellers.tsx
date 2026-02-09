"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "../products/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/data/products/mock-data";
import { AutoCarousel } from "./AutoCarousel";

interface BestSellersProps {
  products?: any[];
  title?: string;
  description?: string;
  limit?: number;
}

export function BestSellers({ 
  products, 
  title = "Best Sellers",
  description = "Customer favorites",
  limit = 8 
}: BestSellersProps) {
  const productsToShow = products || MOCK_PRODUCTS.slice(0, limit);

  return (
    <section className="py-[40px] md:py-[80px] bg-[#F8F9FA] w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-[#1A1A1A] mb-[4px] md:mb-[8px] leading-tight">
              {title}
            </h2>
            <p className="text-[13px] md:text-[16px] text-[#6B7280]">
              {description}
            </p>
          </div>

          <Link 
            href="/products/best-sellers" 
            className="flex items-center gap-1 md:gap-2 text-[#2C3E50] text-[13px] md:text-[15px] font-bold hover:text-[#1A252F] group transition-all duration-300 shrink-0"
          >
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All Best Sellers</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Auto Carousel */}
        <AutoCarousel
          autoPlayInterval={4000}
          cardWidthClass="w-[calc((100%-12px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]"
        >
          {productsToShow.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.images[0]}
              rating={product.rating}
              reviews={product.reviews}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              brand={product.brand}
            />
          ))}
        </AutoCarousel>
      </div>
    </section>
  );
}