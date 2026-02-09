'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Users, MousePointer, Mail, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsData {
  period: 'today' | 'week' | 'month' | 'quarter';
  metrics: {
    totalClicks: number;
    totalImpressions: number;
    clickThroughRate: number;
    conversionRate: number;
    revenueGenerated: number;
    activeCampaigns: number;
    couponRedemptions: number;
    emailOpenRate: number;
  };
  trends: {
    clicks: 'up' | 'down';
    impressions: 'up' | 'down';
    revenue: 'up' | 'down';
    conversions: 'up' | 'down';
  };
  topPerforming: Array<{
    id: string;
    name: string;
    type: 'banner' | 'coupon' | 'campaign';
    performance: number;
    change: number;
  }>;
}

export const AnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = React.useState<string>('month');
  const [data, setData] = React.useState<AnalyticsData>({
    period: 'month',
    metrics: {
      totalClicks: 15420,
      totalImpressions: 245800,
      clickThroughRate: 6.27,
      conversionRate: 3.15,
      revenueGenerated: 45280,
      activeCampaigns: 8,
      couponRedemptions: 1245,
      emailOpenRate: 24.5,
    },
    trends: {
      clicks: 'up',
      impressions: 'up',
      revenue: 'up',
      conversions: 'up',
    },
    topPerforming: [
      { id: '1', name: 'Summer Sale Banner', type: 'banner', performance: 12.4, change: 8.2 },
      { id: '2', name: 'WELCOME10 Coupon', type: 'coupon', performance: 8.7, change: 15.3 },
      { id: '3', name: 'Weekly Newsletter', type: 'campaign', performance: 7.9, change: 2.4 },
      { id: '4', name: 'Flash Sale Campaign', type: 'campaign', performance: 6.2, change: 12.8 },
    ],
  });

  const metrics = [
    {
      title: 'Total Clicks',
      value: data.metrics.totalClicks.toLocaleString(),
      icon: MousePointer,
      change: '+12.5%',
      trend: data.trends.clicks,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Revenue',
      value: `$${data.metrics.revenueGenerated.toLocaleString()}`,
      icon: DollarSign,
      change: '+8.7%',
      trend: data.trends.revenue,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'CTR',
      value: `${data.metrics.clickThroughRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: '+2.1%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Email Open Rate',
      value: `${data.metrics.emailOpenRate.toFixed(1)}%`,
      icon: Mail,
      change: '+1.8%',
      trend: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Active Campaigns',
      value: data.metrics.activeCampaigns.toString(),
      icon: Users,
      change: '+3',
      trend: 'up',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Coupon Redemptions',
      value: data.metrics.couponRedemptions.toLocaleString(),
      icon: TrendingUp,
      change: '+15.3%',
      trend: 'up',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Marketing Analytics</h2>
          <p className="text-gray-600">Performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Impressions', value: data.metrics.totalImpressions, percentage: 100, color: 'bg-blue-500' },
                { label: 'Clicks', value: data.metrics.totalClicks, percentage: data.metrics.clickThroughRate, color: 'bg-green-500' },
                { label: 'Conversions', value: Math.round(data.metrics.totalClicks * (data.metrics.conversionRate / 100)), percentage: data.metrics.conversionRate, color: 'bg-purple-500' },
              ].map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{stage.value.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 ml-2">({stage.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(stage.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPerforming.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'banner' ? 'bg-blue-100 text-blue-600' :
                      item.type === 'coupon' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {item.type === 'banner' && <MousePointer className="w-4 h-4" />}
                      {item.type === 'coupon' && <DollarSign className="w-4 h-4" />}
                      {item.type === 'campaign' && <Mail className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600 capitalize">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.performance.toFixed(1)}%</p>
                    <p className={`text-xs ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{data.metrics.clickThroughRate.toFixed(1)}%</div>
              <p className="text-sm text-gray-600">Click-Through Rate</p>
              <div className="mt-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                Above industry average
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{data.metrics.conversionRate.toFixed(1)}%</div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <div className="mt-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +2.4% from last period
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${Math.round(data.metrics.revenueGenerated / 1000)}k
              </div>
              <p className="text-sm text-gray-600">Revenue Generated</p>
              <div className="mt-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +8.7% growth
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${Math.round(data.metrics.revenueGenerated / data.metrics.couponRedemptions)}
              </div>
              <p className="text-sm text-gray-600">Avg. Order Value</p>
              <div className="mt-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +5.2% increase
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};