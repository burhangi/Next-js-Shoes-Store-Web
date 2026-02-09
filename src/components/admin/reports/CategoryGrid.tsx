// 📦 components/admin/reports/CategoryGrid.tsx
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ReportCategory } from '@/lib/data/reports';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface CategoryGridProps {
  categories: ReportCategory[];
  onCategoryClick?: (category: ReportCategory) => void;
  selectedCategory?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategoryClick,
  selectedCategory,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={cn(
            "cursor-pointer hover:shadow-lg transition-all duration-200",
            selectedCategory === category.id 
              ? "ring-2 ring-primary bg-primary/5" 
              : "hover:border-primary/50"
          )}
          onClick={() => onCategoryClick?.(category)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl",
                category.color
              )}>
                {category.icon}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm">
                <span className="text-gray-600">{category.count} reports</span>
              </div>
              <div className="flex items-center gap-1 text-primary font-medium text-sm">
                <span>View</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};