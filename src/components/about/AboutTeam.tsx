"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '@/lib/data/about-data';
import Image from 'next/image';

export const AboutTeam: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[28px] md:text-[42px] font-black text-[#1A1A1A] tracking-tighter mb-4"
          >
            Meet The <span className="text-[#FF6B35]">Visionaries</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[16px] text-gray-500 max-w-[600px] mx-auto"
          >
            The passionate experts dedicated to bringing you the worlds finest premium footwear experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative">
                {/* Image Container */}
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[3/4] shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 bg-gray-50 border-2 border-gray-100 group-hover:border-primary">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Overlay with Bio */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-1 bg-primary rounded-full mb-3" />
                      <p className="text-white text-sm leading-relaxed font-medium">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Role Badge on Hover */}
                  <div className="absolute top-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary rounded-full backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center px-2">
                  <h3 className="text-lg md:text-xl font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
