"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Fashion Blogger',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
    rating: 5,
    text: 'Absolutely exceptional quality! Every pair I\'ve purchased has exceeded my expectations. The attention to detail and craftsmanship is unmatched in the industry.',
    verified: true
  },
  {
    name: 'Michael Chen',
    role: 'Business Executive',
    location: 'Singapore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    rating: 5,
    text: 'Premium footwear at its finest. The comfort and style are perfectly balanced. I\'ve recommended this brand to all my colleagues and friends.',
    verified: true
  },
  {
    name: 'Emma Rodriguez',
    role: 'Creative Director',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
    rating: 5,
    text: 'These shoes transformed my wardrobe! The designs are timeless yet contemporary. Customer service is outstanding too. Will definitely buy again!',
    verified: true
  }
];

export const AboutTestimonials: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary via-secondary-dark to-primary overflow-hidden w-full relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <Quote className="w-32 h-32 text-white" />
        </div>
        <div className="absolute bottom-10 right-10 rotate-180">
          <Quote className="w-40 h-40 text-white" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <ThumbsUp className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Customer Love</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Customers
            <span className="block mt-2">Are Saying</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Real stories from real people who love our premium footwear collection.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-white/90 leading-relaxed mb-6 flex-1 text-sm md:text-base">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-primary transition-colors">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 text-xs">{testimonial.role}</p>
                    <p className="text-white/40 text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 mb-6">
            Join 120,000+ satisfied customers worldwide
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-white/60">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15K+</div>
              <div className="text-sm text-white/60">Reviews</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-white/60">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
