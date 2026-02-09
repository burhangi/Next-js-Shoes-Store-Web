'use client';

import React, { useState } from 'react';
import { 
  Image, Video, FileText, Music, 
  MoreVertical, Eye, Download, 
  Copy, Edit, Trash2, CheckSquare, 
  Square, ExternalLink 
} from 'lucide-react';
import { MediaItem, formatFileSize, getFileIcon } from '@/lib/data/media';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

interface MediaCardProps {
  item: MediaItem;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onPreview?: (item: MediaItem) => void;
  onEdit?: (item: MediaItem) => void;
  onDelete?: (item: MediaItem) => void;
  onCopyUrl?: (url: string) => void;
  onDownload?: (item: MediaItem) => void;
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  selected = false,
  onSelect,
  onPreview,
  onEdit,
  onDelete,
  onCopyUrl,
  onDownload,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getMediaIcon = () => {
    switch (item.mediaType) {
      case 'image': return Image;
      case 'video': return Video;
      case 'document': return FileText;
      case 'audio': return Music;
      default: return FileText;
    }
  };

  const getTypeColor = () => {
    switch (item.mediaType) {
      case 'image': return 'bg-blue-100 text-blue-600';
      case 'video': return 'bg-purple-100 text-purple-600';
      case 'document': return 'bg-green-100 text-green-600';
      case 'audio': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const MediaIcon = getMediaIcon();
  const isImage = item.mediaType === 'image';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(item.url);
    onCopyUrl?.(item.url);
  };

  const handlePreview = () => {
    onPreview?.(item);
  };

  return (
    <Card 
      className={`overflow-hidden relative group transition-all duration-200 hover:shadow-lg ${selected ? 'ring-2 ring-primary' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <button
          onClick={() => onSelect?.(item.id)}
          className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
            selected 
              ? 'bg-primary border-primary text-white' 
              : 'bg-white/80 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {selected ? (
            <CheckSquare className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Media Preview */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {isImage && item.thumbnailUrl ? (
          <>
            <img
              src={item.thumbnailUrl}
              alt={item.altText || item.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 w-full h-full" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <MediaIcon className={`w-12 h-12 ${getTypeColor().split(' ')[0]} mx-auto mb-2`} />
              <span className="text-sm text-gray-500 block truncate max-w-[120px] mx-auto">
                {item.fileName}
              </span>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={handlePreview}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={() => onDownload?.(item)}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className={getTypeColor()}>
            {item.mediaType.toUpperCase()}
          </Badge>
        </div>

        {/* Status Badge */}
        {item.status !== 'active' && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-gray-800 text-white">
              {item.status}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* File Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate" title={item.name}>
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 truncate" title={item.fileName}>
            {item.fileName}
          </p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
          <div>
            <span className="font-medium">Size:</span>
            <span className="ml-1">{formatFileSize(item.fileSize)}</span>
          </div>
          <div>
            <span className="font-medium">Used:</span>
            <span className="ml-1">{item.usageCount} times</span>
          </div>
          {item.dimensions && (
            <div>
              <span className="font-medium">Dimensions:</span>
              <span className="ml-1">{item.dimensions.width}×{item.dimensions.height}</span>
            </div>
          )}
          {item.duration && (
            <div>
              <span className="font-medium">Duration:</span>
              <span className="ml-1">{Math.floor(item.duration / 60)}:{String(item.duration % 60).padStart(2, '0')}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleCopyUrl}
              title="Copy URL"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onDownload?.(item)}
              title="Download"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(item)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyUrl}>
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload?.(item)}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(item)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};