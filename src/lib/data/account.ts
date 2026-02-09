// 📦src/lib/data/account.ts
import { 
  Package, 
  Heart, 
  Star, 
  Award, 
  User, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell 
} from 'lucide-react';
import {  AccountStat, AccountActivity, AccountNavItem  } from '../types';

// Account Statistics
export const accountStats: AccountStat[] = [
  {
    id: 'stat-1',
    title: 'Total Orders',
    value: 24,
    icon: Package,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    trend: { value: 12, isPositive: true },
    href: '/account/orders'
  },
  {
    id: 'stat-2',
    title: 'Wishlist Items',
    value: 8,
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    href: '/account/wishlist'
  },
  {
    id: 'stat-3',
    title: 'Reviews',
    value: 12,
    icon: Star,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    href: '/account/reviews'
  },
  {
    id: 'stat-4',
    title: 'Loyalty Points',
    value: '1,250',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    trend: { value: 5, isPositive: true },
    href: '/account/loyalty'
  }
];

// Recent Activities
export const recentActivities: AccountActivity[] = [
  {
    id: 'act-1',
    type: 'order',
    title: 'Order Placed',
    description: 'Nike Air Max 270 • Order #ORD-2024-015',
    timestamp: '2 hours ago',
    status: 'completed',
    href: '/account/orders/ORD-2024-015'
  },
  {
    id: 'act-2',
    type: 'review',
    title: 'Review Added',
    description: '5 stars for Adidas Ultraboost 21',
    timestamp: '1 day ago',
    status: 'completed',
    href: '/account/reviews'
  },
  {
    id: 'act-3',
    type: 'address',
    title: 'Address Updated',
    description: 'Added new shipping address in Los Angeles',
    timestamp: '3 days ago',
    status: 'completed',
    href: '/account/addresses'
  },
  {
    id: 'act-4',
    type: 'payment',
    title: 'Payment Method Added',
    description: 'Visa **** 4242',
    timestamp: '1 week ago',
    status: 'completed',
    href: '/account/payment-methods'
  }
];

// Navigation Items
export const accountNavItems: AccountNavItem[] = [
  { id: 'nav-1', label: 'Dashboard', href: '/account', icon: User, description: 'Personal information' },
  { id: 'nav-2', label: 'Orders', href: '/account/orders', icon: Package, description: 'Order history & tracking', badge: 3 },
  { id: 'nav-3', label: 'Wishlist', href: '/account/wishlist', icon: Heart, description: 'Saved items', badge: 12 },
  { id: 'nav-4', label: 'Addresses', href: '/account/addresses', icon: MapPin, description: 'Shipping addresses' },
  { id: 'nav-5', label: 'Payment Methods', href: '/account/payment-methods', icon: CreditCard, description: 'Cards & payments' },
  { id: 'nav-6', label: 'Reviews', href: '/account/reviews', icon: Star, description: 'Your product reviews' },
  { id: 'nav-7', label: 'Notifications', href: '/account/notifications', icon: Bell, description: 'Manage notifications', badge: 5 },
  { id: 'nav-8', label: 'Loyalty', href: '/account/loyalty', icon: Award, description: 'Points & rewards' },
  { id: 'nav-9', label: 'Settings', href: '/account/settings', icon: Settings, description: 'Account preferences' }
];