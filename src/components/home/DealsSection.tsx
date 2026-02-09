// components/home/DealsSection.tsx - FIXED IMPORT
"use client";

import React, { useState, useEffect } from 'react';
import { Timer, Tag, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion'; // ADD THIS IMPORT
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

export const DealsSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  const deals = [
    {
      id: '1',
      name: 'Summer Sneaker Sale',
      discount: 50,
      originalPrice: 199.99,
      currentPrice: 99.99,
      image: '/deals/sneakers.jpg',
      tag: 'Limited Time'
    },
    {
      id: '2',
      name: 'Premium Boot Collection',
      discount: 40,
      originalPrice: 299.99,
      currentPrice: 179.99,
      image: '/deals/boots.jpg',
      tag: 'Best Deal'
    },
    {
      id: '3',
      name: 'Running Shoe Bundle',
      discount: 35,
      originalPrice: 249.99,
      currentPrice: 162.49,
      image: '/deals/running.jpg',
      tag: 'Bundle'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { days, hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 }
        } else if (minutes > 0) {
          return { ...prev, minutes: minutes - 1, seconds: 59 }
        } else if (hours > 0) {
          return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 }
        } else if (days > 0) {
          return { ...prev, days: days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-950 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Zap className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Flash Deals
            </h2>
          </div>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Limited time offers on premium footwear. Don't miss out!
          </p>
        </div>

        {/* Timer */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Timer className="h-5 w-5 text-red-400" />
            <span className="text-lg font-semibold">Deal ends in:</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
                <div className="text-sm text-primary-300 capitalize">{unit}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                {/* Tag */}
                <div className="absolute -top-3 left-6 px-4 py-1 bg-red-500 text-white font-bold rounded-full text-sm">
                  {deal.tag}
                </div>

                {/* Discount Badge */}
                <div className="absolute -top-3 right-6 w-16 h-16 bg-gradient-to-br from-accent-600 to-accent-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  -{deal.discount}%
                </div>

                {/* Product Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{deal.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold">${deal.currentPrice}</span>
                    <span className="text-primary-300 line-through">${deal.originalPrice}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="accent" className="w-full">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Subscribe & Save 25%</h3>
          <p className="text-accent-100 mb-6">
            Join our newsletter and get exclusive deals delivered to your inbox
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button size="lg" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}