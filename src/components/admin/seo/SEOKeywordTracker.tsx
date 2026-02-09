// 📦 components/admin/seo/SEOKeywordTracker.tsx
'use client';

import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Plus, ExternalLink } from 'lucide-react';
import { SEOKeyword } from '@/lib/data/seo';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface SEOKeywordTrackerProps {
  keywords: SEOKeyword[];
  onAddKeyword?: (keyword: string) => void;
}

export const SEOKeywordTracker: React.FC<SEOKeywordTrackerProps> = ({
  keywords,
  onAddKeyword,
}) => {
  const [newKeyword, setNewKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredKeywords = keywords.filter(k =>
    k.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTrendIcon = (trend: SEOKeyword['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return 'bg-red-100 text-red-700';
    if (difficulty >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return 'text-green-600 font-bold';
    if (position <= 10) return 'text-blue-600 font-semibold';
    return 'text-gray-600';
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && onAddKeyword) {
      onAddKeyword(newKeyword.trim());
      setNewKeyword('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Keyword Tracking</h3>
          <p className="text-sm text-gray-600 mt-1">Monitor your keyword rankings and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Add Keyword */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add new keyword to track..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
          />
          <button
            onClick={handleAddKeyword}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Keyword</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Volume</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Difficulty</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Position</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Page</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeywords.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No keywords found. Add keywords to start tracking.
                </td>
              </tr>
            ) : (
              filteredKeywords.map((keyword) => (
                <tr
                  key={keyword.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{keyword.keyword}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {keyword.volume.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-xs font-semibold",
                      getDifficultyColor(keyword.difficulty)
                    )}>
                      {keyword.difficulty}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "text-sm",
                      getPositionColor(keyword.position)
                    )}>
                      #{keyword.position}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {getTrendIcon(keyword.trend)}
                  </td>
                  <td className="py-3 px-4">
                    {keyword.url ? (
                      <Link
                        href={keyword.url}
                        className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                      >
                        View Page
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
