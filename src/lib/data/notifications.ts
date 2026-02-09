// 📦 lib/data/notifications.ts - Admin Notifications Data
export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'product' | 'customer' | 'system' | 'payment' | 'inventory' | 'review' | 'marketing';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  metadata?: {
    orderId?: string;
    productId?: string;
    customerId?: string;
    amount?: string;
    stock?: number;
    reviewId?: string;
    [key: string]: any;
  };
}

// Mock notifications data for admin panel
export const adminNotifications: AdminNotification[] = [
  {
    id: 'notif-001',
    title: 'New Order Received',
    message: 'Order #ORD-2024-001234 has been placed by John Doe. Total amount: $299.99',
    type: 'order',
    priority: 'high',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    actionUrl: '/admin/orders/ORD-2024-001234',
    metadata: {
      orderId: 'ORD-2024-001234',
      amount: '$299.99',
      customerName: 'John Doe',
      items: 3
    }
  },
  {
    id: 'notif-002',
    title: 'Low Stock Alert',
    message: 'Premium Running Shoes (SKU: PRS-001) are running low. Only 5 units remaining.',
    type: 'inventory',
    priority: 'urgent',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    actionUrl: '/admin/products/PRS-001',
    metadata: {
      productId: 'PRS-001',
      productName: 'Premium Running Shoes',
      stock: 5,
      threshold: 10
    }
  },
  {
    id: 'notif-003',
    title: 'Payment Failed',
    message: 'Payment processing failed for order #ORD-2024-001233. Amount: $189.99',
    type: 'payment',
    priority: 'urgent',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    actionUrl: '/admin/orders/ORD-2024-001233',
    metadata: {
      orderId: 'ORD-2024-001233',
      amount: '$189.99',
      reason: 'Insufficient funds'
    }
  },
  {
    id: 'notif-004',
    title: 'New Customer Registration',
    message: 'Sarah Smith has registered as a new customer. Total customers: 1,423',
    type: 'customer',
    priority: 'low',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    actionUrl: '/admin/customers/sarah-smith',
    metadata: {
      customerId: 'CUST-2024-001',
      customerName: 'Sarah Smith',
      email: 'sarah@example.com'
    }
  },
  {
    id: 'notif-005',
    title: 'New Product Review',
    message: 'Michael Johnson left a 5-star review for "Classic Sneakers". Review pending moderation.',
    type: 'review',
    priority: 'medium',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    actionUrl: '/admin/reviews/rev-2024-001',
    metadata: {
      reviewId: 'rev-2024-001',
      productId: 'CS-001',
      productName: 'Classic Sneakers',
      rating: 5,
      customerName: 'Michael Johnson'
    }
  },
  {
    id: 'notif-006',
    title: 'System Update Completed',
    message: 'Store software has been successfully updated to version 2.5.0. All systems operational.',
    type: 'system',
    priority: 'low',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    metadata: {
      version: '2.5.0',
      updateType: 'minor'
    }
  },
  {
    id: 'notif-007',
    title: 'Order Shipped',
    message: 'Order #ORD-2024-001230 has been shipped. Tracking: TRK-123456789',
    type: 'order',
    priority: 'medium',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    actionUrl: '/admin/orders/ORD-2024-001230',
    metadata: {
      orderId: 'ORD-2024-001230',
      trackingNumber: 'TRK-123456789',
      shippingMethod: 'Express'
    }
  },
  {
    id: 'notif-008',
    title: 'Marketing Campaign Launched',
    message: 'Summer Sale campaign has been successfully launched. Expected reach: 50,000 customers.',
    type: 'marketing',
    priority: 'medium',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    actionUrl: '/admin/marketing/campaigns/summer-sale',
    metadata: {
      campaignId: 'CAMP-2024-001',
      campaignName: 'Summer Sale',
      expectedReach: 50000
    }
  },
  {
    id: 'notif-009',
    title: 'Refund Processed',
    message: 'Refund of $149.99 has been processed for order #ORD-2024-001225',
    type: 'payment',
    priority: 'medium',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    actionUrl: '/admin/orders/ORD-2024-001225',
    metadata: {
      orderId: 'ORD-2024-001225',
      amount: '$149.99',
      refundReason: 'Customer request'
    }
  },
  {
    id: 'notif-010',
    title: 'Product Out of Stock',
    message: 'Basketball Shoes (SKU: BS-002) are now out of stock. Restock recommended.',
    type: 'inventory',
    priority: 'high',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    actionUrl: '/admin/products/BS-002',
    metadata: {
      productId: 'BS-002',
      productName: 'Basketball Shoes',
      stock: 0
    }
  },
  {
    id: 'notif-011',
    title: 'Customer Support Ticket',
    message: 'New support ticket #TKT-2024-001 from customer regarding order delivery delay.',
    type: 'customer',
    priority: 'high',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    actionUrl: '/admin/customers/tickets/TKT-2024-001',
    metadata: {
      ticketId: 'TKT-2024-001',
      customerId: 'CUST-2024-002',
      subject: 'Delivery delay'
    }
  },
  {
    id: 'notif-012',
    title: 'Weekly Sales Report',
    message: 'Your weekly sales report is ready. Total revenue: $45,231.89 (+20.1% from last week)',
    type: 'system',
    priority: 'low',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actionUrl: '/admin/reports/weekly',
    metadata: {
      reportType: 'weekly',
      revenue: '$45,231.89',
      growth: '+20.1%'
    }
  },
  {
    id: 'notif-013',
    title: 'Bulk Order Received',
    message: 'Large bulk order #ORD-2024-001240 received from Corporate Client Inc. Amount: $5,999.99',
    type: 'order',
    priority: 'high',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    actionUrl: '/admin/orders/ORD-2024-001240',
    metadata: {
      orderId: 'ORD-2024-001240',
      amount: '$5,999.99',
      customerName: 'Corporate Client Inc.',
      items: 50,
      isBulk: true
    }
  },
  {
    id: 'notif-014',
    title: 'Product Price Updated',
    message: 'Price for "Designer Boots" has been updated from $199.99 to $179.99',
    type: 'product',
    priority: 'low',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    actionUrl: '/admin/products/DB-001',
    metadata: {
      productId: 'DB-001',
      productName: 'Designer Boots',
      oldPrice: '$199.99',
      newPrice: '$179.99'
    }
  },
  {
    id: 'notif-015',
    title: 'Security Alert',
    message: 'Unusual login attempt detected from IP: 203.0.113.1. Location: Unknown',
    type: 'system',
    priority: 'urgent',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    actionUrl: '/admin/settings/security',
    metadata: {
      ip: '203.0.113.1',
      location: 'Unknown',
      status: 'blocked'
    }
  }
];

// Helper functions
export const getUnreadCount = (notifications: AdminNotification[]): number => {
  return notifications.filter(n => !n.read).length;
};

export const getNotificationsByType = (
  notifications: AdminNotification[],
  type: AdminNotification['type']
): AdminNotification[] => {
  return notifications.filter(n => n.type === type);
};

export const getNotificationsByPriority = (
  notifications: AdminNotification[],
  priority: AdminNotification['priority']
): AdminNotification[] => {
  return notifications.filter(n => n.priority === priority);
};

export const sortNotificationsByDate = (
  notifications: AdminNotification[],
  ascending: boolean = false
): AdminNotification[] => {
  return [...notifications].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};
