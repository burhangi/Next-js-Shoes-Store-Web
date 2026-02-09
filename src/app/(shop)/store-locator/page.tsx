"use client";

import React, { useState, useMemo } from 'react';
import { StoreLocatorHero } from '@/components/store-locator/StoreLocatorHero';
import { StoreMap } from '@/components/store-locator/StoreMap';
import { StoreCard } from '@/components/store-locator/StoreCard';
import { StoreSearchFilter } from '@/components/store-locator/StoreSearchFilter';
import { stores, Store, getFlagshipStores } from '@/lib/data/stores-data';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Filter stores based on search and filters
  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          store.name.toLowerCase().includes(query) ||
          store.address.city.toLowerCase().includes(query) ||
          store.address.state.toLowerCase().includes(query) ||
          store.address.zipCode.includes(query);
        
        if (!matchesSearch) return false;
      }

      // City filter
      if (selectedCity !== 'all' && store.address.city !== selectedCity) {
        return false;
      }

      // State filter
      if (selectedState !== 'all' && store.address.state !== selectedState) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCity, selectedState]);

  const flagshipStores = getFlagshipStores();

  const handleGetDirections = (store: Store) => {
    setSelectedStore(store);
    // Scroll to map or show modal with details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-white overflow-x-hidden w-full">
      {/* Hero Section */}
      <StoreLocatorHero />

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-gray-50 w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <StoreMap stores={filteredStores} selectedStore={selectedStore} />
          </motion.div>
        </div>
      </section>

      {/* Flagship Stores Highlight */}
      {flagshipStores.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-secondary via-secondary-dark to-primary w-full overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <Star className="w-4 h-4 text-white fill-current" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Premium Locations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Flagship Stores
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Experience our most exclusive collections and premium services at our flagship locations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flagshipStores.map((store, index) => (
                <StoreCard 
                  key={store.id} 
                  store={store} 
                  index={index}
                  onGetDirections={handleGetDirections}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Stores Section */}
      <section className="py-16 md:py-20 bg-white w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
              All Store
              <span className="block mt-2 text-primary">Locations</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse all {stores.length} of our retail locations across the United States.
            </p>
          </motion.div>

          {/* Filter and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filter */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <StoreSearchFilter
                  onSearch={setSearchQuery}
                  onCityFilter={setSelectedCity}
                  onStateFilter={setSelectedState}
                />
                
                {/* Results Count */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-secondary font-bold">
                      {filteredStores.length} {filteredStores.length === 1 ? 'Store' : 'Stores'} Found
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Grid */}
            <div className="lg:col-span-3">
              {filteredStores.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredStores.map((store, index) => (
                    <StoreCard 
                      key={store.id} 
                      store={store} 
                      index={index}
                      onGetDirections={handleGetDirections}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-gray-50 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    No Stores Found
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Try adjusting your search filters to find stores in different locations.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-3xl p-8 md:p-12 text-white"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Can't Find a Store Near You?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Shop our complete collection online with free shipping on orders over $150 and easy returns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/products"
                className="px-8 py-4 bg-white text-secondary rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Shop Online
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
