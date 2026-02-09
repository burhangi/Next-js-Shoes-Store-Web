"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, BookOpen } from 'lucide-react';
import { HelpArticle } from '@/lib/data/help-data';

interface HelpPopularArticlesProps {
  articles: HelpArticle[];
  onArticleClick?: (articleId: string) => void;
}

export const HelpPopularArticles: React.FC<HelpPopularArticlesProps> = ({ 
  articles,
  onArticleClick 
}) => {
  const popularArticles = articles.filter(a => a.isPopular).slice(0, 6);

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Most Helpful</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Popular
            <span className="block mt-2 text-primary">Help Articles</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The most searched and helpful articles from our knowledge base.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularArticles.map((article, index) => (
            <motion.button
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onArticleClick && onArticleClick(article.id)}
              className="group text-left"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-green-50 text-green-600 rounded-full">
                    Popular
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10"
        >
          <button 
            onClick={() => onArticleClick && onArticleClick('all')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
