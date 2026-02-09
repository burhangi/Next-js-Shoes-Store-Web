// 📦 src/components/admin/orders/types.ts
export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded';

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