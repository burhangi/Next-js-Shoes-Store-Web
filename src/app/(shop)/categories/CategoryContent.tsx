// src/app/(shop)/categories/CategoriesContent.tsx
"use client";

import React from "react";
import { MOCK_PRODUCTS } from "@/lib/data/products/mock-data";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  productCount: number;
}

// Generate categories dynamically from products
const getCategoriesFromProducts = (): Category[] => {
  const categoryMap: Record<string, Category> = {};

  MOCK_PRODUCTS.forEach((product) => {
    if (product.category) {
      if (!categoryMap[product.category.id]) {
        categoryMap[product.category.id] = {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
          image: product.images[0],
          productCount: 1,
        };
      } else {
        categoryMap[product.category.id].productCount += 1;
      }
    }
  });

  return Object.values(categoryMap);
};

export default function CategoriesContent() {
  const categories = getCategoriesFromProducts();

  if (categories.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500">
        No categories found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group relative block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={cat.image || "/placeholder-category.jpg"}
                alt={cat.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-4 flex flex-col items-start justify-end">
              <h2 className="text-lg font-semibold">{cat.name}</h2>
              <span className="text-sm">{cat.productCount} Products</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}