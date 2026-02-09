// 📦 lib/data/user.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone?: string;
  address?: string;
  bio?: string;
  joinedDate: string;
  lastActive: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'order' | 'system';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: Session[];
  loginHistory: LoginRecord[];
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

export interface LoginRecord {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'failed';
}

export interface PreferenceSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  newsletter: boolean;
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
}

// Mock data
export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Admin User',
  email: 'admin@shoestore.com',
  avatar: '/avatars/admin.png',
  role: 'Administrator',
  phone: '+1 (555) 123-4567',
  address: '123 Admin Street, New York, NY 10001',
  bio: 'Store administrator with full access to all features.',
  joinedDate: '2023-01-15',
  lastActive: new Date().toISOString(),
};

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'New Order Received',
    message: 'Order #ORD-001234 has been placed by John Doe',
    type: 'order',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    actionUrl: '/admin/orders/ORD-001234',
    metadata: { orderId: 'ORD-001234', amount: '$299.99' }
  },
  {
    id: 'notif-002',
    title: 'Low Stock Alert',
    message: 'Premium Sneakers are running low (only 5 left)',
    type: 'warning',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    actionUrl: '/admin/products/prod-001',
    metadata: { productId: 'prod-001', stock: 5 }
  },
  {
    id: 'notif-003',
    title: 'System Update Completed',
    message: 'Store software has been updated to version 2.5.0',
    type: 'success',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    metadata: { version: '2.5.0' }
  },
  {
    id: 'notif-004',
    title: 'New Customer Review',
    message: 'Sarah Smith left a 5-star review for Running Shoes',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    actionUrl: '/admin/reviews/rev-001',
  },
  {
    id: 'notif-005',
    title: 'Payment Failed',
    message: 'Payment for order #ORD-001233 failed to process',
    type: 'error',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    actionUrl: '/admin/orders/ORD-001233',
  },
  {
    id: 'notif-006',
    title: 'Weekly Report Ready',
    message: 'Your weekly sales report is now available for download',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    actionUrl: '/admin/reports/weekly',
  },
];

export const mockSecuritySettings: SecuritySettings = {
  twoFactorEnabled: true,
  lastPasswordChange: '2024-01-01',
  activeSessions: [
    {
      id: 'sess-001',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'New York, USA',
      ip: '192.168.1.100',
      lastActive: new Date().toISOString(),
      current: true,
    },
    {
      id: 'sess-002',
      device: 'iPhone 14',
      browser: 'Safari 17.0',
      location: 'New York, USA',
      ip: '192.168.1.101',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      current: false,
    },
  ],
  loginHistory: [
    {
      id: 'login-001',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'New York, USA',
      ip: '192.168.1.100',
      timestamp: new Date().toISOString(),
      status: 'success',
    },
    {
      id: 'login-002',
      device: 'iPhone 14',
      browser: 'Safari 17.0',
      location: 'New York, USA',
      ip: '192.168.1.101',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: 'success',
    },
    {
      id: 'login-003',
      device: 'Windows PC',
      browser: 'Firefox 121.0',
      location: 'Unknown',
      ip: '203.0.113.1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      status: 'failed',
    },
  ],
};

export const mockPreferences: PreferenceSettings = {
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  newsletter: true,
  language: 'en',
  timezone: 'America/New_York',
  theme: 'light',
};