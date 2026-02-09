"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const styles = [
  {
    id: 'casual',
    title: 'Casual Comfort',
    description: 'Everyday style meets ultimate comfort',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    link: '/categories/casual',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'formal',
    title: 'Formal Elegance',
    description: 'Sophisticated styles for every occasion',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    link: '/categories/formal',
    color: 'from-gray-700 to-gray-900'
  },
  {
    id: 'athletic',
    title: 'Athletic Performance',
    description: 'Built for champions, designed for winners',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    link: '/categories/sports',
    color: 'from-red-500 to-orange-600'
  }
];

export const ShopByStyle: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-[#1A1A1A] mb-[4px] md:mb-[8px] leading-tight">
              Shop By Style
            </h2>
            <p className="text-[13px] md:text-[16px] text-[#6B7280]">
              Discover collections curated for your unique lifestyle
            </p>
          </div>

          <Link 
            href="/categories" 
            className="flex items-center gap-1 md:gap-2 text-primary text-[13px] md:text-[15px] font-bold hover:text-primary-dark group transition-all duration-300 shrink-0"
          >
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All Styles</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link href={style.link}>
                <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-xl md:rounded-2xl overflow-hidden">
                  {/* Image */}
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    >
                      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                        {style.title}
                      </h3>
                      <p className="text-white/90 mb-2 md:mb-3 text-xs md:text-sm lg:text-base line-clamp-2">
                        {style.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 md:gap-2 text-white font-bold text-xs md:text-sm group-hover:gap-2 md:group-hover:gap-3 transition-all">
                        <span>Shop Now</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 border-2 md:border-4 border-white/0 group-hover:border-white/20 rounded-xl md:rounded-2xl transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
