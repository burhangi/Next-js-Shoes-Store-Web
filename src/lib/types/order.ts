// 📦 src/types/orders.ts
export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded';

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
  productId?: string;
}

export interface OrderAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface OrderNote {
  id: string;
  author: string;
  note: string;
  time: string;
  type?: 'system' | 'admin' | 'customer';
}

export interface OrderTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  itemsCount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  items: OrderItem[];
  notes: OrderNote[];
  timeline?: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderTableRow {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  total: number;
  itemsCount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
}

export interface OrderCardProps {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  itemsCount: number;
  status: OrderStatus;
  showActions?: boolean;
  className?: string;
}