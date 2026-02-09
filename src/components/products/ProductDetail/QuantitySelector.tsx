"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  maxQuantity?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  step = 1,
  className,
  maxQuantity,
}: QuantitySelectorProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  
  const actualMax = maxQuantity ? Math.min(max, maxQuantity) : max;

  const handleDecrease = () => {
    const newQuantity = Math.max(min, localQuantity - step);
    setLocalQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(actualMax, localQuantity + step);
    setLocalQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const newQuantity = Math.min(actualMax, Math.max(min, value));
      setLocalQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleBlur = () => {
    if (localQuantity < min) {
      setLocalQuantity(min);
      onQuantityChange(min);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={localQuantity <= min}
        className="rounded-r-none border-r-0"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <input
        type="number"
        min={min}
        max={actualMax}
        step={step}
        value={localQuantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="h-10 w-16 border-y border-primary-200 bg-white text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
        aria-label="Product quantity"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={localQuantity >= actualMax}
        className="rounded-l-none border-l-0"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
      
      {maxQuantity && localQuantity >= maxQuantity && (
        <p className="ml-3 text-sm text-red-600">
          Maximum available quantity
        </p>
      )}
    </div>
  );
}