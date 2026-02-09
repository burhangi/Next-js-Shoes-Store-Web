// lib/data/flashDeals.ts
export interface FlashDeal {
  id: string;
  title: string;
  badge: string;
  discount: number;
  originalPrice: number;
  salePrice: number;
  image: string;
  category: string;
  featured?: boolean;
}

export const flashDeals: FlashDeal[] = [
  {
    id: "deal-1",
    title: "Urban Street Runner",
    badge: "Limited Time",
    discount: 50,
    originalPrice: 199.99,
    salePrice: 99.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    category: "Sneakers",
    featured: true
  },
  {
    id: "deal-2",
    title: "Classic Leather Boot",
    badge: "Best Deal",
    discount: 40,
    originalPrice: 299.99,
    salePrice: 179.99,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=2070&auto=format&fit=crop",
    category: "Boots",
    featured: true
  },
  {
    id: "deal-3",
    title: "Pro Performance Air",
    badge: "Bundle",
    discount: 35,
    originalPrice: 249.99,
    salePrice: 162.49,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2070&auto=format&fit=crop",
    category: "Running",
    featured: true
  },
  {
    id: "deal-4",
    title: "Lifestyle High-Tops",
    badge: "Flash Sale",
    discount: 45,
    originalPrice: 159.99,
    salePrice: 87.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop",
    category: "Casual",
    featured: true
  }
];

// Deal end time (set to 2 days from now)
export const dealEndTime = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
