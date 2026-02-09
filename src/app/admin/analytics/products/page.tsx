'use client';

import React, { useState } from 'react';
import { AnalyticsChart } from '@/components/admin/analytics/AnalyticsChart';
import { MetricCard } from '@/components/admin/analytics/MetricCard';
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker';
import { ExportButton } from '@/components/admin/analytics/ExportButton';
import { topProducts, salesByCategory } from '@/lib/data/analytics';
import { Package, TrendingUp, Star, DollarSign, Percent, Target } from 'lucide-react';
import Link from 'next/link';

export default function ProductsAnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const productMetrics = [
    {
      title: 'Total Products',
      value: '2,456',
      change: 8.2,
      trend: 'up' as const,
      icon: Package,
      iconColor: '#FF6B35',
      iconBg: 'bg-[#FF6B35]/10',
    },
    {
      title: 'Avg. Rating',
      value: 4.7,
      change: 0.3,
      trend: 'up' as const,
      icon: Star,
      iconColor: '#F59E0B',
      iconBg: 'bg-yellow-100',
      format: 'number' as const,
    },
    {
      title: 'Total Revenue',
      value: 4523189,
      change: 20.1,
      trend: 'up' as const,
      icon: DollarSign,
      iconColor: '#10B981',
      iconBg: 'bg-green-100',
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

  const salesData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
    revenue: Math.floor(Math.random() * 50000) + 30000,
    units: Math.floor(Math.random() * 2000) + 1000,
    profit: Math.floor(Math.random() * 15000) + 8000,
  }));

  const categoryData = salesByCategory.map(cat => ({
    name: cat.category,
    sales: cat.sales,
    percentage: cat.percentage,
    growth: cat.growth,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Analytics</h1>
          <p className="text-gray-600">Track product performance and sales</p>
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
        {productMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Performance</h3>
          <AnalyticsChart
            data={salesData}
            type="line"
            xAxisKey="month"
            yAxisKeys={['revenue', 'units', 'profit']}
            colors={['#FF6B35', '#3B82F6', '#10B981']}
            height={300}
          />
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <AnalyticsChart
            data={categoryData}
            type="bar"
            xAxisKey="name"
            yAxisKeys={['sales']}
            colors={['#FF6B35', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']}
            height={300}
          />
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <p className="text-sm text-gray-600">By revenue and sales volume</p>
          </div>
          <Link
            href="/admin/products"
            className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
          >
            Manage products
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Brand</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Sales</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.slice(0, 8).map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{product.brand}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{product.sales.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-900">{product.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center gap-1 ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Target className="w-4 h-4" />
                      )}
                      <span className="text-sm">{product.growth >= 0 ? '+' : ''}{product.growth}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Best Selling Category</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">Running</div>
          <div className="text-sm text-gray-600">35% of total sales</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Avg. Product Price</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">$124.50</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+8.7% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Low Stock Items</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">23</div>
          <div className="text-sm text-gray-600">Products with less than 10 units</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Return Rate</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">2.3%</div>
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <Target className="w-4 h-4" />
            <span>+0.4% from last period</span>
          </div>
        </div>
      </div>
    </div>
  );
}