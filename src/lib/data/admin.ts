// 📦 lib/data/admin.ts - Admin User Management Data
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'super_admin' | 'admin' | 'manager' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  phone?: string;
  department?: string;
  twoFactorEnabled: boolean;
  loginAttempts: number;
  lastPasswordChange?: string;
}

export interface AdminSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

export interface AdminActivity {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'profile_update' | 'permission_change' | 'user_created' | 'user_deleted';
  description: string;
  timestamp: string;
  ip?: string;
  location?: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  category: string;
  description: string;
}

// Mock Admin Users Data
export const adminUsers: AdminUser[] = [
  {
    id: 'admin-001',
    name: 'John Admin',
    email: 'john.admin@shoestore.com',
    role: 'super_admin',
    status: 'active',
    permissions: ['all'],
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    createdAt: '2023-01-15',
    phone: '+1 (555) 123-4567',
    department: 'IT',
    twoFactorEnabled: true,
    loginAttempts: 0,
    lastPasswordChange: '2024-01-01',
  },
  {
    id: 'admin-002',
    name: 'Sarah Manager',
    email: 'sarah.manager@shoestore.com',
    role: 'manager',
    status: 'active',
    permissions: ['products', 'orders', 'customers', 'reports'],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    createdAt: '2023-03-20',
    phone: '+1 (555) 234-5678',
    department: 'Sales',
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: 'admin-003',
    name: 'Mike Editor',
    email: 'mike.editor@shoestore.com',
    role: 'editor',
    status: 'active',
    permissions: ['products', 'categories', 'media'],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    createdAt: '2023-05-10',
    department: 'Content',
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: 'admin-004',
    name: 'Lisa Viewer',
    email: 'lisa.viewer@shoestore.com',
    role: 'viewer',
    status: 'active',
    permissions: ['products', 'orders', 'analytics'],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdAt: '2023-07-15',
    department: 'Marketing',
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: 'admin-005',
    name: 'Tom Admin',
    email: 'tom.admin@shoestore.com',
    role: 'admin',
    status: 'inactive',
    permissions: ['products', 'orders', 'customers'],
    createdAt: '2023-09-01',
    department: 'Operations',
    twoFactorEnabled: false,
    loginAttempts: 3,
  },
];

export const adminSessions: AdminSession[] = [
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
  {
    id: 'sess-003',
    device: 'Windows PC',
    browser: 'Firefox 121.0',
    location: 'Boston, USA',
    ip: '203.0.113.1',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    current: false,
  },
];

export const adminActivities: AdminActivity[] = [
  {
    id: 'act-001',
    type: 'login',
    description: 'Successful login from MacBook Pro',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ip: '192.168.1.100',
    location: 'New York, USA',
  },
  {
    id: 'act-002',
    type: 'password_change',
    description: 'Password changed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    ip: '192.168.1.100',
    location: 'New York, USA',
  },
  {
    id: 'act-003',
    type: 'profile_update',
    description: 'Profile information updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export const adminPermissions: AdminPermission[] = [
  { id: 'perm-001', name: 'all', category: 'General', description: 'Full access to all features' },
  { id: 'perm-002', name: 'products', category: 'Products', description: 'Manage products, categories, and inventory' },
  { id: 'perm-003', name: 'orders', category: 'Orders', description: 'View and manage orders' },
  { id: 'perm-004', name: 'customers', category: 'Customers', description: 'View and manage customer data' },
  { id: 'perm-005', name: 'analytics', category: 'Analytics', description: 'Access analytics and reports' },
  { id: 'perm-006', name: 'marketing', category: 'Marketing', description: 'Manage marketing campaigns' },
  { id: 'perm-007', name: 'settings', category: 'Settings', description: 'Access and modify settings' },
  { id: 'perm-008', name: 'users', category: 'Users', description: 'Manage admin users' },
];

// Current Admin User (logged in)
export const currentAdminUser: AdminUser = adminUsers[0];

// Helper Functions
export const getRoleBadgeColor = (role: AdminUser['role']) => {
  switch (role) {
    case 'super_admin':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'admin':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'manager':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'editor':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'viewer':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getStatusBadgeColor = (status: AdminUser['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'suspended':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};
