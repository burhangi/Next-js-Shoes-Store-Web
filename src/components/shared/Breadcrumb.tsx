import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {index === items.length - 1 ? (
            <span className="font-semibold text-gray-900">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-[#D4AF37] transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
