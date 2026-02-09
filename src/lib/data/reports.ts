// 📦 lib/data/reports.ts - SIMPLIFIED VERSION
export type ReportType = 'sales' | 'products' | 'customers' | 'traffic' | 'revenue' | 'inventory';
export type ReportPeriod = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'last90days' | 'this_month' | 'last_month' | 'custom';
export type ReportStatus = 'generating' | 'ready' | 'failed' | 'scheduled';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  period: {
    start: string;
    end: string;
  };
  generatedAt: string;
  generatedBy: string;
  status: ReportStatus;
  downloadUrl?: string;
  size?: string;
  format: 'pdf' | 'csv' | 'excel' | 'json';
  parameters?: Record<string, any>;
}

export interface ReportMetric {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  format: 'currency' | 'number' | 'percentage' | 'time';
  icon: string;
}

export interface ReportCategory {
  id: ReportType;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  icon: string;
  color: string;
  defaultParameters: Record<string, any>;
  availableFormats: ('pdf' | 'csv' | 'excel' | 'json')[];
}

export interface CreateReportData {
  name: string;
  type: ReportType;
  description?: string;
  period: {
    start: string;
    end: string;
  };
  format: 'pdf' | 'csv' | 'excel' | 'json';
  parameters: Record<string, any>;
}

// Report Templates Data - Simplified
export const reportTemplates: ReportTemplate[] = [
  {
    id: 'template-001',
    name: 'Sales Report',
    description: 'Revenue, orders, and conversions',
    type: 'sales',
    icon: '📈',
    color: 'bg-blue-500',
    defaultParameters: {
      includeReturns: true,
      compareToPrevious: true,
    },
    availableFormats: ['pdf', 'csv', 'excel'],
  },
  {
    id: 'template-002',
    name: 'Product Report',
    description: 'Best sellers and stock levels',
    type: 'products',
    icon: '📦',
    color: 'bg-green-500',
    defaultParameters: {
      minSales: 10,
      includeOutOfStock: false,
    },
    availableFormats: ['csv', 'excel'],
  },
  {
    id: 'template-003',
    name: 'Customer Report',
    description: 'Acquisition and retention',
    type: 'customers',
    icon: '👥',
    color: 'bg-purple-500',
    defaultParameters: {
      segmentBy: 'country',
      includeRFM: true,
    },
    availableFormats: ['pdf', 'excel'],
  },
  {
    id: 'template-004',
    name: 'Traffic Report',
    description: 'Visitor metrics and funnels',
    type: 'traffic',
    icon: '🌐',
    color: 'bg-orange-500',
    defaultParameters: {
      includeSources: true,
      deviceBreakdown: true,
    },
    availableFormats: ['pdf', 'json'],
  },
  {
    id: 'template-005',
    name: 'Revenue Report',
    description: 'Revenue analysis',
    type: 'revenue',
    icon: '💰',
    color: 'bg-yellow-500',
    defaultParameters: {
      forecastPeriod: 'quarter',
      confidenceLevel: 95,
    },
    availableFormats: ['pdf', 'excel'],
  },
  {
    id: 'template-006',
    name: 'Inventory Report',
    description: 'Stock levels',
    type: 'inventory',
    icon: '📊',
    color: 'bg-red-500',
    defaultParameters: {
      lowStockThreshold: 10,
      turnoverPeriod: 'monthly',
    },
    availableFormats: ['csv', 'excel'],
  },
];

// Mock Reports Data - Simplified
export const mockReports: Report[] = [
  {
    id: 'rep-001',
    name: 'Monthly Sales Report',
    type: 'sales',
    description: 'Comprehensive sales analysis including revenue, orders, and average order value',
    period: {
      start: '2024-05-01',
      end: '2024-05-31',
    },
    generatedAt: '2024-06-01T09:30:00Z',
    generatedBy: 'John Doe',
    status: 'ready',
    downloadUrl: '/reports/sales-may-2024.pdf',
    size: '2.4 MB',
    format: 'pdf',
    parameters: {
      includeReturns: true,
      compareToPrevious: true,
    },
  },
  {
    id: 'rep-002',
    name: 'Product Performance',
    type: 'products',
    description: 'Top performing products and stock levels',
    period: {
      start: '2024-05-01',
      end: '2024-05-31',
    },
    generatedAt: '2024-06-01T10:15:00Z',
    generatedBy: 'Sarah Chen',
    status: 'ready',
    downloadUrl: '/reports/products-may-2024.csv',
    size: '1.8 MB',
    format: 'csv',
    parameters: {
      minSales: 10,
      includeOutOfStock: false,
    },
  },
  {
    id: 'rep-003',
    name: 'Customer Analytics',
    type: 'customers',
    description: 'Customer acquisition and retention analysis',
    period: {
      start: '2024-05-01',
      end: '2024-05-31',
    },
    generatedAt: '2024-06-01T11:45:00Z',
    generatedBy: 'Mike Wilson',
    status: 'ready',
    downloadUrl: '/reports/customers-may-2024.xlsx',
    size: '3.2 MB',
    format: 'excel',
    parameters: {
      segmentBy: 'country',
      includeRFM: true,
    },
  },
  {
    id: 'rep-004',
    name: 'Website Traffic',
    type: 'traffic',
    description: 'Visitor analytics and bounce rates',
    period: {
      start: '2024-05-28',
      end: '2024-06-03',
    },
    generatedAt: '2024-06-04T08:20:00Z',
    generatedBy: 'Emma Rodriguez',
    status: 'generating',
    size: 'Processing...',
    format: 'json',
    parameters: {
      includeSources: true,
      deviceBreakdown: true,
    },
  },
  {
    id: 'rep-005',
    name: 'Revenue Analysis',
    type: 'revenue',
    description: 'Revenue trends and projections',
    period: {
      start: '2024-06-01',
      end: '2024-08-31',
    },
    generatedAt: '2024-05-30T14:00:00Z',
    generatedBy: 'John Doe',
    status: 'ready',
    downloadUrl: '/reports/revenue-q3-2024.pdf',
    size: '4.1 MB',
    format: 'pdf',
    parameters: {
      forecastPeriod: 'quarter',
      confidenceLevel: 95,
    },
  },
  {
    id: 'rep-006',
    name: 'Inventory Status',
    type: 'inventory',
    description: 'Stock levels and turnover rates',
    period: {
      start: '2024-05-01',
      end: '2024-05-31',
    },
    generatedAt: '2024-06-01T16:30:00Z',
    generatedBy: 'Sarah Chen',
    status: 'ready',
    downloadUrl: '/reports/inventory-may-2024.csv',
    size: '1.2 MB',
    format: 'csv',
    parameters: {
      lowStockThreshold: 10,
      turnoverPeriod: 'monthly',
    },
  },
  {
    id: 'rep-007',
    name: 'Weekly Sales',
    type: 'sales',
    description: 'Weekly sales performance',
    period: {
      start: '2024-05-27',
      end: '2024-06-02',
    },
    generatedAt: '2024-06-03T09:00:00Z',
    generatedBy: 'Auto Generator',
    status: 'failed',
    size: 'N/A',
    format: 'pdf',
    parameters: {
      compareToPreviousWeek: true,
    },
  },
  {
    id: 'rep-008',
    name: 'Customer Retention',
    type: 'customers',
    description: 'Customer churn and retention',
    period: {
      start: '2024-04-01',
      end: '2024-05-31',
    },
    generatedAt: '2024-06-02T13:45:00Z',
    generatedBy: 'Mike Wilson',
    status: 'ready',
    downloadUrl: '/reports/retention-q2-2024.xlsx',
    size: '5.6 MB',
    format: 'excel',
    parameters: {
      cohortAnalysis: true,
      churnReasons: true,
    },
  },
];

// Report Categories
export const reportCategories: ReportCategory[] = [
  {
    id: 'sales',
    name: 'Sales Reports',
    description: 'Revenue, orders, and sales performance',
    icon: '📈',
    color: 'bg-blue-500',
    count: 2,
  },
  {
    id: 'products',
    name: 'Product Reports',
    description: 'Product performance and inventory',
    icon: '📦',
    color: 'bg-green-500',
    count: 1,
  },
  {
    id: 'customers',
    name: 'Customer Reports',
    description: 'Customer analytics and behavior',
    icon: '👥',
    color: 'bg-purple-500',
    count: 2,
  },
  {
    id: 'traffic',
    name: 'Traffic Reports',
    description: 'Website visitors and engagement',
    icon: '🌐',
    color: 'bg-orange-500',
    count: 1,
  },
  {
    id: 'revenue',
    name: 'Revenue Reports',
    description: 'Revenue analysis and forecasting',
    icon: '💰',
    color: 'bg-yellow-500',
    count: 1,
  },
  {
    id: 'inventory',
    name: 'Inventory Reports',
    description: 'Stock levels and turnover',
    icon: '📊',
    color: 'bg-red-500',
    count: 1,
  },
];

// Key Metrics
export const reportMetrics: ReportMetric[] = [
  {
    label: 'Total Reports',
    value: 24,
    change: 12.5,
    trend: 'up',
    format: 'number',
    icon: '📋',
  },
  {
    label: 'Avg. Generation Time',
    value: '2m 30s',
    change: -8.2,
    trend: 'down',
    format: 'time',
    icon: '⏱️',
  },
  {
    label: 'Storage Used',
    value: '84.68 MB',
    change: 15.3,
    trend: 'up',
    format: 'number',
    icon: '💾',
  },
  {
    label: 'Failed Reports',
    value: 2,
    change: -5.1,
    trend: 'down',
    format: 'number',
    icon: '⚠️',
  },
];

// Helper functions
export const getReports = (filters?: {
  type?: ReportType;
  status?: ReportStatus;
  search?: string;
  period?: ReportPeriod;
}) => {
  let filtered = [...mockReports];

  if (filters?.type) {
    filtered = filtered.filter(report => report.type === filters.type);
  }

  if (filters?.status) {
    filtered = filtered.filter(report => report.status === filters.status);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(report =>
      report.name.toLowerCase().includes(searchLower) ||
      report.description.toLowerCase().includes(searchLower) ||
      report.type.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.period) {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    switch (filters.period) {
      case 'last7days':
        filtered = filtered.filter(report => 
          new Date(report.generatedAt) >= sevenDaysAgo
        );
        break;
      case 'last30days':
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(report => 
          new Date(report.generatedAt) >= thirtyDaysAgo
        );
        break;
      case 'today':
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = filtered.filter(report => 
          new Date(report.generatedAt) >= today
        );
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        const yesterdayEnd = new Date(yesterday);
        yesterdayEnd.setHours(23, 59, 59, 999);
        filtered = filtered.filter(report => {
          const generated = new Date(report.generatedAt);
          return generated >= yesterday && generated <= yesterdayEnd;
        });
        break;
    }
  }

  return filtered;
};

export const getReportStats = () => {
  const total = mockReports.length;
  const ready = mockReports.filter(r => r.status === 'ready').length;
  const generating = mockReports.filter(r => r.status === 'generating').length;
  const failed = mockReports.filter(r => r.status === 'failed').length;

  return {
    total,
    ready,
    generating,
    failed,
    byType: reportCategories.map(cat => ({
      ...cat,
      count: mockReports.filter(r => r.type === cat.id).length,
    })),
  };
};

export const createReport = async (data: CreateReportData): Promise<Report> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport: Report = {
        id: `rep-${Date.now()}`,
        name: data.name,
        type: data.type,
        description: data.description || '',
        period: data.period,
        generatedAt: new Date().toISOString(),
        generatedBy: 'Current User',
        status: 'ready',
        downloadUrl: `/reports/${data.type}-${Date.now()}.${data.format}`,
        size: `${Math.floor(Math.random() * 5000) + 500} KB`,
        format: data.format,
        parameters: data.parameters,
      };
      resolve(newReport);
    }, 1000);
  });
};

export const deleteReport = (id: string): boolean => {
  const index = mockReports.findIndex(r => r.id === id);
  if (index !== -1) {
    mockReports.splice(index, 1);
    return true;
  }
  return false;
};