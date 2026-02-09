// 📦 src/app/admin/users/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Users | Admin Panel | Shoes Store',
  description: 'Manage admin users, roles, permissions, and access control for your shoes store admin panel.',
  keywords: ['admin', 'users', 'management', 'roles', 'permissions', 'access control', 'shoes store'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
