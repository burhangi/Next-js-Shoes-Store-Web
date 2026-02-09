// 📦src/components/layout/header/SearchBar.tsx
"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useNavigation } from '@/app/context/NavigationContext';

interface SearchBarProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export const SearchBar: React.FC<SearchBarProps> = ({ className, variant = 'desktop' }) => {
  const [query, setQuery] = useState('');
  const { handleSearch, setIsSearchOpen } = useNavigation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
      setQuery('');
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          placeholder="Search for shoes, brands..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search luxury shoes..."
          className="w-64 lg:w-72 xl:w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-gray-900 placeholder-gray-500 transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};