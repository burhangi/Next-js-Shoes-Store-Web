// 📄 /components/products/listing/ProductListingGrid.tsx - FIXED
"use client";

import { Product } from '@/lib/data/products/types';
import { ProductCard } from '@/components/products/ProductCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';

interface ProductListingGridProps {
  products: Product[];
  loading: boolean;
  showDiscountBadge?: boolean;
  showRating?: boolean;
  showBestSellerBadge?: boolean;
}

export const ProductListingGrid = ({
  products,
  loading,
  showDiscountBadge = false,
  showRating = true,
  showBestSellerBadge = true,
}: ProductListingGridProps) => {
  if (loading) {
    return <LoadingState message="Loading best sellers..." />;
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No products found"
        description="We couldn't find any best sellers at the moment."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
          isOnSale={product.isOnSale}
          isFeatured={product.isFeatured}
          brand={product.brand}
          discountPercent={product.discountPercent}
          stockStatus={product.stockStatus}
          stockQuantity={product.stockQuantity}
          stock={product.stock}
          showRating={showRating}
          showDiscountBadge={showDiscountBadge}
          showBestSellerBadge={showBestSellerBadge}
        />
      ))}
    </div>
  );
};