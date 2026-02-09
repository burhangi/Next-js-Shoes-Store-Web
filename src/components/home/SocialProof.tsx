"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    likes: 2453,
    comments: 89
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    likes: 1892,
    comments: 56
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    likes: 3201,
    comments: 124
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    likes: 2678,
    comments: 92
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
    likes: 1456,
    comments: 67
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    likes: 2890,
    comments: 103
  }
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-[#1A1A1A] mb-[4px] md:mb-[8px] leading-tight">
              Join Our Community
            </h2>
            <p className="text-[13px] md:text-[16px] text-[#6B7280]">
              Share your style with #ShoesStore and get featured
            </p>
          </div>

          <a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 text-primary text-[13px] md:text-[15px] font-bold hover:text-primary-dark group transition-all duration-300 shrink-0"
          >
            <Instagram className="h-3 w-3 md:h-4 md:w-4" />
            <span className="md:hidden">Follow</span>
            <span className="hidden md:inline">@shoesstore</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white space-y-2">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="text-sm font-bold">{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-bold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats - Moved Below Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-[18px] md:text-[28px] font-bold text-[#1A1A1A]">250K+</div>
              <div className="text-[11px] md:text-[14px] text-[#6B7280]">Followers</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-[18px] md:text-[28px] font-bold text-[#1A1A1A]">15K+</div>
              <div className="text-[11px] md:text-[14px] text-[#6B7280]">Posts Tagged</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-[18px] md:text-[28px] font-bold text-[#1A1A1A]">98%</div>
              <div className="text-[11px] md:text-[14px] text-[#6B7280]">Engagement</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
