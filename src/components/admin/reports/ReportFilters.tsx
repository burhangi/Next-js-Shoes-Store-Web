// 📦 components/admin/reports/ReportFilters.tsx
'use client';

import React from 'react';
import { Search, Filter, Calendar, X, Download, Plus } from 'lucide-react';
import { ReportType, ReportStatus, ReportPeriod } from '@/lib/data/reports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface ReportFiltersProps {
  filters: {
    type: ReportType | 'all';
    status: ReportStatus | 'all';
    period: ReportPeriod | 'all';
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
  onCreateReport?: () => void;
  onExport?: () => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  onCreateReport,
  onExport,
}) => {
  const hasActiveFilters = 
    filters.type !== 'all' ||
    filters.status !== 'all' ||
    filters.period !== 'all' ||
    filters.search !== '';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter Reports</h3>
          
          <div className="flex items-center gap-3">
            {onCreateReport && (
              <Button
                onClick={onCreateReport}
                className="bg-primary hover:bg-primary-dark flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Report
              </Button>
            )}
            {onExport && (
              <Button
                onClick={onExport}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export All
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value) => onFiltersChange({ type: value })}
          >
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="customers">Customers</SelectItem>
              <SelectItem value="traffic">Traffic</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value) => onFiltersChange({ status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="generating">Generating</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          {/* Period Filter */}
          <Select
            value={filters.period}
            onValueChange={(value) => onFiltersChange({ period: value })}
          >
            <SelectTrigger>
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end mt-4">
            <Button
              onClick={onClearFilters}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};