"use client";

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Store } from '@/lib/data/stores-data';

interface StoreMapProps {
  stores: Store[];
  selectedStore?: Store | null;
}

export const StoreMap: React.FC<StoreMapProps> = ({ stores, selectedStore }) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Map Placeholder - In production, integrate with Google Maps or Mapbox */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-2">
            Interactive Map
          </h3>
          <p className="text-gray-600 max-w-md">
            Map integration available with Google Maps API or Mapbox
          </p>
        </div>
      </div>

      {/* Store Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {stores.slice(0, 5).map((store, index) => (
          <div
            key={store.id}
            className="absolute"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 2) * 20}%`
            }}
          >
            <div className="relative group pointer-events-auto">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-secondary text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl">
                  {store.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="w-2 h-2 bg-secondary rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs font-medium text-secondary">Store Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-xs font-medium text-secondary">Flagship</span>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-lg flex items-center justify-center text-secondary font-bold border border-gray-200 transition-colors">
          +
        </button>
        <button className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-lg flex items-center justify-center text-secondary font-bold border border-gray-200 transition-colors">
          −
        </button>
      </div>
    </div>
  );
};
