'use client';

import React, { useState, useMemo } from 'react';
import { DiscountCard } from '@/components/admin/marketing/DiscountCard';
import { getDiscounts, MarketingDiscount, DiscountStatus, DiscountType } from '@/lib/data/marketing';
import { Plus, Search, Filter, Calendar, Zap, Package, Award, Tag, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DiscountsPage() {
  const [filters, setFilters] = useState({
    status: 'all' as DiscountStatus | 'all',
    type: 'all' as DiscountType | 'all',
    search: '',
  });

  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  // Get filtered discounts
  const discounts = useMemo(() => {
    let filtered = getDiscounts();
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(discount => discount.status === filters.status);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(discount => discount.type === filters.type);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(discount =>
        discount.name.toLowerCase().includes(searchLower) ||
        discount.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [filters]);

  const statusOptions: Array<{ value: DiscountStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'expired', label: 'Expired' },
    { value: 'paused', label: 'Paused' },
  ];

  const typeOptions: Array<{ value: DiscountType | 'all'; label: string; icon: React.ElementType }> = [
    { value: 'all', label: 'All Types', icon: Tag },
    { value: 'seasonal', label: 'Seasonal', icon: Calendar },
    { value: 'flash_sale', label: 'Flash Sale', icon: Zap },
    { value: 'bulk_discount', label: 'Bulk Discount', icon: Package },
    { value: 'loyalty', label: 'Loyalty', icon: Award },
    { value: 'clearance', label: 'Clearance', icon: Tag },
  ];

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      type: 'all',
      search: '',
    });
    setSelectedDiscounts([]);
  };

  const handleSelectAll = () => {
    if (selectedDiscounts.length === discounts.length) {
      setSelectedDiscounts([]);
    } else {
      setSelectedDiscounts(discounts.map(d => d.id));
    }
  };

  const handleDiscountAction = (action: 'activate' | 'pause' | 'delete') => {
    if (selectedDiscounts.length === 0) return;
    
    const actionText = {
      activate: 'activate',
      pause: 'pause',
      delete: 'delete',
    }[action];
    
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedDiscounts.length} discount(s)?`)) {
      console.log(`${actionText} discounts:`, selectedDiscounts);
      setSelectedDiscounts([]);
    }
  };

  const totalRevenue = discounts.reduce((sum, d) => sum + d.revenueGenerated, 0);
  const totalUsage = discounts.reduce((sum, d) => sum + d.usageCount, 0);
  const activeDiscounts = discounts.filter(d => d.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discount Campaigns</h1>
          <p className="text-gray-600">Manage seasonal, flash, and bulk discount campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin/marketing/discounts/create">
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4" />
              Create Discount
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Discounts</p>
                <p className="text-2xl font-bold text-gray-900">{activeDiscounts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Uses</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsage.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
                placeholder="Search discounts by name or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          {(filters.status !== 'all' || filters.type !== 'all' || filters.search) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {filters.status !== 'all' && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Status: {statusOptions.find(s => s.value === filters.status)?.label}
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
      {selectedDiscounts.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDiscounts.length === discounts.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedDiscounts.length} discount{selectedDiscounts.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDiscountAction('activate')}
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Activate Selected
                  </Button>
                  <Button
                    onClick={() => handleDiscountAction('pause')}
                    variant="outline"
                    size="sm"
                    className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    Pause Selected
                  </Button>
                  <Button
                    onClick={() => handleDiscountAction('delete')}
                    variant="destructive"
                    size="sm"
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSelectedDiscounts([])}
                variant="ghost"
                size="sm"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discounts Grid */}
      {discounts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {discounts.map((discount) => (
            <DiscountCard
              key={discount.id}
              discount={discount}
              onEdit={() => console.log('Edit', discount.id)}
              onDelete={() => {
                if (window.confirm('Delete this discount?')) {
                  console.log('Delete', discount.id);
                }
              }}
              onPreview={() => console.log('Preview', discount.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No discounts found</h3>
            <p className="text-gray-600 mb-6">
              {filters.search 
                ? `No discounts match "${filters.search}"`
                : 'No discounts match the selected filters'
              }
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleClearFilters}
                variant="outline"
              >
                Clear filters
              </Button>
              <Link href="/admin/marketing/discounts/create">
                <Button className="bg-primary hover:bg-primary-dark">
                  Create your first discount
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      {discounts.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{discounts.length}</div>
                <div className="text-sm text-gray-600">Total Discounts</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {discounts.filter(d => d.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600">Revenue Generated</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {totalUsage.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Uses</div>
              </div>
            </div>
            
            {/* Top Performing Discounts */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Top Performing Discounts</h4>
              <div className="space-y-3">
                {discounts
                  .sort((a, b) => b.revenueGenerated - a.revenueGenerated)
                  .slice(0, 3)
                  .map((discount, index) => (
                    <div key={discount.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{discount.name}</h5>
                          <p className="text-sm text-gray-600">{discount.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${discount.revenueGenerated.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-sm text-gray-600">{discount.usageCount} uses</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}