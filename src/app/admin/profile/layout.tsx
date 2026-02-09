// 📦 src/app/admin/profile/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings | Admin Panel | Shoes Store',
  description: 'Manage your admin profile settings, personal information, and account preferences.',
  keywords: ['admin', 'profile', 'settings', 'account', 'personal information', 'shoes store'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
