"use client";

import { cn } from "@/lib/utils/cn";
import { ProductColor } from "@/lib/data/products/types";
import { Check } from "lucide-react";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
  className?: string;
  variant?: 'circle' | 'square';
}

export function ColorSelector({
  colors,
  selectedColor,
  onSelectColor,
  className,
  variant = 'circle',
}: ColorSelectorProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = color.id === selectedColor.id;
          const isOutOfStock = color.stockQuantity <= 0;

          return (
            <button
              key={color.id}
              onClick={() => !isOutOfStock && onSelectColor(color)}
              disabled={isOutOfStock}
              className="group relative"
              title={`${color.name}${isOutOfStock ? ' - Out of stock' : ''}`}
            >
              {/* Color Circle/Square */}
              <div
                className={cn(
                  "relative flex items-center justify-center border-2 transition-all",
                  variant === 'circle' ? "w-10 h-10 rounded-full" : "w-12 h-12 rounded-lg",
                  isSelected
                    ? "border-accent-600 scale-110"
                    : "border-primary-200 group-hover:border-accent-400",
                  isOutOfStock && "opacity-50"
                )}
                style={{ backgroundColor: color.hexCode }}
              >
                {isSelected && (
                  <Check className="h-5 w-5 text-white drop-shadow" />
                )}
                
                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-white/50 rounded-full" />
                )}
              </div>

              {/* Color Name */}
              <span className={cn(
                "block text-xs text-center mt-1",
                isSelected ? "text-accent-700 font-medium" : "text-primary-600",
                isOutOfStock && "line-through"
              )}>
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {selectedColor.stockQuantity <= 10 && selectedColor.stockQuantity > 0 && (
        <p className="text-sm text-orange-600">
          Only {selectedColor.stockQuantity} left in {selectedColor.name}!
        </p>
      )}
    </div>
  );
}