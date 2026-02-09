'use client';

import React, { useState } from 'react';
import { AnalyticsChart } from '@/components/admin/analytics/AnalyticsChart';
import { MetricCard } from '@/components/admin/analytics/MetricCard';
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker';
import { ExportButton } from '@/components/admin/analytics/ExportButton';
import { getDashboardMetrics, revenueData, salesByCategory, topProducts, topCustomers } from '@/lib/data/analytics';
import { DollarSign, Users, ShoppingCart, TrendingUp, Package, BarChart3, Target, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsDashboardPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const metrics = getDashboardMetrics();

  const mainChartData = revenueData.slice(-12); // Last 12 data points

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your store performance</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <ExportButton />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/analytics/sales"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#FF6B35] hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-gray-900">Sales Analytics</span>
          </div>
        </Link>
        <Link
          href="/admin/analytics/products"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#FF6B35] hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Product Analytics</span>
          </div>
        </Link>
        <Link
          href="/admin/analytics/customers"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#FF6B35] hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="font-medium text-gray-900">Customer Analytics</span>
          </div>
        </Link>
        <Link
          href="/admin/analytics/traffic"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#FF6B35] hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <span className="font-medium text-gray-900">Traffic Analytics</span>
          </div>
        </Link>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={metrics[0].value}
          change={metrics[0].change}
          trend={metrics[0].trend}
          icon={DollarSign}
          format={metrics[0].format}
        />
        <MetricCard
          title="Total Orders"
          value={metrics[1].value}
          change={metrics[1].change}
          trend={metrics[1].trend}
          icon={ShoppingCart}
          format={metrics[1].format}
        />
        <MetricCard
          title="Customers"
          value={metrics[2].value}
          change={metrics[2].change}
          trend={metrics[2].trend}
          icon={Users}
          format={metrics[2].format}
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics[3].value}
          change={metrics[3].change}
          trend={metrics[3].trend}
          icon={TrendingUp}
          format={metrics[3].format}
        />
      </div>

      {/* Main Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <p className="text-sm text-gray-600">Daily revenue trends</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Last 30 days</span>
          </div>
        </div>
        <AnalyticsChart
          data={mainChartData}
          type="area"
          xAxisKey="date"
          yAxisKeys={['revenue']}
          colors={['#FF6B35']}
          height={300}
          fillOpacity={0.2}
        />
      </div>

      {/* Additional Metrics & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <AnalyticsChart
            data={salesByCategory}
            type="pie"
            xAxisKey="category"
            yAxisKeys={['sales']}
            colors={['#FF6B35', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']}
            height={300}
          />
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <p className="text-sm text-gray-600">By revenue this month</p>
            </div>
            <Link
              href="/admin/products"
              className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                    <p className="text-xs text-gray-600">{product.brand}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </div>
                  <div className={`text-xs ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Order Value"
          value={metrics[4].value}
          change={metrics[4].change}
          trend={metrics[4].trend}
          icon={DollarSign}
          format={metrics[4].format}
        />
        <MetricCard
          title="Refund Rate"
          value={metrics[5].value}
          change={metrics[5].change}
          trend={metrics[5].trend}
          icon={Target}
          format={metrics[5].format}
        />
        <MetricCard
          title="Customer Satisfaction"
          value={metrics[6].value}
          change={metrics[6].change}
          trend={metrics[6].trend}
          icon={BarChart3}
          format={metrics[6].format}
        />
        <MetricCard
          title="Organic Traffic"
          value={metrics[7].value}
          change={metrics[7].change}
          trend={metrics[7].trend}
          icon={Globe}
          format={metrics[7].format}
        />
      </div>
    </div>
  );
}