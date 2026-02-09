'use client';

import React from 'react';
import { Star, TrendingUp, Users, AlertCircle, CheckCircle, Clock, Flag, BarChart3 } from 'lucide-react';
import { ReviewStats as ReviewStatsType } from '@/lib/data/reviews';
import Link from 'next/link';

interface ReviewStatsProps {
  stats: ReviewStatsType;
  loading?: boolean;
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({ stats, loading = false }) => {
  if (loading) {
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
      title: 'Total Reviews',
      value: stats.total.toLocaleString(),
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      link: '/admin/reviews',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      change: '+0.3',
      trend: 'up' as const,
      icon: Star,
      color: 'from-yellow-500 to-amber-600',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      link: '/admin/reviews',
    },
    {
      title: 'Pending Reviews',
      value: stats.pending.toString(),
      icon: Clock,
      color: 'from-orange-500 to-red-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      link: '/admin/reviews/pending',
    },
    {
      title: 'Reported Reviews',
      value: stats.reported.toString(),
      icon: Flag,
      color: 'from-purple-500 to-pink-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      link: '/admin/reviews/reported',
    },
  ];

  const statusCards = [
    {
      title: 'Approved',
      value: stats.approved.toString(),
      percentage: Math.round((stats.approved / stats.total) * 100),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending',
      value: stats.pending.toString(),
      percentage: Math.round((stats.pending / stats.total) * 100),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Reported',
      value: stats.reported.toString(),
      percentage: Math.round((stats.reported / stats.total) * 100),
      icon: Flag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Rejected',
      value: stats.rejected.toString(),
      percentage: Math.round((stats.rejected / stats.total) * 100),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
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
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
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
            </div>
          </Link>
        ))}
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Status Distribution</h3>
            <p className="text-sm text-gray-600">Breakdown of review statuses</p>
          </div>
          <Link
            href="/admin/reviews"
            className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusCards.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{stat.value}</h4>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Percentage</span>
                  <span className="font-medium">{stat.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stat.percentage}%`,
                      backgroundColor: stat.color.replace('text-', '').split('-')[0],
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
            <p className="text-sm text-gray-600">Breakdown of customer ratings</p>
          </div>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {stats.ratingBreakdown.map((rating) => (
            <div key={rating.rating} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{rating.rating} star</span>
                </div>
                <div className="text-sm text-gray-600">
                  {rating.count.toLocaleString()} reviews ({rating.percentage}%)
                </div>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full transition-all duration-1000"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.slice(0, 5).map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{day.averageRating.toFixed(1)} avg rating</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{day.reviews} reviews</div>
                <div className={`text-sm ${day.reviews > 40 ? 'text-green-600' : 'text-gray-600'}`}>
                  {day.reviews > 40 ? 'High activity' : 'Normal activity'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};