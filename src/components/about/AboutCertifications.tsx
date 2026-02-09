"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Leaf, Heart, TrendingUp, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'ISO 9001 Certified',
    description: 'International quality management standards',
    icon: Award,
    color: 'from-blue-500 to-indigo-600',
    year: '2020'
  },
  {
    title: 'Eco-Friendly Materials',
    description: 'Sustainable sourcing & carbon neutral shipping',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    year: '2021'
  },
  {
    title: 'Ethical Manufacturing',
    description: 'Fair trade certified & worker welfare guaranteed',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    year: '2019'
  },
  {
    title: 'Data Security',
    description: 'PCI DSS compliant with SSL encryption',
    icon: Shield,
    color: 'from-purple-500 to-violet-600',
    year: '2018'
  }
];

const awards = [
  {
    title: 'Best Premium Footwear Brand',
    organization: 'Fashion Awards 2023',
    icon: Award
  },
  {
    title: 'Excellence in Customer Service',
    organization: 'Retail Excellence Awards 2022',
    icon: TrendingUp
  },
  {
    title: 'Sustainable Business Leader',
    organization: 'Green Business Awards 2023',
    icon: Leaf
  },
  {
    title: 'Top Rated E-commerce',
    organization: 'Digital Commerce Awards 2024',
    icon: CheckCircle
  }
];

export const AboutCertifications: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden w-full relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
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
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Trust & Excellence</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Certified for
            <span className="block mt-2 text-primary">Quality & Trust</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our commitment to excellence is backed by industry-leading certifications and awards.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full mb-4">
                    <span className="text-xs font-bold text-primary">Since {cert.year}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-secondary via-secondary-dark to-primary rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Recent Awards & Recognition
            </h3>
            <p className="text-white/80">
              Honored by leading industry organizations for our excellence and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 leading-tight">
                      {award.title}
                    </h4>
                    <p className="text-xs text-white/70">
                      {award.organization}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Shield className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="text-white font-bold">100% Authentic Guarantee</div>
                <div className="text-white/70 text-sm">Every product verified & certified</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
