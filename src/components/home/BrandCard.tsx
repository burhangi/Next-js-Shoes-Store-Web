"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brand } from '@/lib/data/brands';
import { ArrowRight } from 'lucide-react';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <Link href={`/brands/${brand.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        className="group h-full bg-white rounded-xl border border-neutral-100 p-6 transition-all duration-300 hover:border-[#FF6B35] hover:shadow-[0_8px_30px_rgba(255,107,53,0.12)] flex flex-col items-center justify-center text-center gap-4"
      >
        {/* Icon/Logo */}
        <div className="w-16 h-16 text-4xl flex items-center justify-center bg-neutral-50 rounded-full group-hover:bg-[#FFF4EF] group-hover:scale-110 transition-all duration-300">
          {brand.icon}
        </div>

        {/* Brand Name */}
        <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#FF6B35] transition-colors">
          {brand.name}
        </h3>
      </motion.div>
    </Link>
  );
};
