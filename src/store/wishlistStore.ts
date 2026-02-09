import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  brand?: string;
  category?: string;
  rating?: number;
  stock: number;
  addedAt: Date;
}

interface WishlistStore {
  items: WishlistItem[];
  
  // Actions
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  
  // Helpers
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Actions
      addToWishlist: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id);
          
          if (existingItem) {
            return state; // Already in wishlist
          }
          
          return {
            items: [...state.items, { ...item, addedAt: new Date() }]
          };
        });
      },

      removeFromWishlist: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      moveToCart: (id) => {
        const item = get().items.find(i => i.id === id);
        if (item) {
          // In a real app, this would call the cart store
          get().removeFromWishlist(id);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },

      // Helper methods
      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);