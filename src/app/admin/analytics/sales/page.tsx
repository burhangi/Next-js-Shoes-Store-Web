'use client';

import React, { useState } from 'react';
import { AnalyticsChart } from '@/components/admin/analytics/AnalyticsChart';
import { MetricCard } from '@/components/admin/analytics/MetricCard';
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker';
import { ExportButton } from '@/components/admin/analytics/ExportButton';
import { revenueData, salesByCategory } from '@/lib/data/analytics';
import { DollarSign, TrendingUp, ShoppingCart, Package, Percent, Target } from 'lucide-react';

export default function SalesAnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const salesMetrics = [
    {
      title: 'Total Sales',
      value: 4523189,
      change: 20.1,
      trend: 'up' as const,
      icon: DollarSign,
      iconColor: '#10B981',
      iconBg: 'bg-green-100',
      format: 'currency' as const,
    },
    {
      title: 'Total Orders',
      value: 2345,
      change: 12.5,
      trend: 'up' as const,
      icon: ShoppingCart,
      iconColor: '#3B82F6',
      iconBg: 'bg-blue-100',
      format: 'number' as const,
    },
    {
      title: 'Avg. Order Value',
      value: 189.5,
      change: 5.3,
      trend: 'up' as const,
      icon: Package,
      iconColor: '#FF6B35',
      iconBg: 'bg-[#FF6B35]/10',
      format: 'currency' as const,
    },
    {
      title: 'Conversion Rate',
      value: 4.75,
      change: 2.1,
      trend: 'up' as const,
      icon: Percent,
      iconColor: '#8B5CF6',
      iconBg: 'bg-purple-100',
      format: 'percentage' as const,
    },
  ];

  const dailySalesData = revenueData.slice(-14); // Last 14 days

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
    revenue: Math.floor(Math.random() * 80000) + 40000,
    orders: Math.floor(Math.random() * 3000) + 1500,
    customers: Math.floor(Math.random() * 1500) + 800,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600">Track revenue, orders, and sales performance</p>
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
        {salesMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Sales Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
        <AnalyticsChart
          data={monthlyData}
          type="area"
          xAxisKey="month"
          yAxisKeys={['revenue', 'orders']}
          colors={['#FF6B35', '#3B82F6']}
          height={350}
          fillOpacity={0.2}
        />
      </div>

      {/* Daily Sales & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Sales Trend</h3>
          <AnalyticsChart
            data={dailySalesData}
            type="bar"
            xAxisKey="date"
            yAxisKeys={['revenue']}
            colors={['#10B981']}
            height={300}
          />
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {salesByCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{category.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-900">
                      ${category.sales.toLocaleString()}
                    </span>
                    <div className={`flex items-center gap-1 text-sm ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {category.growth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Target className="w-4 h-4" />
                      )}
                      <span>{category.growth >= 0 ? '+' : ''}{category.growth}%</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">{category.percentage}% of total sales</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Revenue per Customer</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">$245.67</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.3% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Refund Rate</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">2.4%</div>
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <Target className="w-4 h-4" />
            <span>+0.8% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Customer Satisfaction</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">4.8/5</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+0.2 from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Repeat Purchase Rate</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">42.5%</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+3.1% from last period</span>
          </div>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Top Performing Periods</h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Q4 2023</span>
                  <span className="font-medium text-gray-900">$1,245,678</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Black Friday</span>
                  <span className="font-medium text-gray-900">$456,789</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Holiday Season</span>
                  <span className="font-medium text-gray-900">$789,123</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Sales Channels</h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Website</span>
                  <span className="font-medium text-gray-900">65%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Mobile App</span>
                  <span className="font-medium text-gray-900">25%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Marketplace</span>
                  <span className="font-medium text-gray-900">10%</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Gross Margin</span>
                  <span className="font-medium text-gray-900">45.2%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Net Profit</span>
                  <span className="font-medium text-gray-900">22.8%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Operating Expenses</span>
                  <span className="font-medium text-gray-900">22.4%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}