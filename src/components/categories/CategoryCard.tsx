// components/categories/CategoryCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
    slug: string;
    image: string;
    productCount: number;
    badge?: "new" | "trending" | "sale" | "featured" | "premium";
  };
  variant?: "default" | "hero" | "compact";
};

export function CategoryCard({ category, variant = "default" }: CategoryCardProps) {
  const badgeStyles = {
    new: "bg-emerald-100 text-emerald-800",
    trending: "bg-amber-100 text-amber-800",
    sale: "bg-rose-100 text-rose-800",
    featured: "bg-blue-100 text-blue-800",
    premium: "bg-purple-100 text-purple-800",
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300",
        variant === "hero" ? "aspect-video" : "aspect-[4/5]"
      )}
    >
      <Link href={`/categories/${category.slug}`} className="absolute inset-0 z-10" />

      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Badge */}
      {category.badge && (
        <div
          className={cn(
            "absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold",
            badgeStyles[category.badge] || "bg-gray-100 text-gray-800"
          )}
        >
          {category.badge.toUpperCase()}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {category.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-white/90 text-sm font-medium">
            {category.productCount.toLocaleString()} products
          </span>

          <div className="flex items-center gap-2 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Shop now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}