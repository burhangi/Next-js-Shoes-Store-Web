// 📦 src/app/admin/brands/page.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Search, Star, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { brands } from '@/lib/data/brands';

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'featured' && brand.featured);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600">Manage your store brands</p>
        </div>
        <Link
          href="/admin/brands/create"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Brands
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'featured'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Featured Only
            </button>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Brand Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{brand.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-gray-600 italic">"{brand.slogan}"</p>
                  </div>
                </div>
                {brand.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{brand.description}</p>
            </div>

            {/* Brand Stats */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">{brand.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{brand.productCount} products</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {brand.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {category}
                  </span>
                ))}
                {brand.categories.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{brand.categories.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0">
              <div className="flex items-center gap-2">
                <Link
                  href={`/shop/brands/${brand.slug}`}
                  className="flex-1 text-center py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  View Store
                </Link>
                <Link
                  href={`/admin/brands/${brand.id}/edit`}
                  className="flex-1 text-center py-2.5 text-sm font-medium text-white bg-[#FF6B35] hover:bg-[#E85A28] rounded-lg"
                >
                  Manage
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Globe className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No brands match "${searchQuery}"`
              : 'Get started by adding your first brand'
            }
          </p>
          <Link
            href="/admin/brands/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Brand
          </Link>
        </div>
      )}
    </div>
  );
}