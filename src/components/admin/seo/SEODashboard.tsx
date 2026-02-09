// 📦 components/admin/seo/SEODashboard.tsx
'use client';

import React from 'react';
import { 
  TrendingUp, 
  Search, 
  Link as LinkIcon, 
  FileText, 
  AlertTriangle,
  CheckCircle2,
  Eye,
  MousePointerClick,
  BarChart3
} from 'lucide-react';
import { seoPerformance } from '@/lib/data/seo';
import { cn } from '@/lib/utils/cn';

interface SEODashboardProps {
  totalKeywords: number;
  avgPosition: number;
  totalBacklinks: number;
  siteScore: number;
  totalPages: number;
  issuesCount: number;
}

export const SEODashboard: React.FC<SEODashboardProps> = ({
  totalKeywords,
  avgPosition,
  totalBacklinks,
  siteScore,
  totalPages,
  issuesCount,
}) => {
  const latestPerformance = seoPerformance[seoPerformance.length - 1];
  const previousPerformance = seoPerformance[seoPerformance.length - 2];
  
  const impressionsChange = latestPerformance.impressions - previousPerformance.impressions;
  const clicksChange = latestPerformance.clicks - previousPerformance.clicks;
  const ctrChange = latestPerformance.ctr - previousPerformance.ctr;
  const positionChange = latestPerformance.position - previousPerformance.position;

  const stats = [
    {
      label: 'Total Keywords',
      value: totalKeywords.toLocaleString(),
      icon: Search,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      change: null,
    },
    {
      label: 'Avg Position',
      value: avgPosition.toFixed(1),
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      change: positionChange < 0 ? `↓ ${Math.abs(positionChange).toFixed(1)}` : null,
      changePositive: positionChange < 0,
    },
    {
      label: 'Total Backlinks',
      value: totalBacklinks.toLocaleString(),
      icon: LinkIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      change: null,
    },
    {
      label: 'Site Score',
      value: siteScore,
      icon: BarChart3,
      color: 'bg-primary',
      bgColor: 'bg-primary-light',
      textColor: 'text-primary-dark',
      change: null,
    },
    {
      label: 'Total Pages',
      value: totalPages.toLocaleString(),
      icon: FileText,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      change: null,
    },
    {
      label: 'Issues Found',
      value: issuesCount,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      change: null,
    },
  ];

  const performanceMetrics = [
    {
      label: 'Impressions',
      value: latestPerformance.impressions.toLocaleString(),
      change: impressionsChange,
      changePercent: ((impressionsChange / previousPerformance.impressions) * 100).toFixed(1),
      icon: Eye,
      color: 'text-blue-600',
    },
    {
      label: 'Clicks',
      value: latestPerformance.clicks.toLocaleString(),
      change: clicksChange,
      changePercent: ((clicksChange / previousPerformance.clicks) * 100).toFixed(1),
      icon: MousePointerClick,
      color: 'text-green-600',
    },
    {
      label: 'CTR',
      value: `${latestPerformance.ctr.toFixed(2)}%`,
      change: ctrChange,
      changePercent: ((ctrChange / previousPerformance.ctr) * 100).toFixed(1),
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      label: 'Avg Position',
      value: latestPerformance.position.toFixed(1),
      change: positionChange,
      changePercent: ((positionChange / previousPerformance.position) * 100).toFixed(1),
      icon: BarChart3,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 hover:shadow-md",
                stat.bgColor,
                "border-gray-200"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg", stat.color)}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {stat.change && (
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded",
                    stat.changePositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className={cn("text-2xl font-bold mb-1", stat.textColor)}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const isPositive = metric.change > 0 || (metric.label === 'Avg Position' && metric.change < 0);
            return (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={cn("w-5 h-5", metric.color)} />
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded",
                    isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {metric.change > 0 ? '+' : ''}{metric.changePercent}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
