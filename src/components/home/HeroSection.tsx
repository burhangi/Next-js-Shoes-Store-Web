// components/home/HeroSection.tsx
"use client";

import React from 'react'
import { ArrowRight, Sparkles, Shield, Truck, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

export const HeroSection: React.FC = () => {
  const features = [
    { icon: <Truck className="h-5 w-5" />, text: 'Free Shipping' },
    { icon: <Shield className="h-5 w-5" />, text: '2-Year Warranty' },
    { icon: <RefreshCw className="h-5 w-5" />, text: '30-Day Returns' }
  ]

  return (
    <section className="relative min-h-[75vh] lg:min-h-[80vh] overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600/20 text-accent-300 rounded-full backdrop-blur-sm border border-accent-400/30"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">New Collection 2024</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Step Into
              <span className="block bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-300 max-w-lg"
            >
              Discover premium footwear that combines style, comfort, and craftsmanship. 
              Your perfect pair awaits in our exclusive collection.
            </motion.p>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <span className="text-accent-400">{feature.icon}</span>
                  <span className="text-white text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-xl group px-8">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm px-8">
                Explore Brands
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {['10K+', '4.9★', '24/7'].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat}</div>
                  <div className="text-sm text-neutral-400">
                    {['Happy Customers', 'Rating', 'Support'][index]}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Product Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl" />
              
              {/* Floating Product 1 */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-4 shadow-2xl"
              >
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                  <span className="text-5xl">👟</span>
                </div>
              </motion.div>

              {/* Floating Product 2 */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 shadow-2xl"
              >
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                  <span className="text-6xl">👞</span>
                </div>
              </motion.div>

              {/* Main Product Image */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-primary-600 rounded-2xl opacity-20" />
                  <div className="absolute inset-4 bg-white/95 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <motion.div 
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="text-9xl"
                    >
                      🥾
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}