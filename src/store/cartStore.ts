import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  brand?: string;
  slug: string;
  stock: number;
  sku?: string;
}

interface CartStore {
  items: CartItem[];
  promoCode: string;
  discountPercent: number;
  shippingOption: string;
  
  // Computed values as functions to avoid hydration issues
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTax: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  
  // Actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  moveToWishlist: (id: string) => void;
  applyPromoCode: (code: string) => boolean;
  setShippingOption: (option: string) => void;
  startCheckout: () => Promise<{ success: boolean; orderId?: string; error?: string }>;
  
  // Helpers
  getItemCount: () => number;
  getItemById: (id: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: '',
      discountPercent: 0,
      shippingOption: 'standard',

      // Computed values as functions to avoid hydration issues
      getSubtotal: () => {
        const state = get();
        if (!state.items || state.items.length === 0) return 0;
        return state.items.reduce((sum, item) => {
          const price = typeof item.price === 'number' ? item.price : 0;
          const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
          return sum + (price * quantity);
        }, 0);
      },

      getShippingCost: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const shippingOption = state.shippingOption || 'standard';
        
        // Use default shipping options
        const shippingOptions = [
          { id: 'standard', price: 4.99, freeThreshold: 99 },
          { id: 'express', price: 9.99, freeThreshold: 150 },
          { id: 'overnight', price: 19.99, freeThreshold: 200 }
        ];
        
        const option = shippingOptions.find(opt => opt.id === shippingOption);
        if (!option) return 0;
        
        // Check if free shipping threshold is met
        if (option.freeThreshold && subtotal >= option.freeThreshold) {
          return 0;
        }
        return option.price;
      },

      getTax: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        return subtotal * 0.08; // Default tax rate
      },

      getDiscountAmount: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const discountPercent = state.discountPercent || 0;
        return subtotal * (discountPercent / 100);
      },

      getTotal: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const shippingCost = state.getShippingCost();
        const tax = state.getTax();
        const discountAmount = state.getDiscountAmount();
        return subtotal + shippingCost + tax - discountAmount;
      },

      // Actions
      addToCart: (item) => {
        try {
          // Validate item data
          if (!item || !item.id || !item.name || typeof item.price !== 'number') {
            console.error('Invalid item data:', item);
            return;
          }
          
          set((state) => {
            const currentItems = Array.isArray(state.items) ? state.items : [];
            const existingItem = currentItems.find(i => i && i.id === item.id);
            
            if (existingItem) {
              // Update quantity if item already exists
              return {
                items: currentItems.map(i =>
                  i && i.id === item.id
                    ? { 
                        ...i, 
                        quantity: Math.min((i.quantity || 1) + 1, typeof i.stock === 'number' ? i.stock : 10)
                      }
                    : i
                )
              };
            } else {
              // Add new item with required fields
              const newItem: CartItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                originalPrice: item.originalPrice,
                quantity: 1,
                image: item.image || '/api/placeholder/400/400',
                slug: item.slug || item.id,
                brand: item.brand,
                stock: typeof item.stock === 'number' ? item.stock : 10,
                size: item.size,
                color: item.color,
                sku: item.sku,
              };
              
              return {
                items: [...currentItems, newItem]
              };
            }
          });
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      },

      updateQuantity: (id, quantity) => {
        try {
          if (!id || typeof quantity !== 'number' || quantity < 1) {
            console.error('Invalid quantity update:', { id, quantity });
            return;
          }
          
          set((state) => {
            const currentItems = Array.isArray(state.items) ? state.items : [];
            return {
              items: currentItems.map(item => {
                if (!item || item.id !== id) return item;
                const maxStock = typeof item.stock === 'number' ? item.stock : 10;
                return { 
                  ...item, 
                  quantity: Math.max(1, Math.min(quantity, maxStock)) 
                };
              })
            };
          });
        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      },

      removeFromCart: (id) => {
        try {
          if (!id) return;
          
          set((state) => {
            const currentItems = Array.isArray(state.items) ? state.items : [];
            return {
              items: currentItems.filter(item => item && item.id !== id)
            };
          });
        } catch (error) {
          console.error('Error removing from cart:', error);
        }
      },

      clearCart: () => {
        try {
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      },

      moveToWishlist: (id) => {
        // In a real app, this would call an API to move to wishlist
        get().removeFromCart(id);
      },

      applyPromoCode: (code) => {
        // Demo promo codes
        const validPromos: Record<string, number> = {
          'SAVE10': 10,
          'FREESHIP': 0, // Special handling for free shipping
          'WELCOME20': 20,
        };

        if (validPromos[code] !== undefined) {
          const discount = validPromos[code];
          
          if (code === 'FREESHIP') {
            set({ shippingOption: 'standard', promoCode: code, discountPercent: 0 });
          } else {
            set({ promoCode: code, discountPercent: discount });
          }
          return true;
        }
        
        return false;
      },

      setShippingOption: (option) => {
        set({ shippingOption: option });
      },

      startCheckout: async () => {
        const state = get();
        const { items } = state;
        
        if (!items || items.length === 0) {
          return { success: false, error: 'Cart is empty' };
        }

        // Simulate API call
        return new Promise((resolve) => {
          setTimeout(() => {
            const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
            resolve({ success: true, orderId });
          }, 1000);
        });
      },

      // Helper methods
      getItemCount: () => {
        const state = get();
        if (!state.items || state.items.length === 0) return 0;
        return state.items.reduce((count, item) => {
          const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
          return count + quantity;
        }, 0);
      },

      getItemById: (id) => {
        const state = get();
        if (!state.items || !id) return undefined;
        return state.items.find(item => item && item.id === id);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        shippingOption: state.shippingOption,
      }),
    }
  )
);