import { Product, Category, User } from './types';

// Analytics Data Types
export interface AnalyticsMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  format?: 'currency' | 'percentage' | 'number';
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface TopProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  sales: number;
  revenue: number;
  growth: number;
  rating: number;
  category: string;
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  growth: number;
}

export interface SalesByCategory {
  category: string;
  sales: number;
  percentage: number;
  growth: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  conversion: number;
  trend: 'up' | 'down';
}

export interface CustomerSegment {
  segment: string;
  count: number;
  percentage: number;
  avgOrderValue: number;
  growth: number;
}

// Mock Analytics Data
export const revenueData: RevenueDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 50000) + 10000,
    orders: Math.floor(Math.random() * 500) + 50,
    customers: Math.floor(Math.random() * 200) + 20,
  };
});

export const topProducts: TopProduct[] = [
  {
    id: 'prod-001',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    image: '/products/nike-airmax-270.jpg',
    sales: 1243,
    revenue: 89432,
    growth: 12.5,
    rating: 4.8,
    category: 'Running',
  },
  {
    id: 'prod-002',
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    image: '/products/adidas-ultraboost22.jpg',
    sales: 987,
    revenue: 71234,
    growth: 8.2,
    rating: 4.9,
    category: 'Running',
  },
  {
    id: 'prod-003',
    name: 'Jordan 1 Retro High',
    brand: 'Jordan',
    image: '/products/jordan1-retro.jpg',
    sales: 856,
    revenue: 102345,
    growth: 15.3,
    rating: 4.7,
    category: 'Lifestyle',
  },
  {
    id: 'prod-004',
    name: 'New Balance 574',
    brand: 'New Balance',
    image: '/products/newbalance-574.jpg',
    sales: 743,
    revenue: 45678,
    growth: 5.6,
    rating: 4.6,
    category: 'Lifestyle',
  },
  {
    id: 'prod-005',
    name: 'Converse Chuck 70',
    brand: 'Converse',
    image: '/products/converse-chuck70.jpg',
    sales: 621,
    revenue: 37890,
    growth: -2.1,
    rating: 4.5,
    category: 'Lifestyle',
  },
  {
    id: 'prod-006',
    name: 'Puma RS-X',
    brand: 'Puma',
    image: '/products/puma-rsx.jpg',
    sales: 534,
    revenue: 34567,
    growth: 7.8,
    rating: 4.4,
    category: 'Running',
  },
  {
    id: 'prod-007',
    name: 'Vans Old Skool',
    brand: 'Vans',
    image: '/products/vans-oldskool.jpg',
    sales: 487,
    revenue: 29876,
    growth: 3.2,
    rating: 4.6,
    category: 'Skate',
  },
  {
    id: 'prod-008',
    name: 'Reebok Nano X3',
    brand: 'Reebok',
    image: '/products/reebok-nanox3.jpg',
    sales: 432,
    revenue: 45678,
    growth: 18.9,
    rating: 4.8,
    category: 'Training',
  },
  {
    id: 'prod-009',
    name: 'Under Armour Curry 10',
    brand: 'Under Armour',
    image: '/products/ua-curry10.jpg',
    sales: 389,
    revenue: 56789,
    growth: 22.4,
    rating: 4.9,
    category: 'Basketball',
  },
  {
    id: 'prod-010',
    name: 'ASICS Gel-Kayano 30',
    brand: 'ASICS',
    image: '/products/asics-kayano30.jpg',
    sales: 345,
    revenue: 43210,
    growth: 9.7,
    rating: 4.7,
    category: 'Running',
  },
];

export const topCustomers: TopCustomer[] = [
  {
    id: 'cust-001',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    orders: 24,
    totalSpent: 5421.89,
    lastOrder: '2024-01-15',
    growth: 15.2,
  },
  {
    id: 'cust-002',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    orders: 18,
    totalSpent: 4234.56,
    lastOrder: '2024-01-14',
    growth: 8.7,
  },
  {
    id: 'cust-003',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    orders: 16,
    totalSpent: 3890.12,
    lastOrder: '2024-01-13',
    growth: 22.4,
  },
  {
    id: 'cust-004',
    name: 'Jennifer Wilson',
    email: 'jennifer.wilson@example.com',
    orders: 14,
    totalSpent: 3245.78,
    lastOrder: '2024-01-12',
    growth: 5.6,
  },
  {
    id: 'cust-005',
    name: 'David Lee',
    email: 'david.lee@example.com',
    orders: 12,
    totalSpent: 2876.34,
    lastOrder: '2024-01-11',
    growth: 12.9,
  },
  {
    id: 'cust-006',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    orders: 10,
    totalSpent: 2456.78,
    lastOrder: '2024-01-10',
    growth: 18.3,
  },
  {
    id: 'cust-007',
    name: 'Robert Garcia',
    email: 'robert.garcia@example.com',
    orders: 9,
    totalSpent: 2109.45,
    lastOrder: '2024-01-09',
    growth: 7.4,
  },
  {
    id: 'cust-008',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    orders: 8,
    totalSpent: 1987.32,
    lastOrder: '2024-01-08',
    growth: 14.6,
  },
  {
    id: 'cust-009',
    name: 'Kevin Martinez',
    email: 'kevin.martinez@example.com',
    orders: 7,
    totalSpent: 1765.89,
    lastOrder: '2024-01-07',
    growth: 9.8,
  },
  {
    id: 'cust-010',
    name: 'Amanda Rodriguez',
    email: 'amanda.rodriguez@example.com',
    orders: 6,
    totalSpent: 1543.21,
    lastOrder: '2024-01-06',
    growth: 11.5,
  },
];

export const salesByCategory: SalesByCategory[] = [
  { category: 'Running', sales: 45231, percentage: 35, growth: 12.5 },
  { category: 'Lifestyle', sales: 32456, percentage: 25, growth: 8.2 },
  { category: 'Basketball', sales: 19876, percentage: 15, growth: 15.3 },
  { category: 'Training', sales: 15678, percentage: 12, growth: 5.6 },
  { category: 'Skate', sales: 9876, percentage: 8, growth: 7.8 },
  { category: 'Other', sales: 6543, percentage: 5, growth: -2.1 },
];

export const trafficSources: TrafficSource[] = [
  { source: 'Organic Search', visitors: 45231, percentage: 42, conversion: 4.2, trend: 'up' },
  { source: 'Direct', visitors: 32456, percentage: 30, conversion: 5.1, trend: 'up' },
  { source: 'Social Media', visitors: 15678, percentage: 15, conversion: 3.8, trend: 'up' },
  { source: 'Email', visitors: 9876, percentage: 9, conversion: 6.2, trend: 'up' },
  { source: 'Referral', visitors: 5432, percentage: 4, conversion: 2.9, trend: 'down' },
];

export const customerSegments: CustomerSegment[] = [
  { segment: 'High Spenders', count: 245, percentage: 12, avgOrderValue: 456.78, growth: 8.2 },
  { segment: 'Frequent Buyers', count: 432, percentage: 21, avgOrderValue: 234.56, growth: 12.5 },
  { segment: 'New Customers', count: 789, percentage: 38, avgOrderValue: 123.45, growth: 15.3 },
  { segment: 'At Risk', count: 123, percentage: 6, avgOrderValue: 89.12, growth: -5.6 },
  { segment: 'Inactive', count: 456, percentage: 23, avgOrderValue: 67.89, growth: -2.1 },
];

// Analytics helper functions
export const getDashboardMetrics = (): AnalyticsMetric[] => [
  {
    title: 'Total Revenue',
    value: 45231.89,
    change: 20.1,
    trend: 'up',
    format: 'currency',
  },
  {
    title: 'Total Orders',
    value: 2345,
    change: 12.5,
    trend: 'up',
    format: 'number',
  },
  {
    title: 'Customers',
    value: 1234,
    change: 8.2,
    trend: 'up',
    format: 'number',
  },
  {
    title: 'Conversion Rate',
    value: 4.75,
    change: 2.1,
    trend: 'up',
    format: 'percentage',
  },
  {
    title: 'Avg Order Value',
    value: 189.5,
    change: 5.3,
    trend: 'up',
    format: 'currency',
  },
  {
    title: 'Refund Rate',
    value: 2.4,
    change: -0.8,
    trend: 'down',
    format: 'percentage',
  },
  {
    title: 'Customer Satisfaction',
    value: 4.8,
    change: 0.2,
    trend: 'up',
    format: 'number',
  },
  {
    title: 'Organic Traffic',
    value: 42,
    change: 8,
    trend: 'up',
    format: 'percentage',
  },
];

export const getProductAnalytics = (productId?: string) => {
  if (productId) {
    return topProducts.find(p => p.id === productId);
  }
  return topProducts;
};

export const getCustomerAnalytics = (customerId?: string) => {
  if (customerId) {
    return topCustomers.find(c => c.id === customerId);
  }
  return topCustomers;
};