"use client";

import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { cities, states } from '@/lib/data/stores-data';

interface StoreSearchFilterProps {
  onSearch?: (query: string) => void;
  onCityFilter?: (city: string) => void;
  onStateFilter?: (state: string) => void;
}

export const StoreSearchFilter: React.FC<StoreSearchFilterProps> = ({
  onSearch,
  onCityFilter,
  onStateFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (onCityFilter) {
      onCityFilter(city);
    }
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (onStateFilter) {
      onStateFilter(state);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-secondary">Filter Stores</h3>
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by city, state, or zip code..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-secondary placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-bold text-secondary mb-2">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-secondary bg-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-sm font-bold text-secondary mb-2">
            State
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-secondary bg-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {(searchQuery || selectedCity !== 'all' || selectedState !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('all');
              setSelectedState('all');
              if (onSearch) onSearch('');
              if (onCityFilter) onCityFilter('all');
              if (onStateFilter) onStateFilter('all');
            }}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-secondary rounded-xl font-bold transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
