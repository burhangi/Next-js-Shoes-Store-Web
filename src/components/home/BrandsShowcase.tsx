// components/home/BrandsShowcase.tsx
import React from 'react'
import { Award, Check, Star, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export const BrandsShowcase: React.FC = () => {
  const brands = [
    { name: 'Nike', logo: '🏃', featured: true },
    { name: 'Adidas', logo: '👟', featured: true },
    { name: 'Jordan', logo: '🏀', featured: true },
    { name: 'New Balance', logo: '⚡', featured: false },
    { name: 'Puma', logo: '🐆', featured: false },
    { name: 'Converse', logo: '⭐', featured: false },
    { name: 'Vans', logo: '🛹', featured: false },
    { name: 'Reebok', logo: '🏃‍♂️', featured: false },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Award className="h-6 w-6 text-primary-700" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900">
              Premium Brands
            </h2>
          </div>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Shop from the world's most trusted footwear brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300",
                brand.featured
                  ? "border-accent-500 shadow-lg"
                  : "border-primary-100 hover:border-accent-300 hover:shadow-md"
              )}
            >
              <div className="text-4xl">{brand.logo}</div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-primary-900">{brand.name}</h3>
                {brand.featured && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-primary-600">Featured</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Check className="h-6 w-6" />,
              title: 'Authentic Products',
              description: '100% genuine products with manufacturer warranty'
            },
            {
              icon: <Star className="h-6 w-6" />,
              title: 'Premium Quality',
              description: 'Curated selection of highest quality footwear'
            },
            {
              icon: <TrendingUp className="h-6 w-6" />,
              title: 'Latest Collections',
              description: 'Always up-to-date with new releases'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-3 bg-accent-100 text-accent-700 rounded-xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}