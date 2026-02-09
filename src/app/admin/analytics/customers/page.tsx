'use client';

import React, { useState } from 'react';
import { AnalyticsChart } from '@/components/admin/analytics/AnalyticsChart';
import { MetricCard } from '@/components/admin/analytics/MetricCard';
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker';
import { ExportButton } from '@/components/admin/analytics/ExportButton';
import { topCustomers, customerSegments, getDashboardMetrics } from '@/lib/data/analytics';
import { Users, UserCheck, UserX, UserPlus, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';

export default function CustomersAnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const customerMetrics = [
    {
      title: 'Total Customers',
      value: '12,458',
      change: 8.2,
      trend: 'up' as const,
      icon: Users,
      iconColor: '#3B82F6',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'New Customers',
      value: '1,234',
      change: 15.3,
      trend: 'up' as const,
      icon: UserPlus,
      iconColor: '#10B981',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Active Customers',
      value: '4,567',
      change: 5.6,
      trend: 'up' as const,
      icon: UserCheck,
      iconColor: '#8B5CF6',
      iconBg: 'bg-purple-100',
    },
    {
      title: 'At Risk Customers',
      value: '345',
      change: -2.1,
      trend: 'down' as const,
      icon: UserX,
      iconColor: '#EF4444',
      iconBg: 'bg-red-100',
    },
  ];

  const customerGrowthData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
    new: Math.floor(Math.random() * 200) + 800,
    returning: Math.floor(Math.random() * 300) + 1200,
    total: Math.floor(Math.random() * 500) + 2000,
  }));

  const segmentData = customerSegments.map(segment => ({
    name: segment.segment,
    value: segment.count,
    percentage: segment.percentage,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Analytics</h1>
          <p className="text-gray-600">Track customer behavior and segments</p>
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
        {customerMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Growth</h3>
          <AnalyticsChart
            data={customerGrowthData}
            type="area"
            xAxisKey="month"
            yAxisKeys={['new', 'returning', 'total']}
            colors={['#10B981', '#3B82F6', '#FF6B35']}
            height={300}
            fillOpacity={0.2}
          />
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
          <AnalyticsChart
            data={segmentData}
            type="pie"
            xAxisKey="name"
            yAxisKeys={['value']}
            colors={['#FF6B35', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']}
            height={300}
          />
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
            <p className="text-sm text-gray-600">By total spending</p>
          </div>
          <Link
            href="/admin/customers"
            className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
          >
            View all customers
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Orders</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Order</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.slice(0, 8).map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{customer.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{customer.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{customer.orders}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      ${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{customer.lastOrder}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center gap-1 ${customer.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {customer.growth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Target className="w-4 h-4" />
                      )}
                      <span className="text-sm">{customer.growth >= 0 ? '+' : ''}{customer.growth}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Customer Lifetime Value</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">$1,245.67</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.3% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Customer Acquisition Cost</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">$34.56</div>
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <Target className="w-4 h-4" />
            <span>-5.4% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Retention Rate</h4>
          <div className="text-2xl font-bold text-gray-900 mb-2">87.3%</div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+2.1% from last period</span>
          </div>
        </div>
      </div>
    </div>
  );
}