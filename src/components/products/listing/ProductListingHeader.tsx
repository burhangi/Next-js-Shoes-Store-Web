// 📄 /components/products/listing/ProductListingHeader.tsx
"use client";

import { Filter } from 'lucide-react';

interface ProductListingHeaderProps {
  title: string;
  description: string;
  showFilter?: boolean;
  filterText?: string;
  onFilterClick?: () => void;
}

export const ProductListingHeader = ({
  title,
  description,
  showFilter = true,
  filterText = "Filter",
  onFilterClick
}: ProductListingHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between mb-6 md:mb-8 gap-4">
      <div>
        <h2 className="text-[20px] md:text-[24px] font-bold text-foreground mb-1">
          {title}
        </h2>
        <p className="text-[13px] md:text-[14px] text-muted-foreground">
          {description}
        </p>
      </div>
      
      {showFilter && (
        <div className="flex items-center gap-2">
          <button 
            onClick={onFilterClick}
            className="border border-border text-foreground bg-transparent rounded-full text-[12px] md:text-[14px] px-3 md:px-4 py-2 hover:bg-muted transition-colors"
          >
            <Filter className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            {filterText}
          </button>
        </div>
      )}
    </div>
  );
};