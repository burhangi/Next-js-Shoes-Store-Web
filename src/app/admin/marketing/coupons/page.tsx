'use client';

import React, { useState, useMemo } from 'react';
import { CouponCard } from '@/components/admin/marketing/CouponCard';
import { getCoupons, MarketingCoupon, CouponStatus, CouponType } from '@/lib/data/marketing';
import { Plus, Search, Filter, Percent, DollarSign, Truck, Gift, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CouponsPage() {
  const [filters, setFilters] = useState({
    status: 'all' as CouponStatus | 'all',
    type: 'all' as CouponType | 'all',
    search: '',
  });

  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);

  // Get filtered coupons
  const coupons = useMemo(() => {
    let filtered = getCoupons();
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(coupon => coupon.status === filters.status);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(coupon => coupon.type === filters.type);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(coupon =>
        coupon.name.toLowerCase().includes(searchLower) ||
        coupon.code.toLowerCase().includes(searchLower) ||
        coupon.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [filters]);

  const statusOptions: Array<{ value: CouponStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'expired', label: 'Expired' },
    { value: 'used_up', label: 'Used Up' },
  ];

  const typeOptions: Array<{ value: CouponType | 'all'; label: string; icon: React.ElementType }> = [
    { value: 'all', label: 'All Types', icon: Percent },
    { value: 'percentage', label: 'Percentage', icon: Percent },
    { value: 'fixed_amount', label: 'Fixed Amount', icon: DollarSign },
    { value: 'free_shipping', label: 'Free Shipping', icon: Truck },
    { value: 'bogo', label: 'BOGO', icon: Gift },
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
    setSelectedCoupons([]);
  };

  const handleSelectAll = () => {
    if (selectedCoupons.length === coupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(coupons.map(c => c.id));
    }
  };

  const handleCouponAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedCoupons.length === 0) return;
    
    const actionText = {
      activate: 'activate',
      deactivate: 'deactivate',
      delete: 'delete',
    }[action];
    
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedCoupons.length} coupon(s)?`)) {
      console.log(`${actionText} coupons:`, selectedCoupons);
      setSelectedCoupons([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons & Discounts</h1>
          <p className="text-gray-600">Manage discount codes and promotions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin/marketing/coupons/create">
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4" />
              Create Coupon
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
                placeholder="Search coupons by name, code, or description..."
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
      {selectedCoupons.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCoupons.length === coupons.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedCoupons.length} coupon{selectedCoupons.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleCouponAction('activate')}
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Activate Selected
                  </Button>
                  <Button
                    onClick={() => handleCouponAction('deactivate')}
                    variant="outline"
                    size="sm"
                    className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    Deactivate Selected
                  </Button>
                  <Button
                    onClick={() => handleCouponAction('delete')}
                    variant="destructive"
                    size="sm"
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSelectedCoupons([])}
                variant="ghost"
                size="sm"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coupons Grid */}
      {coupons.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onEdit={() => console.log('Edit', coupon.id)}
              onDelete={() => {
                if (window.confirm('Delete this coupon?')) {
                  console.log('Delete', coupon.id);
                }
              }}
              onCopy={(code) => {
                navigator.clipboard.writeText(code);
                console.log('Copied:', code);
              }}
              onPreview={() => console.log('Preview', coupon.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Percent className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
            <p className="text-gray-600 mb-6">
              {filters.search 
                ? `No coupons match "${filters.search}"`
                : 'No coupons match the selected filters'
              }
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleClearFilters}
                variant="outline"
              >
                Clear filters
              </Button>
              <Link href="/admin/marketing/coupons/create">
                <Button className="bg-primary hover:bg-primary-dark">
                  Create your first coupon
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      {coupons.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Coupons Summary</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{coupons.length}</div>
                <div className="text-sm text-gray-600">Total Coupons</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {coupons.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {coupons.filter(c => c.type === 'percentage').length}
                </div>
                <div className="text-sm text-gray-600">Percentage Off</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {coupons.reduce((sum, c) => sum + c.usageCount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Uses</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}