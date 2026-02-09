"use client";

import { useProducts } from "@/lib/api/queries/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const { data, isLoading } = useProducts({ limit: 8 });

  if (isLoading) {
    return (
      <div className="space-y-6 mt-12">
        <div className="skeleton h-8 w-48 rounded-md bg-neutral-100" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Cast the data to any to avoid type conflicts
  const products = (data as any)?.products || data || [];

  // Filter out current product and limit to 4
  const relatedProducts = Array.isArray(products)
    ? products
        .filter((p: any) => p.id !== currentProductId)
        .slice(0, 4)
    : [];

  if (relatedProducts.length === 0) return null;

  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">You May Also Like</h2>
        <Link 
          href={`/categories/${categorySlug}`}
          className="group flex items-center gap-1 text-sm font-semibold text-[#FF6B35] hover:text-[#E85A28] transition-colors"
        >
          View All 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product: any) => {
          const image = product.images?.[0] || product.image || '';
          const brand = typeof product.brand === 'string' ? product.brand : product.brand?.name || '';
          const colors = Array.isArray(product.colors) 
            ? product.colors.map((c: any) => typeof c === 'string' ? c : c.hex || c.name || '')
            : [];
          
          return (
            <ProductCard 
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={image}
              rating={product.rating}
              reviews={product.reviews || product.reviewCount || 0}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              brand={brand}
              description={product.description || ''}
              shortDescription={product.shortDescription}
              colors={colors}
              images={product.images || []}
              discountPercent={product.discountPercent || product.discount}
            />
          );
        })}
      </div>
    </section>
  );
}