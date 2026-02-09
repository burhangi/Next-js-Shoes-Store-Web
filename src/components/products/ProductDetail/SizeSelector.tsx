"use client";

import { cn } from "@/lib/utils/cn";
import { ProductSize } from "@/lib/data/products/types";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onSelectSize: (size: ProductSize) => void;
  className?: string;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  className,
}: SizeSelectorProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = size.id === selectedSize.id;
          const isOutOfStock = size.stockQuantity <= 0;

          return (
            <button
              key={size.id}
              onClick={() => !isOutOfStock && onSelectSize(size)}
              disabled={isOutOfStock}
              className={cn(
                "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                isSelected
                  ? "bg-accent-600 text-white border-accent-600"
                  : "bg-white text-primary-700 border-primary-200 hover:border-accent-300",
                isOutOfStock && "opacity-50 cursor-not-allowed line-through"
              )}
              title={isOutOfStock ? "Out of stock" : size.name}
            >
              {size.value}
              {isOutOfStock && (
                <span className="ml-1 text-xs opacity-75">(X)</span>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedSize.stockQuantity <= 10 && selectedSize.stockQuantity > 0 && (
        <p className="text-sm text-orange-600">
          Only {selectedSize.stockQuantity} left in stock!
        </p>
      )}
      
      {selectedSize.stockQuantity === 0 && (
        <p className="text-sm text-red-600">
          This size is out of stock
        </p>
      )}
    </div>
  );
}