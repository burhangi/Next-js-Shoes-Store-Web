// components/categories/FilterBar.tsx
"use client";

import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FilterBarProps {
  totalCount: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onOpenFilters: () => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  totalCount,
  viewMode,
  setViewMode,
  onOpenFilters,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="bg-white border-b border-[#E5E7EB] sticky top-[72px] z-30 px-4 py-3 md:py-0 md:h-[60px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
       
       <div className="flex items-center justify-between w-full md:w-auto gap-4">
         {/* Mobile Filter Button */}
         <button 
           onClick={onOpenFilters}
           className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-bold md:hidden"
         >
           <SlidersHorizontal className="w-4 h-4" />
           Filters
         </button>

         {/* Result Count - Desktop */}
         <p className="text-[#6B7280] text-sm hidden md:block">
           Showing <span className="font-bold text-[#1A1A1A]">{totalCount}</span> products
         </p>
       </div>

       {/* Right Side Controls */}
       <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
         
         <p className="text-[#6B7280] text-sm md:hidden">
           <span className="font-bold text-[#1A1A1A]">{totalCount}</span> items
         </p>

         <div className="flex items-center gap-4">
           {/* Sort Dropdown */}
           <div className="flex items-center gap-2">
             <span className="text-sm text-[#6B7280] hidden sm:block">Sort by:</span>
             <div className="relative">
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="appearance-none pl-3 pr-8 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35] cursor-pointer"
               >
                 <option value="popular">Most Popular</option>
                 <option value="newest">Newest Arrivals</option>
                 <option value="price-asc">Price: Low to High</option>
                 <option value="price-desc">Price: High to Low</option>
               </select>
               <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
             </div>
           </div>

           {/* View Toggle */}
           <div className="flex bg-[#F3F4F6] rounded-lg p-1">
             <button
               onClick={() => setViewMode('grid')}
               className={cn(
                 "p-1.5 rounded-md transition-all",
                 viewMode === 'grid' ? "bg-white shadow-sm text-[#FF6B35]" : "text-[#9CA3AF] hover:text-[#6B7280]"
               )}
               aria-label="Grid view"
             >
               <LayoutGrid className="w-5 h-5" />
             </button>
             <button
               onClick={() => setViewMode('list')}
               className={cn(
                 "p-1.5 rounded-md transition-all",
                 viewMode === 'list' ? "bg-white shadow-sm text-[#FF6B35]" : "text-[#9CA3AF] hover:text-[#6B7280]"
               )}
               aria-label="List view"
             >
               <List className="w-5 h-5" />
             </button>
           </div>
         </div>
       </div>
    </div>
  );
};
