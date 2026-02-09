// components/products/ProductSort.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { SortOption } from "@/lib/data/products/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  value: string;
  onSortChange: (value: string) => void;
  options: SortOption[];
  className?: string;
}

export const ProductSort: React.FC<ProductSortProps> = ({
  value,
  onSortChange,
  options,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onSortChange}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
