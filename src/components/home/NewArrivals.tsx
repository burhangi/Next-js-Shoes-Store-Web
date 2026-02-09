"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productAPI } from "@/lib/data/products/mock-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/lib/data/types";
import { AutoCarousel } from "./AutoCarousel";

export const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const newArrivals = await productAPI.getNewArrivals(8);
      setProducts(newArrivals);
    } catch (error) {
      console.error("Error loading new arrivals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-[40px] md:py-[80px] bg-white w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-[#1A1A1A] mb-[4px] md:mb-[8px] leading-tight">
              New Arrivals
            </h2>
            <p className="text-[13px] md:text-[16px] text-[#6B7280]">
              Fresh styles just landed — grab them first
            </p>
          </div>

          <Link 
            href="/products/new-arrivals" 
            className="flex items-center gap-1 md:gap-2 text-primary text-[13px] md:text-[15px] font-bold hover:text-primary-dark group transition-all duration-300 shrink-0"
          >
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All New Arrivals</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Auto Carousel or Loading */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-[#E5E7EB] rounded-xl mb-4" />
                <div className="h-4 bg-[#E5E7EB] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <AutoCarousel
            autoPlayInterval={4500}
            cardWidthClass="w-[calc((100%-12px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]"
          >
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                brand={product.brand}
              />
            ))}
          </AutoCarousel>
        )}
      </div>
    </section>
  );
};