// 📦 src/app/admin/reports/page.tsx - COMPLETE UPDATED VERSION
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ReportCard, 
  ReportStats, 
  ReportFilters, 
  CategoryGrid,
  CreateReportModal,
  ReportPreviewModal
} from '@/components/admin/reports';
import { 
  getReports, 
  getReportStats, 
  reportMetrics, 
  reportCategories, 
  type Report,
  deleteReport,
  createReport,
  type CreateReportData,
  type ReportCategory
} from '@/lib/data/reports';
import { 
  FileText, 
  Download, 
  Plus, 
  BarChart3, 
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from '@/components/ui/toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportsPage() {
  // State for filters
  const [filters, setFilters] = useState({
    type: 'all' as any,
    status: 'all' as any,
    period: 'all' as any,
    search: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState(getReportStats());

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReports(getReports());
      setIsLoading(false);
    }, 300);
  }, []);

  // Get filtered reports
  const filteredReports = useMemo(() => {
    let filtered = reports;

    if (filters.type !== 'all') {
      filtered = filtered.filter(report => report.type === filters.type);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(report =>
        report.name.toLowerCase().includes(searchLower) ||
        report.description.toLowerCase().includes(searchLower) ||
        report.type.toLowerCase().includes(searchLower)
      );
    }

    // Filter by selected category if any
    if (selectedCategory) {
      filtered = filtered.filter(report => report.type === selectedCategory);
    }

    // Filter by period
    if (filters.period !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (filters.period) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'yesterday':
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(startDate);
          endDate.setHours(23, 59, 59, 999);
          filtered = filtered.filter(report => {
            const generated = new Date(report.generatedAt);
            return generated >= startDate && generated <= endDate;
          });
          return filtered;
        case 'last7days':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'last30days':
          startDate.setDate(startDate.getDate() - 30);
          break;
        case 'this_month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last_month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
          filtered = filtered.filter(report => {
            const generated = new Date(report.generatedAt);
            return generated >= startDate && generated <= lastMonthEnd;
          });
          return filtered;
      }
      
      filtered = filtered.filter(report => new Date(report.generatedAt) >= startDate);
    }

    return filtered;
  }, [filters, selectedCategory, reports]);

  // Handlers
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      period: 'all',
      search: '',
    });
    setSelectedCategory(undefined);
    setSelectedReports([]);
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(r => r.id));
    }
  };

  const handleCategoryClick = (category: ReportCategory) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(undefined);
      setFilters(prev => ({ ...prev, type: 'all' }));
    } else {
      setSelectedCategory(category.id);
      setFilters(prev => ({ ...prev, type: category.id }));
    }
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setPreviewModalOpen(true);
  };

  const handleEditReport = (report: Report) => {
    toast.info(`Editing ${report.name}`, 'Redirecting to edit page...');
    // In real app, you would navigate to edit page
  };

  const handleDeleteReport = (report: Report) => {
    if (confirm(`Are you sure you want to delete "${report.name}"?`)) {
      deleteReport(report.id);
      setReports(getReports());
      setStats(getReportStats());
      toast.success('Report deleted', `${report.name} has been removed`);
    }
  };

  const handleDownloadReport = (report: Report) => {
    console.log('Download report:', report);
    if (report.downloadUrl) {
      // Simulate download
      window.open(report.downloadUrl, '_blank');
      toast.success('Download started', `${report.name} is being downloaded`);
    } else {
      toast.error('Report not ready', 'Please wait for the report to finish generating');
    }
  };

  const handleRegenerateReport = async (report: Report) => {
    try {
      toast.info('Regenerating report...', 'This may take a moment');
      const newReport = await createReport({
        name: `${report.name} (Regenerated)`,
        type: report.type,
        description: report.description,
        period: report.period,
        format: report.format,
        parameters: report.parameters || {},
      });
      setReports(prev => [newReport, ...prev]);
      setStats(getReportStats());
      toast.success('Report regenerated', `${report.name} has been updated`);
    } catch (error) {
      toast.error('Failed to regenerate', 'Please try again later');
    }
  };

  const handleBulkDownload = () => {
    if (selectedReports.length === 0) return;
    
    toast.info('Preparing downloads', `${selectedReports.length} reports selected`);
    // Implement bulk download
    selectedReports.forEach(id => {
      const report = reports.find(r => r.id === id);
      if (report?.downloadUrl) {
        window.open(report.downloadUrl, '_blank');
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedReports.length === 0) return;
    
    if (confirm(`Delete ${selectedReports.length} selected reports?`)) {
      selectedReports.forEach(id => deleteReport(id));
      setSelectedReports([]);
      setReports(getReports());
      setStats(getReportStats());
      toast.success('Reports deleted', `${selectedReports.length} reports removed`);
    }
  };

  const handleCreateReport = async (data: CreateReportData) => {
    setIsCreating(true);
    try {
      toast.info('Generating report...', 'This may take a few moments');
      
      const newReport = await createReport(data);
      setReports(prev => [newReport, ...prev]);
      setStats(getReportStats());
      
      toast.success('Report created!', `${data.name} has been generated successfully`);
      
      setCreateModalOpen(false);
    } catch (error) {
      toast.error('Failed to create report', 'Please try again later');
    } finally {
      setIsCreating(false);
    }
  };

  const handleExportAll = () => {
    toast.info('Exporting all reports', 'Preparing export package...');
    // Implement export all
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setReports(getReports());
      setStats(getReportStats());
      setIsLoading(false);
      toast.success('Refreshed', 'Reports list updated');
    }, 500);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-4">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and analyze business performance reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Link
            href="/admin/analytics"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Live Analytics
          </Link>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-primary hover:bg-primary-dark flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            disabled={isCreating}
          >
            <Plus className="w-4 h-4" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Ready to generate insights?</h3>
              <p className="text-sm text-gray-600">
                Create custom reports in a few simple steps
              </p>
            </div>
          </div>
          <Button
            onClick={() => setCreateModalOpen(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            disabled={isCreating}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Templates
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ReportStats metrics={reportMetrics} />

      {/* Category Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Report Categories</h2>
          <span className="text-sm text-gray-600">
            {reportCategories.length} categories
          </span>
        </div>
        <CategoryGrid
          categories={reportCategories}
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        onCreateReport={() => setCreateModalOpen(true)}
        onExport={handleExportAll}
      />

      {/* Bulk Actions */}
      {selectedReports.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedReports.length === filteredReports.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {selectedReports.length} report{selectedReports.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleBulkDownload}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Selected
                  </Button>
                  <Button
                    onClick={handleBulkDelete}
                    variant="destructive"
                    size="sm"
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSelectedReports([])}
                variant="ghost"
                size="sm"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Generated Reports
            {selectedCategory && (
              <span className="text-primary ml-2">
                • {reportCategories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
              {filters.search && ` matching "${filters.search}"`}
            </div>
            <Button
              onClick={handleSelectAll}
              variant="outline"
              size="sm"
            >
              {selectedReports.length === filteredReports.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </div>

        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                selected={selectedReports.includes(report.id)}
                onSelect={(checked) => {
                  if (checked) {
                    setSelectedReports(prev => [...prev, report.id]);
                  } else {
                    setSelectedReports(prev => prev.filter(id => id !== report.id));
                  }
                }}
                onView={handleViewReport}
                onEdit={handleEditReport}
                onDelete={handleDeleteReport}
                onDownload={handleDownloadReport}
                onRegenerate={handleRegenerateReport}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {filters.search 
                  ? `No reports match "${filters.search}"`
                  : selectedCategory
                  ? `No ${selectedCategory} reports available`
                  : 'No reports match the selected filters'
                }
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                >
                  Clear all filters
                </Button>
                <Button
                  onClick={() => setCreateModalOpen(true)}
                  className="bg-primary hover:bg-primary-dark"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Report Generation Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-1">📅 Schedule Reports</h4>
                  <p className="text-sm text-blue-700">
                    Set up automated reports to save time and ensure consistency.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-1">🔧 Custom Parameters</h4>
                  <p className="text-sm text-blue-700">
                    Use custom parameters to generate targeted insights for different teams.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-1">📊 Multiple Formats</h4>
                  <p className="text-sm text-blue-700">
                    Export reports in PDF, CSV, Excel, or JSON formats for different use cases.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-1">📈 Compare Periods</h4>
                  <p className="text-sm text-blue-700">
                    Generate comparison reports to track growth and identify trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Report Modal */}
      <CreateReportModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateReport}
      />

      {/* Report Preview Modal */}
      {selectedReport && (
        <ReportPreviewModal
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          report={selectedReport}
        />
      )}

      {/* Pagination */}
      {filteredReports.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="text-sm text-gray-600">
            Showing {Math.min(filteredReports.length, 8)} of {filteredReports.length} reports
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-white border-primary">
              1
            </Button>
            {filteredReports.length > 8 && (
              <>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}