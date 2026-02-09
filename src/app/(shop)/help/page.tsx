"use client";

import React, { useState } from 'react';
import { HelpHero } from '@/components/help/HelpHero';
import { HelpQuickLinks } from '@/components/help/HelpQuickLinks';
import { HelpCategories } from '@/components/help/HelpCategories';
import { HelpPopularArticles } from '@/components/help/HelpPopularArticles';
import { HelpContactSupport } from '@/components/help/HelpContactSupport';
import { helpCategories, helpArticles } from '@/lib/data/help-data';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter articles or navigate to search results
    console.log('Searching for:', query);
    // You could implement: router.push(`/help/search?q=${encodeURIComponent(query)}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    // In a real app, navigate to category page or filter articles
    console.log('Selected category:', categoryId);
    // You could implement: router.push(`/help/category/${categoryId}`);
  };

  const handleArticleClick = (articleId: string) => {
    // In a real app, navigate to article detail page
    if (articleId === 'all') {
      // Navigate to all articles page
      router.push('/faqs');
    } else {
      console.log('Viewing article:', articleId);
      // You could implement: router.push(`/help/article/${articleId}`);
    }
  };

  return (
    <main className="bg-white overflow-x-hidden w-full">
      {/* Hero Section with Search */}
      <HelpHero onSearch={handleSearch} />

      {/* Quick Action Links */}
      <HelpQuickLinks />

      {/* Help Categories */}
      <HelpCategories 
        categories={helpCategories}
        onCategorySelect={handleCategorySelect}
      />

      {/* Popular Articles */}
      <HelpPopularArticles 
        articles={helpArticles}
        onArticleClick={handleArticleClick}
      />

      {/* Contact Support */}
      <HelpContactSupport />
    </main>
  );
}
