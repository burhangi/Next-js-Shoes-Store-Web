// components/layout/header/CartDrawer.tsx - SIMPLE VERSION
"use client";

import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const CartDrawer: React.FC = () => {
  const [itemCount] = useState(3); // Example count

  return (
    <button className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
          {itemCount}
        </span>
      )}
    </button>
  );
};