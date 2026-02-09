// components/categories/CategoryFilters.tsx
"use client";

import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CategoryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFeatured: boolean;
  setShowFeatured: (show: boolean) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  showFeatured,
  setShowFeatured,
  isOpenMobile,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isOpenMobile ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={onCloseMobile}
      />

      {/* Sidebar Container */}
      <div 
        className={cn(
          "bg-white fixed top-0 left-0 bottom-0 z-50 w-80 lg:w-full lg:static lg:block p-6 overflow-y-auto transition-transform duration-300 lg:transform-none border-r border-[#E5E7EB] lg:border border-gray-200 lg:rounded-xl shadow-sm",
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Filters</h2>
          <button onClick={onCloseMobile} className="p-2 text-[#6B7280]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Search Section */}
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Search
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a category..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-all"
              />
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Featured Section */}
          <div>
             <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Preferences
            </h3>
            <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100">
              <div className={cn(
                "w-5 h-5 rounded border border-[#D1D5DB] flex items-center justify-center transition-colors bg-white",
                showFeatured ? "bg-[#FF6B35] border-[#FF6B35]" : "group-hover:border-[#FF6B35]"
              )}>
                 {showFeatured && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-white -rotate-45 mb-0.5" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={showFeatured}
                onChange={(e) => setShowFeatured(e.target.checked)}
              />
              <span className={cn(
                "flex items-center gap-2",
                showFeatured ? "text-[#FF6B35] font-bold" : "text-[#6B7280] group-hover:text-[#1A1A1A]"
              )}>
                <Sparkles className="w-4 h-4" />
                Featured Only
              </span>
            </label>
          </div>

          {/* Helper Text */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Pro Tip:</strong> Use the search bar to find specific collections like "Running" or "Summer".
            </p>
          </div>
        </div>

         {/* Mobile Apply Button */}
         <div className="mt-8 pt-6 border-t border-[#E5E7EB] lg:hidden">
          <button 
            className="w-full py-3 bg-[#FF6B35] text-white font-bold rounded-xl hover:bg-[#E85A28] transition-colors shadow-lg shadow-orange-500/20"
            onClick={onCloseMobile}
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
};
