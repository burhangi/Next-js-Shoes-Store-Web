// components/categories/FilterSidebar.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider'; // Assuming we have this or I will shim it
import { cn } from '@/lib/utils/cn';

interface FilterSidebarProps {
  className?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  className,
  isOpenMobile,
  onCloseMobile 
}) => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const brands = [
    'Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Vans', 'Converse', 
    'Timberland', 'Clarks', 'Dr. Martens', 'Under Armour', 'Hoka', 'Brooks', 
    'Skechers', 'Allen Edmonds'
  ].sort();
  const sizes = ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

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
          "bg-[#F8F9FA] fixed top-0 left-0 bottom-0 z-50 w-80 lg:w-full lg:static lg:block p-6 overflow-y-auto transition-transform duration-300 lg:transform-none border-r border-[#E5E7EB] lg:border-none lg:rounded-xl",
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Filters</h2>
          <button onClick={onCloseMobile} className="p-2 text-[#6B7280]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="px-1 pt-2 pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#1A1A1A]">${priceRange[0]}</span>
                <span className="text-sm font-bold text-[#1A1A1A]">${priceRange[1]}</span>
              </div>
              <Slider 
                value={priceRange} 
                max={500} 
                step={10} 
                onValueChange={(val: any) => setPriceRange(val)}
                className="[&_.range]:bg-[#FF6B35] [&_.thumb]:border-[#FF6B35] [&_.thumb]:bg-white" 
              />
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Brands">
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border border-[#D1D5DB] flex items-center justify-center transition-colors",
                    selectedBrands.includes(brand) ? "bg-[#FF6B35] border-[#FF6B35]" : "bg-white group-hover:border-[#FF6B35]"
                  )}>
                    {selectedBrands.includes(brand) && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-white -rotate-45 mb-0.5" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className={cn(
                    "text-sm",
                     selectedBrands.includes(brand) ? "text-[#FF6B35] font-bold" : "text-[#6B7280] group-hover:text-[#1A1A1A]"
                  )}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Sizes */}
          <FilterSection title="Size">
             <div className="grid grid-cols-3 gap-2">
               {sizes.map(size => (
                 <button
                   key={size}
                   onClick={() => toggleSize(size)}
                   className={cn(
                     "px-2 py-2 text-xs font-bold rounded-lg border transition-all",
                     selectedSizes.includes(size)
                       ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                       : "bg-white border-[#E5E7EB] text-[#1A1A1A] hover:border-[#FF6B35]"
                   )}
                 >
                   {size.replace('US ', '')}
                 </button>
               ))}
             </div>
          </FilterSection>
          
          {/* Colors */}
           <FilterSection title="Color">
             <div className="flex flex-wrap gap-3">
               {['#000000', '#FFFFFF', '#1A4D2E', '#991B1B', '#1E40AF', '#F59E0B'].map(color => (
                 <button
                   key={color}
                   className={cn(
                     "w-8 h-8 rounded-full border border-gray-200 shadow-sm relative group"
                     // active check logic
                   )}
                   style={{ backgroundColor: color }}
                         aria-label={`Select color ${color}`}
                 >
                    {/* Checkmark logic if needed */}
                 </button>
               ))}
             </div>
           </FilterSection>

        </div>

        {/* Apply Button */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
          <button 
            className="w-full py-3 bg-[#FF6B35] text-white font-bold rounded-xl hover:bg-[#E85A28] transition-colors shadow-lg shadow-orange-500/20"
            onClick={onCloseMobile}
          >
            Apply Filters
          </button>
          <button 
            className="w-full mt-3 py-2 text-[#FF6B35] font-medium text-sm hover:underline"
            onClick={() => {
                setPriceRange([50, 200]);
                setSelectedBrands([]);
                setSelectedSizes([]);
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-[#E5E7EB] last:border-0 pb-6 last:pb-0">
      <button 
        className="flex items-center justify-between w-full mb-4 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#1A1A1A] font-bold text-base">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#6B7280]" /> : <ChevronDown className="w-5 h-5 text-[#6B7280]" />}
      </button>
      {isOpen && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
