'use client';

import React from 'react';
import { Image, Video, Layers, Type, TrendingUp, Calendar, Edit, Trash2, Eye, PauseCircle, PlayCircle } from 'lucide-react';
import { MarketingBanner } from '@/lib/data/marketing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BannerCardProps {
  banner: MarketingBanner;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  onPreview?: (id: string) => void;
  className?: string;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  banner,
  onEdit,
  onDelete,
  onToggleStatus,
  onPreview,
  className = '',
}) => {
  const getStatusConfig = (status: MarketingBanner['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: PlayCircle,
        };
      case 'inactive':
        return {
          label: 'Inactive',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: PauseCircle,
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: Calendar,
        };
      case 'expired':
        return {
          label: 'Expired',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: Calendar,
        };
    }
  };

  const getTypeIcon = (type: MarketingBanner['type']) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'carousel': return Layers;
      case 'text': return Type;
      default: return Image;
    }
  };

  const getPositionLabel = (position: MarketingBanner['position']) => {
    const labels: Record<MarketingBanner['position'], string> = {
      'home-hero': 'Home Hero',
      'home-middle': 'Home Middle',
      'category-top': 'Category Top',
      'product-page': 'Product Page',
      'sidebar': 'Sidebar',
      'checkout': 'Checkout',
    };
    return labels[position];
  };

  const statusConfig = getStatusConfig(banner.status);
  const TypeIcon = getTypeIcon(banner.type);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateCTR = () => {
    if (banner.impressions === 0) return 0;
    return ((banner.clicks / banner.impressions) * 100).toFixed(1);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {/* Banner Preview */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {banner.imageUrl ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.imageUrl})` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <TypeIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <span className="text-sm text-gray-500">{banner.type} Banner</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className={`${statusConfig.bgColor} ${statusConfig.color} border-transparent`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
        
        {/* Priority Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-gray-900 text-white">
            Priority: {banner.priority}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">{banner.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{banner.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <TypeIcon className="w-3.5 h-3.5" />
            {banner.type}
          </span>
          <span>•</span>
          <span>{getPositionLabel(banner.position)}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dates */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Start: {formatDate(banner.startDate)}</span>
          </div>
          {banner.endDate && (
            <div>
              <span>End: {formatDate(banner.endDate)}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{banner.clicks.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Clicks</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{banner.impressions.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Impressions</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{calculateCTR()}%</div>
            <div className="text-xs text-gray-600">CTR</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview?.(banner.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(banner.id)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus?.(banner.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            {banner.status === 'active' ? (
              <PauseCircle className="w-4 h-4" />
            ) : (
              <PlayCircle className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(banner.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};