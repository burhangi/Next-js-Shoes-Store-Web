'use client';

import React from 'react';
import { 
  Image, Video, FileText, Music, 
  HardDrive, TrendingUp, Users, 
  BarChart3, Calendar, Database 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaItem, getStorageStats, getMediaUsageStats } from '@/lib/data/media';
import { Progress } from '@/components/ui/progress';

interface MediaStatsProps {
  items: MediaItem[];
  loading?: boolean;
}

export const MediaStats: React.FC<MediaStatsProps> = ({ items, loading = false }) => {
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

  const stats = getMediaUsageStats(items);
  const storageStats = getStorageStats(items);
  const totalItems = stats.totalItems;
  const totalUsage = stats.totalUsage;
  const activeItems = stats.activeItems;

  const usageStats = [
    {
      title: 'Total Storage',
      value: storageStats.total,
      change: '+12.5%',
      trend: 'up' as const,
      icon: HardDrive,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Files',
      value: activeItems.toString(),
      change: '+8.2%',
      trend: 'up' as const,
      icon: Database,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Usage',
      value: totalUsage.toString(),
      change: '+15.3%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Files Uploaded',
      value: totalItems.toString(),
      change: '+5.1%',
      trend: 'up' as const,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const typeStats = [
    { type: 'image', icon: Image, count: stats.byType.image || 0, color: 'bg-blue-500' },
    { type: 'video', icon: Video, count: stats.byType.video || 0, color: 'bg-purple-500' },
    { type: 'document', icon: FileText, count: stats.byType.document || 0, color: 'bg-green-500' },
    { type: 'audio', icon: Music, count: stats.byType.audio || 0, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {usageStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {stat.change && (
                    <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Storage by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageStats.byType.map((item, index) => {
                const typeStat = typeStats.find(t => t.type === item.type);
                const Icon = typeStat?.icon || FileText;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-700 capitalize">{item.type}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.size} ({item.percentage}%)
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Files by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Files by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {typeStats.map((type, index) => {
                const percentage = totalItems > 0 ? Math.round((type.count / totalItems) * 100) : 0;
                const Icon = type.icon;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-700 capitalize">{type.type}s</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {type.count} files ({percentage}%)
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${type.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalItems}</div>
              <p className="text-sm text-gray-600">Total Files</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{activeItems}</div>
              <p className="text-sm text-gray-600">Active Files</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalUsage}</div>
              <p className="text-sm text-gray-600">Total Usage</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{storageStats.total}</div>
              <p className="text-sm text-gray-600">Storage Used</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};