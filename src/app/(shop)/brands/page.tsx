// 📦 src/app/shop/brands/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchBrands, searchBrands, getAllBrandCategories } from '@/lib/data/brands';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/layout/PageHero';
import { Tag } from 'lucide-react';

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(fetchBrands());
  
  const categories = getAllBrandCategories();
  
  useEffect(() => {
    let results = fetchBrands();
    
    if (searchQuery.trim()) {
      results = searchBrands(searchQuery);
    }
    
    if (selectedCategory) {
      results = results.filter(brand => 
        brand.categories.includes(selectedCategory)
      );
    }
    
    setFilteredBrands(results);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Shop by Brand"
        subtitle="Global Partners"
        description="Discover premium footwear from the world's best brands. Each brand brings unique technology, style, and heritage to your feet."
        icon={<Tag className="w-5 h-5 text-white" />}
        bgColor="bg-gradient-to-r from-gray-900 to-black"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <div className="absolute left-4 top-3.5 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                !selectedCategory 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold">{filteredBrands.length}</span> brands
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Brands Grid or No Results */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/shop/brands/${brand.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Brand Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{brand.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-500 italic">{brand.slogan}</p>
                      </div>
                    </div>
                    {brand.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Brand Info */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {brand.description}
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {brand.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {cat}
                      </span>
                    ))}
                    {brand.categories.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{brand.categories.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-700 font-medium">
                        {brand.rating}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {brand.productCount} products
                      </div>
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-4">
                    <div className="text-center py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 group-hover:bg-black group-hover:text-white transition-colors">
                      View Brand
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* No Brands Found Section */
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-7xl mb-6">👟🏢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Brands Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any brands matching "{searchQuery}". 
              Try a different search term or browse all brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                View All Brands
              </button>
              <Link
                href="/shop"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Browse Products
              </Link>
            </div>
          </div>
        )}

        {/* Featured Brands Section */}
        {!searchQuery && !selectedCategory && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Brands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fetchBrands()
                .filter(brand => brand.featured)
                .slice(0, 4)
                .map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/shop/brands/${brand.slug}`}
                    className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl p-6 text-center hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="text-5xl mb-4">{brand.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{brand.slogan}</p>
                    <div className="flex items-center justify-center">
                      <span className="text-yellow-300">★</span>
                      <span className="ml-1">{brand.rating}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}