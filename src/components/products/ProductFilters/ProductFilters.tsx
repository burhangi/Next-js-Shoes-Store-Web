// components/products/ProductFilters/ProductFilters.tsx
"use client";

import React, { useState } from "react";
import { Sliders, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type CheckedState = boolean | "indeterminate";
type FilterKey = "brand" | "size" | "color" | "minPrice" | "maxPrice";

interface ProductFiltersProps {
  filters: {
    brand: string[];
    size: string[];
    color: string[];
    minPrice: number;
    maxPrice: number;
  };
  onFilterChange: (key: FilterKey, value: any) => void;
  onReset: () => void;
  className?: string;
}

const BRAND_OPTIONS = [
  { id: "nike", label: "Nike", count: 45 },
  { id: "adidas", label: "Adidas", count: 38 },
  { id: "puma", label: "Puma", count: 32 },
  { id: "new-balance", label: "New Balance", count: 28 },
  { id: "converse", label: "Converse", count: 24 },
  { id: "vans", label: "Vans", count: 19 },
];

const SIZE_OPTIONS = [
  { id: "us-7", label: "US 7", count: 12 },
  { id: "us-8", label: "US 8", count: 45 },
  { id: "us-9", label: "US 9", count: 67 },
  { id: "us-10", label: "US 10", count: 89 },
  { id: "us-11", label: "US 11", count: 56 },
  { id: "us-12", label: "US 12", count: 23 },
];

const COLOR_OPTIONS = [
  { id: "black", label: "Black", color: "#000000", count: 56 },
  { id: "white", label: "White", color: "#FFFFFF", count: 48 },
  { id: "red", label: "Red", color: "#DC2626", count: 32 },
  { id: "blue", label: "Blue", color: "#2563EB", count: 41 },
  { id: "gray", label: "Gray", color: "#6B7280", count: 29 },
  { id: "green", label: "Green", color: "#10B981", count: 18 },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  className,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice,
    filters.maxPrice,
  ]);

  const handleBrandChange = (id: string, checked: CheckedState) => {
    const updated = checked ? [...filters.brand, id] : filters.brand.filter((b) => b !== id);
    onFilterChange("brand", updated);
  };

  const handleSizeChange = (id: string, checked: CheckedState) => {
    const updated = checked ? [...filters.size, id] : filters.size.filter((s) => s !== id);
    onFilterChange("size", updated);
  };

  const handleColorChange = (id: string, checked: CheckedState) => {
    const updated = checked ? [...filters.color, id] : filters.color.filter((c) => c !== id);
    onFilterChange("color", updated);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    onFilterChange("minPrice", value[0]);
    onFilterChange("maxPrice", value[1]);
  };

  const hasFilters =
    filters.brand.length > 0 ||
    filters.size.length > 0 ||
    filters.color.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 1000;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-primary-600" />
          <h3 className="font-semibold text-lg">Filters</h3>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["price", "brand", "size", "color"]}>
        {/* PRICE */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={handlePriceChange}
            />
          </AccordionContent>
        </AccordionItem>

        {/* BRAND */}
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-3">
            {BRAND_OPTIONS.map((b) => (
              <div key={b.id} className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Checkbox
                    checked={filters.brand.includes(b.id)}
                    onCheckedChange={(checked: CheckedState) => handleBrandChange(b.id, checked)}
                  />
                  <span className="text-sm">{b.label}</span>
                </div>
                <span className="text-xs">{b.count}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* SIZE */}
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent className="grid grid-cols-3 gap-2 pt-2">
            {SIZE_OPTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSizeChange(s.id, !filters.size.includes(s.id))}
                className={cn(
                  "border rounded-lg py-2 text-sm",
                  filters.size.includes(s.id) ? "bg-accent-600 text-white" : "bg-white"
                )}
              >
                {s.label}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* COLOR */}
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent className="grid grid-cols-3 gap-3 pt-2">
            {COLOR_OPTIONS.map((c) => (
              <div
                key={c.id}
                onClick={() => handleColorChange(c.id, !filters.color.includes(c.id))}
                className="cursor-pointer text-center"
              >
                <div
                  className={cn(
                    "w-12 h-12 mx-auto rounded-full border-2",
                    filters.color.includes(c.id)
                      ? "border-accent-600 ring-2 ring-accent-200"
                      : "border-primary-300"
                  )}
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-xs">{c.label}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
