"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Rocket, Award, TrendingUp, Globe, Sparkles } from 'lucide-react';

const milestones = [
  {
    year: '2015',
    title: 'The Beginning',
    description: 'Founded in NYC with a vision to revolutionize luxury footwear. Started with a small workshop and big dreams.',
    icon: Rocket,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    year: '2017',
    title: 'First Collection',
    description: 'Launched our signature collection featuring 50 exclusive designs. Received overwhelming response from fashion enthusiasts.',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600'
  },
  {
    year: '2019',
    title: 'Global Expansion',
    description: 'Expanded shipping to 65+ countries worldwide. Opened partnerships with heritage tanneries across Europe.',
    icon: Globe,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    year: '2021',
    title: 'Industry Recognition',
    description: 'Won "Best Premium Footwear Brand" award. Featured in Vogue, GQ, and Forbes for our innovative designs.',
    icon: Award,
    color: 'from-amber-500 to-orange-600'
  },
  {
    year: '2023',
    title: 'Milestone Achievement',
    description: 'Reached 100,000+ satisfied customers. Launched sustainable collection using eco-friendly materials.',
    icon: TrendingUp,
    color: 'from-rose-500 to-red-600'
  },
  {
    year: '2024',
    title: 'Innovation Leadership',
    description: 'Introduced AI-powered fitting technology. Expanded collection to 850+ exclusive designs.',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-600'
  }
];

export const AboutTimeline: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden w-full relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10">
          <Calendar className="w-32 h-32 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10">
          <Calendar className="w-40 h-40 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            A Decade of
            <span className="block mt-2 text-primary">Excellence & Innovation</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From a small workshop to a global premium footwear brand trusted by thousands.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-24">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="p-6 md:p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 group">
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-primary">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot (Center) */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg z-10" />

                  {/* Empty Space for Alternating Layout */}
                  <div className="hidden lg:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
