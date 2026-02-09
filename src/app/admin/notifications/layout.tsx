// 📦 src/app/admin/notifications/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications | Admin Panel | Shoes Store',
  description: 'Manage and monitor all store notifications including orders, inventory alerts, customer updates, and system notifications.',
  keywords: ['admin', 'notifications', 'alerts', 'orders', 'inventory', 'shoes store'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
