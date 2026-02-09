// 📦 src/components/admin/orders/OrderStats.tsx
'use client';

import React from 'react';
import { DollarSign, Package, Users, TrendingUp, Clock, Truck, CheckCircle, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';

interface OrderStatsProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    completedOrders: number;
    avgOrderValue: number;
    conversionRate: number;
  };
  isLoading?: boolean;
}

export const OrderStats: React.FC<OrderStatsProps> = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up' as const,
      icon: Package,
      color: 'from-blue-500 to-cyan-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: 'from-yellow-500 to-amber-600',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Processing',
      value: stats.processingOrders.toString(),
      icon: RefreshCw,
      color: 'from-purple-500 to-pink-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Shipped',
      value: stats.shippedOrders.toString(),
      icon: Truck,
      color: 'from-indigo-500 to-blue-600',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      title: 'Completed',
      value: stats.completedOrders.toString(),
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-600',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Avg Order Value',
      value: `$${stats.avgOrderValue.toFixed(2)}`,
      change: '+5.3%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: '+2.1%',
      trend: 'up' as const,
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${stat.bgColor} rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            {stat.change && (
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};