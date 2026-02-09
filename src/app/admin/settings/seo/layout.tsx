// 📦 src/app/admin/settings/seo/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Dashboard | Settings | Admin Panel | Shoes Store',
  description: 'Complete SEO management dashboard for optimizing your shoes store. Track keywords, analyze content, audit site performance, manage backlinks, and configure SEO settings.',
  keywords: ['SEO', 'search engine optimization', 'keywords', 'backlinks', 'site audit', 'content analysis', 'admin', 'settings'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function SEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
