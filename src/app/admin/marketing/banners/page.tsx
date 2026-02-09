'use client';

import React, { useState, useMemo } from 'react';
import { BannerCard } from '@/components/admin/marketing/BannerCard';
import { getBanners, MarketingBanner, BannerStatus, BannerPosition } from '@/lib/data/marketing';
import { Plus, Search, Filter, Image, Video, Layers, Type, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function BannersPage() {
  const [filters, setFilters] = useState({
    status: 'all' as BannerStatus | 'all',
    position: 'all' as BannerPosition | 'all',
    type: 'all' as MarketingBanner['type'] | 'all',
    search: '',
  });

  const [selectedBanners, setSelectedBanners] = useState<string[]>([]);

  // Get filtered banners
  const banners = useMemo(() => {
    let filtered = getBanners();
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(banner => banner.status === filters.status);
    }
    
    if (filters.position !== 'all') {
      filtered = filtered.filter(banner => banner.position === filters.position);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(banner => banner.type === filters.type);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(banner =>
        banner.name.toLowerCase().includes(searchLower) ||
        banner.description.toLowerCase().includes(searchLower) ||
        (banner.title && banner.title.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }, [filters]);

  const statusOptions: Array<{ value: BannerStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'expired', label: 'Expired' },
  ];

  const positionOptions: Array<{ value: BannerPosition | 'all'; label: string }> = [
    { value: 'all', label: 'All Positions' },
    { value: 'home-hero', label: 'Home Hero' },
    { value: 'home-middle', label: 'Home Middle' },
    { value: 'category-top', label: 'Category Top' },
    { value: 'product-page', label: 'Product Page' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'checkout', label: 'Checkout' },
  ];

  const typeOptions: Array<{ value: MarketingBanner['type'] | 'all'; label: string; icon: React.ElementType }> = [
    { value: 'all', label: 'All Types', icon: Image },
    { value: 'image', label: 'Image', icon: Image },
    { value: 'video', label: 'Video', icon: Video },
    { value: 'carousel', label: 'Carousel', icon: Layers },
    { value: 'text', label: 'Text', icon: Type },
  ];

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      position: 'all',
      type: 'all',
      search: '',
    });
    setSelectedBanners([]);
  };

  const handleSelectAll = () => {
    if (selectedBanners.length === banners.length) {
      setSelectedBanners([]);
    } else {
      setSelectedBanners(banners.map(b => b.id));
    }
  };

  const handleBannerAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedBanners.length === 0) return;
    
    const actionText = {
      activate: 'activate',
      deactivate: 'deactivate',
      delete: 'delete',
    }[action];
    
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedBanners.length} banner(s)?`)) {
      console.log(`${actionText} banners:`, selectedBanners);
      setSelectedBanners([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Banners</h1>
          <p className="text-gray-600">Manage website banners and promotions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin/marketing/banners/create">
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4" />
              Create Banner
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search banners by name or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('status', option.value)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      filters.status === option.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={filters.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                {positionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('type', option.value)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5 ${
                        filters.type === option.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.status !== 'all' || filters.position !== 'all' || filters.type !== 'all' || filters.search) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {filters.status !== 'all' && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Status: {statusOptions.find(s => s.value === filters.status)?.label}
                    </Badge>
                  )}
                  {filters.position !== 'all' && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      Position: {positionOptions.find(p => p.value === filters.position)?.label}
                    </Badge>
                  )}
                  {filters.type !== 'all' && (
                    <Badge variant="outline" className="bg-purple-100 text-purple-700">
                      Type: {typeOptions.find(t => t.value === filters.type)?.label}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedBanners.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBanners.length === banners.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedBanners.length} banner{selectedBanners.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleBannerAction('activate')}
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Activate Selected
                  </Button>
                  <Button
                    onClick={() => handleBannerAction('deactivate')}
                    variant="outline"
                    size="sm"
                    className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    Deactivate Selected
                  </Button>
                  <Button
                    onClick={() => handleBannerAction('delete')}
                    variant="destructive"
                    size="sm"
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSelectedBanners([])}
                variant="ghost"
                size="sm"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banners Grid */}
      {banners.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              onEdit={() => console.log('Edit', banner.id)}
              onDelete={() => {
                if (window.confirm('Delete this banner?')) {
                  console.log('Delete', banner.id);
                }
              }}
              onPreview={() => console.log('Preview', banner.id)}
              onToggleStatus={() => console.log('Toggle status', banner.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No banners found</h3>
            <p className="text-gray-600 mb-6">
              {filters.search 
                ? `No banners match "${filters.search}"`
                : 'No banners match the selected filters'
              }
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleClearFilters}
                variant="outline"
              >
                Clear filters
              </Button>
              <Link href="/admin/marketing/banners/create">
                <Button className="bg-primary hover:bg-primary-dark">
                  Create your first banner
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      {banners.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Banners Summary</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{banners.length}</div>
                <div className="text-sm text-gray-600">Total Banners</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {banners.filter(b => b.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {banners.filter(b => b.status === 'scheduled').length}
                </div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {banners.reduce((sum, b) => sum + b.clicks, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}