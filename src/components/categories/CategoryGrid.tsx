// src/components/categories/CategoryGrid.tsx
import Link from "next/link";
import { Category } from "@/lib/data/categories/types";
import { CATEGORY_BADGES } from "@/lib/data/categories/constants";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {categories.map((category) => {
        const badge = category.badge ? CATEGORY_BADGES[category.badge] : null;

        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative block overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div className="aspect-[4/5] relative">
              <img
                src={category.image || "/placeholder.jpg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badge */}
              {badge && (
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full ${badge.color} text-xs font-bold flex items-center gap-2`}>
                  <span>{badge.icon}</span>
                  {badge.label}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90 mb-4 line-clamp-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.productCount} Products</span>
                  <span className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}