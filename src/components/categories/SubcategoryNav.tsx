// components/categories/SubcategoryNav.tsx
"use client"; // ADD THIS AT THE TOP

import React, { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Grid, Filter, SortAsc } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'

// ... rest of the code remains the same
export interface Subcategory {
  id: string
  name: string
  slug: string
  productCount: number
  active?: boolean
  badge?: string
}

interface SubcategoryNavProps {
  subcategories: Subcategory[]
  categorySlug: string
  currentSubcategory?: string
  showCounts?: boolean
  showScrollButtons?: boolean
  showSort?: boolean
  showFilter?: boolean
  onSortChange?: (sort: string) => void
  onFilterToggle?: () => void
  className?: string
  variant?: 'default' | 'compact' | 'tabs'
}

export const SubcategoryNav: React.FC<SubcategoryNavProps> = ({
  subcategories,
  categorySlug,
  currentSubcategory,
  showCounts = true,
  showScrollButtons = true,
  showSort = false,
  showFilter = false,
  onSortChange,
  onFilterToggle,
  className,
  variant = 'default',
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Top Rated', value: 'rating' },
  ]

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener('resize', checkScrollButtons)
    return () => window.removeEventListener('resize', checkScrollButtons)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount)
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onSortChange?.(value)
  }

  if (variant === 'tabs') {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Tabs */}
        <div className="border-b border-primary-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <Link
              href={`/categories/${categorySlug}`}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                !currentSubcategory
                  ? "border-accent-500 text-accent-600"
                  : "border-transparent text-primary-500 hover:text-primary-700 hover:border-primary-300"
              )}
            >
              All Products
            </Link>
            
            {subcategories.map((subcat) => (
              <Link
                key={subcat.id}
                href={`/categories/${categorySlug}/${subcat.slug}`}
                className={cn(
                  "py-4 px-1 border-b-2 font-medium text-sm transition-colors relative",
                  currentSubcategory === subcat.slug
                    ? "border-accent-500 text-accent-600"
                    : "border-transparent text-primary-500 hover:text-primary-700 hover:border-primary-300"
                )}
              >
                {subcat.name}
                {showCounts && (
                  <span className={cn(
                    "ml-2 px-2 py-0.5 text-xs rounded-full",
                    currentSubcategory === subcat.slug
                      ? "bg-accent-100 text-accent-800"
                      : "bg-primary-100 text-primary-800"
                  )}>
                    {subcat.productCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Controls */}
        {(showSort || showFilter) && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-primary-600">
              {subcategories.find(s => s.slug === currentSubcategory)?.productCount || 
               subcategories.reduce((sum, s) => sum + s.productCount, 0)} products
            </div>
            <div className="flex items-center gap-3">
              {showFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onFilterToggle}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              )}
              {showSort && (
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary-900">Subcategories</h3>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {subcategories.map((subcat) => (
            <Link
              key={subcat.id}
              href={`/categories/${categorySlug}/${subcat.slug}`}
              className={cn(
                "block p-3 rounded-lg border text-center transition-all hover:shadow-md",
                currentSubcategory === subcat.slug
                  ? "bg-accent-50 border-accent-200"
                  : "bg-white border-primary-200 hover:border-accent-300"
              )}
            >
              <div className="font-medium text-sm mb-1">{subcat.name}</div>
              {showCounts && (
                <div className="text-xs text-primary-500">
                  {subcat.productCount} items
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide scroll-smooth"
        onScroll={checkScrollButtons}
      >
        <AnimatePresence>
          {subcategories.map((subcat, index) => (
            <motion.div
              key={subcat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/categories/${categorySlug}/${subcat.slug}`}
                className={cn(
                  "group flex flex-col items-center justify-center px-6 py-4 rounded-xl min-w-[120px] transition-all relative",
                  currentSubcategory === subcat.slug
                    ? "bg-gradient-to-br from-accent-600 to-accent-700 text-white shadow-lg"
                    : "bg-white hover:bg-primary-50 text-primary-700 border border-primary-200 hover:border-accent-300 hover:shadow-md"
                )}
              >
                {/* Badge */}
                {subcat.badge && (
                  <span className={cn(
                    "absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold",
                    currentSubcategory === subcat.slug
                      ? "bg-white text-accent-700"
                      : "bg-accent-100 text-accent-800"
                  )}>
                    {subcat.badge}
                  </span>
                )}

                {/* Subcategory Name */}
                <span className="font-semibold text-sm mb-1 group-hover:text-accent-600 transition-colors">
                  {subcat.name}
                </span>

                {/* Product Count */}
                {showCounts && (
                  <span className={cn(
                    "text-xs",
                    currentSubcategory === subcat.slug
                      ? "text-white/80"
                      : "text-primary-500"
                  )}>
                    {subcat.productCount} products
                  </span>
                )}

                {/* Active Indicator */}
                {currentSubcategory === subcat.slug && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/50 rounded-full" />
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <>
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white border border-primary-200 rounded-full shadow-md flex items-center justify-center hover:bg-primary-50 z-10"
            >
              <ChevronLeft className="h-4 w-4 text-primary-700" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white border border-primary-200 rounded-full shadow-md flex items-center justify-center hover:bg-primary-50 z-10"
            >
              <ChevronRight className="h-4 w-4 text-primary-700" />
            </button>
          )}
        </>
      )}
    </div>
  )
}