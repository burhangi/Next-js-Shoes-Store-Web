import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  addressType?: 'home' | 'work' | 'other';
}

export interface PaymentMethod {
  type: 'credit-card' | 'debit-card' | 'paypal' | 'apple-pay' | 'google-pay';
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  cvv?: string;
  lastFour?: string;
  name?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CheckoutStore {
  // Addresses
  shippingAddress: Address | null;
  billingAddress: Address | null;
  useBillingAsShipping: boolean;
  
  // Shipping
  shippingMethod: string;
  
  // Payment
  paymentMethod: PaymentMethod | null;
  
  // Order
  orderId: string | null;
  orderDate: string | null;
  orderItems: OrderItem[];
  orderSubtotal: number;
  orderShippingCost: number;
  orderTax: number;
  orderDiscount: number;
  orderTotal: number;
  
  // Actions
  setShippingAddress: (address: Address) => void;
  setBillingAddress: (address: Address | null) => void;
  setUseBillingAsShipping: (use: boolean) => void;
  setShippingMethod: (methodId: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setOrderId: (orderId: string) => void;
  setOrderItems: (items: OrderItem[], subtotal: number, shippingCost: number, tax: number, discount: number, total: number) => void;
  clearCheckout: () => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      // Initial state
      shippingAddress: null,
      billingAddress: null,
      useBillingAsShipping: true,
      shippingMethod: 'standard',
      paymentMethod: null,
      orderId: null,
      orderDate: null,
      orderItems: [],
      orderSubtotal: 0,
      orderShippingCost: 0,
      orderTax: 0,
      orderDiscount: 0,
      orderTotal: 0,

      // Actions
      setShippingAddress: (address) => {
        set({ shippingAddress: address });
        // If using billing as shipping, update billing too
        const state = useCheckoutStore.getState();
        if (state.useBillingAsShipping) {
          set({ billingAddress: address });
        }
      },

      setBillingAddress: (address) => {
        set({ billingAddress: address, useBillingAsShipping: address === null });
      },

      setUseBillingAsShipping: (use) => {
        set({ useBillingAsShipping: use });
        if (use) {
          const state = useCheckoutStore.getState();
          set({ billingAddress: state.shippingAddress });
        }
      },

      setShippingMethod: (methodId) => {
        set({ shippingMethod: methodId });
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },

      setOrderId: (orderId) => {
        const orderDate = new Date().toISOString();
        set({ orderId, orderDate });
      },

      setOrderItems: (items, subtotal, shippingCost, tax, discount, total) => {
        set({
          orderItems: items,
          orderSubtotal: subtotal,
          orderShippingCost: shippingCost,
          orderTax: tax,
          orderDiscount: discount,
          orderTotal: total,
        });
      },

      clearCheckout: () => {
        set({
          shippingAddress: null,
          billingAddress: null,
          useBillingAsShipping: true,
          shippingMethod: 'standard',
          paymentMethod: null,
          orderId: null,
          orderDate: null,
          orderItems: [],
          orderSubtotal: 0,
          orderShippingCost: 0,
          orderTax: 0,
          orderDiscount: 0,
          orderTotal: 0,
        });
      },

      resetCheckout: () => {
        set({
          shippingAddress: null,
          billingAddress: null,
          useBillingAsShipping: true,
          shippingMethod: 'standard',
          paymentMethod: null,
        });
      },
    }),
    {
      name: 'checkout-storage',
      partialize: (state) => ({
        shippingAddress: state.shippingAddress,
        billingAddress: state.billingAddress,
        useBillingAsShipping: state.useBillingAsShipping,
        shippingMethod: state.shippingMethod,
        // Don't persist payment method for security
        // Don't persist orderId/orderDate
      }),
    }
  )
);
