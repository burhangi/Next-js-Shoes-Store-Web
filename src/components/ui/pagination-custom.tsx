// components/ui/pagination-custom.tsx
"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationCustom: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3 mt-12 mb-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E5E7EB] text-[#FF6B35] hover:bg-[#FFF4EF] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-2">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
               currentPage === page 
                 ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-500/30 scale-110" 
                 : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E5E7EB] text-[#FF6B35] hover:bg-[#FFF4EF] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
