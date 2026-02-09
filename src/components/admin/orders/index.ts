// 📦 src/components/admin/orders/index.ts

// Export existing components
export { OrderStatusBadge } from './OrderStatusBadge';
export { OrderCard } from './OrderCard';
export { OrderTable } from './OrderTable';
export { OrderFilters } from './OrderFilters';
export { OrderStats } from './OrderStats';
export { OrderActions } from './OrderActions';
export { ShippingLabel } from './ShippingLabel';
export { RefundDialog } from './RefundDialog';

// Comment out or remove non-existent components until they're created
// export { OrderDetail } from 'OrderDetail'; // This doesn't exist yet
// export { OrderTimeline } from './Timeline'; // This doesn't exist yet

// Export types
export type { OrderStatus } from './OrderStatusBadge';
export type { OrderTableRow } from './OrderTable';
export type { OrderCardProps } from './OrderCard';