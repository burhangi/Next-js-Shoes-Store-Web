// 📦 components/admin/reports/ReportStats.tsx
'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReportMetric } from '@/lib/data/reports';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface ReportStatsProps {
  metrics: ReportMetric[];
  loading?: boolean;
}

export const ReportStats: React.FC<ReportStatsProps> = ({ metrics, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatValue = (metric: ReportMetric) => {
    switch (metric.format) {
      case 'currency':
        return `$${Number(metric.value).toLocaleString()}`;
      case 'percentage':
        return `${metric.value}%`;
      default:
        return metric.value;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded",
                metric.trend === 'up' ? "text-green-600 bg-green-100" :
                metric.trend === 'down' ? "text-red-600 bg-red-100" :
                "text-gray-600 bg-gray-100"
              )}>
                {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                {metric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                {metric.trend === 'neutral' && <Minus className="w-4 h-4" />}
                <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatValue(metric)}
            </h3>
            <p className="text-sm text-gray-600">{metric.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};