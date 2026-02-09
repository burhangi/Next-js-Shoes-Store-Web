'use client';

import React from 'react';
import { TrendingUp, Users, DollarSign, Percent, Mail, Image, Tag, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface MarketingStatsProps {
  stats: {
    totalCampaigns: number;
    activeCampaigns: number;
    totalCoupons: number;
    activeCoupons: number;
    totalBanners: number;
    activeBanners: number;
    emailOpenRate: number;
    couponRedemptionRate: number;
  };
  loading?: boolean;
}

export const MarketingStats: React.FC<MarketingStatsProps> = ({ stats, loading = false }) => {
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

  const statCards = [
    {
      title: 'Active Campaigns',
      value: `${stats.activeCampaigns}/${stats.totalCampaigns}`,
      change: '+12.5%',
      trend: 'up' as const,
      icon: Mail,
      color: 'from-blue-500 to-cyan-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      link: '/admin/marketing/email-campaigns',
    },
    {
      title: 'Active Coupons',
      value: `${stats.activeCoupons}/${stats.totalCoupons}`,
      change: '+8.2%',
      trend: 'up' as const,
      icon: Tag,
      color: 'from-green-500 to-emerald-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      link: '/admin/marketing/coupons',
    },
    {
      title: 'Active Banners',
      value: `${stats.activeBanners}/${stats.totalBanners}`,
      change: '+15.3%',
      trend: 'up' as const,
      icon: Image,
      color: 'from-purple-500 to-pink-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      link: '/admin/marketing/banners',
    },
    {
      title: 'Email Open Rate',
      value: `${stats.emailOpenRate.toFixed(1)}%`,
      change: '+2.1%',
      trend: 'up' as const,
      icon: Percent,
      color: 'from-orange-500 to-red-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      link: '/admin/marketing/email-campaigns',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="block"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  {stat.change && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Marketing Performance</h3>
              <p className="text-sm text-gray-600">Key metrics and insights</p>
            </div>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Coupon Redemption</h4>
                  <p className="text-2xl font-bold text-gray-900">{stats.couponRedemptionRate}%</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  style={{ width: `${stats.couponRedemptionRate}%` }}
                />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Engagement Rate</h4>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(stats.emailOpenRate * 0.8)}%</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
                  style={{ width: `${Math.round(stats.emailOpenRate * 0.8)}%` }}
                />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Campaign Success</h4>
                  <p className="text-2xl font-bold text-gray-900">{Math.round((stats.activeCampaigns / stats.totalCampaigns) * 100)}%</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                  style={{ width: `${Math.round((stats.activeCampaigns / stats.totalCampaigns) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};