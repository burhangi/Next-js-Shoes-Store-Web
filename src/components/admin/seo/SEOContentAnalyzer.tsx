// 📦 components/admin/seo/SEOContentAnalyzer.tsx
'use client';

import React, { useState } from 'react';
import { FileText, Search, TrendingUp, Eye, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import { SEOContent } from '@/lib/data/seo';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface SEOContentAnalyzerProps {
  content: SEOContent[];
  onAnalyze?: (url: string) => void;
}

export const SEOContentAnalyzer: React.FC<SEOContentAnalyzerProps> = ({
  content,
  onAnalyze,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredContent = content.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || c.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const types = Array.from(new Set(content.map(c => c.type)));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Content Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">Analyze SEO performance of your content</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedType(null)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
            !selectedType
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          All Types
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
              selectedType === type
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No content found.</p>
          </div>
        ) : (
          filteredContent.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded capitalize">
                      {item.type}
                    </span>
                  </div>
                  <Link
                    href={item.url}
                    className="text-sm text-primary hover:text-primary-dark flex items-center gap-1 mb-2"
                  >
                    {item.url}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.metaDescription}</p>
                </div>
                <div className={cn(
                  "px-3 py-2 rounded-lg text-center min-w-[60px]",
                  getScoreColor(item.seoScore)
                )}>
                  <p className="text-lg font-bold">{item.seoScore}</p>
                  <p className="text-xs">Score</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Word Count</p>
                  <p className="text-sm font-semibold text-gray-900">{item.wordCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Readability</p>
                  <p className="text-sm font-semibold text-gray-900">{item.readabilityScore}/100</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">SEO Score</p>
                  <p className="text-sm font-semibold text-gray-900">{item.seoScore}/100</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Issues */}
              {item.issues.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Issues:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.issues.map((issue, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-200 flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
