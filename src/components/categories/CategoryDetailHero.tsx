// src/components/categories/CategoryDetailHero.tsx
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Category } from "@/lib/data/categories/types";

interface Breadcrumb {
  label: string;
  href: string;
}

interface CategoryDetailHeroProps {
  category: Category;
  breadcrumbs?: Breadcrumb[];
}

export default function CategoryDetailHero({ 
  category, 
  breadcrumbs 
}: CategoryDetailHeroProps) {
  const defaultBreadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.name, href: `/categories/${category.slug}` },
  ];

  const displayBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

  return (
    <div
      className="relative h-96 md:h-[500px] bg-cover bg-center flex items-end"
      style={{ 
        backgroundImage: `url(${category.bannerImage || category.image})` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="container mx-auto px-4 pb-12 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-white/80 text-sm mb-8">
          {displayBreadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <ChevronLeft className="w-4 h-4 rotate-180" />}
              {index === displayBreadcrumbs.length - 1 ? (
                <span className="text-white font-semibold">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-white transition">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {category.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl">
            {category.description}
          </p>

          <div className="flex flex-wrap gap-12 text-white">
            <div>
              <div className="text-4xl font-bold">{category.productCount}</div>
              <div className="text-white/70 text-lg">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold">4.8★</div>
              <div className="text-white/70 text-lg">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold">2.5k+</div>
              <div className="text-white/70 text-lg">Customer Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}