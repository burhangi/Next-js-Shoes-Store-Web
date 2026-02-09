"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, Star, ExternalLink } from 'lucide-react';
import { Store } from '@/lib/data/stores-data';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface StoreCardProps {
  store: Store;
  index?: number;
  onGetDirections?: (store: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, index = 0, onGetDirections }) => {
  const getGoogleMapsUrl = () => {
    const address = `${store.address.street}, ${store.address.city}, ${store.address.state} ${store.address.zipCode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <div className="rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Store Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            {store.isFlagship && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Flagship
              </span>
            )}
            {store.isComingSoon && (
              <span className="px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-full shadow-lg">
                Coming Soon
              </span>
            )}
          </div>

          {/* Store Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {store.name}
            </h3>
          </div>
        </div>

        {/* Store Info */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Address */}
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-secondary font-medium leading-relaxed">
                {store.address.street}<br />
                {store.address.city}, {store.address.state} {store.address.zipCode}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <a 
                href={`tel:${store.contact.phone}`}
                className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {store.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <a 
                href={`mailto:${store.contact.email}`}
                className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {store.contact.email}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-secondary">Today's Hours</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              {store.hours.monday}
            </p>
          </div>

          {/* Features */}
          {store.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {store.features.slice(0, 3).map((feature, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg"
                  >
                    {feature}
                  </span>
                ))}
                {store.features.length > 3 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">
                    +{store.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </a>
            <button
              onClick={() => onGetDirections && onGetDirections(store)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-secondary rounded-xl font-bold hover:border-primary hover:text-primary transition-all duration-300 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
