'use client';

import React, { useState } from 'react';
import { AnalyticsChart } from '@/components/admin/analytics/AnalyticsChart';
import { MetricCard } from '@/components/admin/analytics/MetricCard';
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker';
import { ExportButton } from '@/components/admin/analytics/ExportButton';
import { trafficSources } from '@/lib/data/analytics';
import { Globe, Users, TrendingUp, Target, MousePointer, Clock, Share2 } from 'lucide-react';

export default function TrafficAnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const trafficMetrics = [
    {
      title: 'Total Visitors',
      value: '124,567',
      change: 12.5,
      trend: 'up' as const,
      icon: Users,
      iconColor: '#3B82F6',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Organic Traffic',
      value: '42',
      change: 8,
      trend: 'up' as const,
      icon: Globe,
      iconColor: '#10B981',
      iconBg: 'bg-green-100',
      format: 'percentage' as const,
    },
    {
      title: 'Avg. Session Duration',
      value: '4:32',
      change: 15.3,
      trend: 'up' as const,
      icon: Clock,
      iconColor: '#FF6B35',
      iconBg: 'bg-[#FF6B35]/10',
    },
    {
      title: 'Bounce Rate',
      value: 32.4,
      change: -5.6,
      trend: 'down' as const,
      icon: Target,
      iconColor: '#8B5CF6',
      iconBg: 'bg-purple-100',
      format: 'percentage' as const,
    },
  ];

  const trafficData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
    organic: Math.floor(Math.random() * 30000) + 20000,
    direct: Math.floor(Math.random() * 20000) + 15000,
    social: Math.floor(Math.random() * 10000) + 5000,
    referral: Math.floor(Math.random() * 5000) + 2000,
  }));

  const pageViewsData = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    views: Math.floor(Math.random() * 5000) + 2000,
    sessions: Math.floor(Math.random() * 3000) + 1000,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Traffic Analytics</h1>
          <p className="text-gray-600">Track website traffic and user behavior</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <ExportButton />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trafficMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Traffic Sources Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
        <AnalyticsChart
          data={trafficData}
          type="bar"
          xAxisKey="month"
          yAxisKeys={['organic', 'direct', 'social', 'referral']}
          colors={['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']}
          height={350}
          stacked={true}
        />
      </div>

      {/* Traffic Sources Table & Page Views */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Visitors</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Share</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Conversion</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {trafficSources.map((source) => (
                  <tr key={source.source} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {source.source === 'Organic Search' && <Globe className="w-4 h-4 text-green-500" />}
                        {source.source === 'Direct' && <MousePointer className="w-4 h-4 text-blue-500" />}
                        {source.source === 'Social Media' && <Share2 className="w-4 h-4 text-purple-500" />}
                        {source.source === 'Email' && <Target className="w-4 h-4 text-orange-500" />}
                        {source.source === 'Referral' && <Users className="w-4 h-4 text-red-500" />}
                        <span className="font-medium text-gray-900">{source.source}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{source.visitors.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{source.percentage}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{source.conversion}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-1 ${source.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {source.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <Target className="w-4 h-4" />
                        )}
                        <span className="text-sm">{source.trend === 'up' ? '+' : ''}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Page Views Trend</h3>
          <AnalyticsChart
            data={pageViewsData}
            type="area"
            xAxisKey="day"
            yAxisKeys={['views', 'sessions']}
            colors={['#FF6B35', '#3B82F6']}
            height={300}
            fillOpacity={0.2}
          />
        </div>
      </div>

      {/* User Behavior Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Pages per Session</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">5.4</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+0.8 from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">New vs Returning</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">64% New</div>
          <div className="text-sm text-gray-600">36% returning visitors</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Mobile Traffic</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">68%</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+5.2% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Top Landing Page</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">/products</div>
          <div className="text-sm text-gray-600">24% of all traffic</div>
        </div>
      </div>

      {/* Geographic & Device Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Geographic Locations</h3>
          <div className="space-y-4">
            {[
              { country: 'United States', visitors: 45678, percentage: 36 },
              { country: 'United Kingdom', visitors: 23456, percentage: 19 },
              { country: 'Canada', visitors: 12345, percentage: 10 },
              { country: 'Australia', visitors: 9876, percentage: 8 },
              { country: 'Germany', visitors: 8765, percentage: 7 },
            ].map((location) => (
              <div key={location.country} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{location.country}</span>
                  <span className="text-sm text-gray-600">{location.visitors.toLocaleString()} visitors</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Usage</h3>
          <div className="space-y-4">
            {[
              { device: 'Mobile', percentage: 68, growth: 5.2 },
              { device: 'Desktop', percentage: 28, growth: -2.4 },
              { device: 'Tablet', percentage: 4, growth: 1.3 },
            ].map((device) => (
              <div key={device.device} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{device.device}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-900">{device.percentage}%</span>
                    <div className={`flex items-center gap-1 text-sm ${device.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {device.growth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Target className="w-4 h-4" />
                      )}
                      <span>{device.growth >= 0 ? '+' : ''}{device.growth}%</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}