// 📦src/lib/navigation-data.ts
import {
  Home,
  ShoppingBag,
  User,
  Heart,
  Search,
  Grid,
  Flame,
  Star,
  Zap,
  TrendingUp,
  Package,
  Award,
  Truck,
  Shield,
  Clock,
  MapPin,
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Tag,
  Gift,
  HelpCircle,
  LogOut,
  Settings,
  CreditCard,
  Map,
  Globe,
} from 'lucide-react';

// Re-export icons for components to use
export {
  Home, ShoppingBag, User, Heart, Search, Grid, Flame, Star, Zap,
  TrendingUp, Package, Award, Truck, Shield, Clock, MapPin, Phone,
  Menu, X, ChevronDown, ChevronRight, ShoppingCart, Tag, Gift,
  HelpCircle, LogOut, Settings, CreditCard, Map, Globe
};

// Type definitions
export interface TopBarItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  isMegaMenu?: boolean;
  submenu?: Array<{
    id: string;
    label: string;
    href: string;
    description: string;
  }>;
}

export interface MegaMenuCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subcategories: Array<{
    name: string;
    href: string;
    count: number;
    isTrending?: boolean;
  }>;
  brands: string[];
  featuredProduct: {
    name: string;
    price: number;
    rating: number;
    imageColor: string;
  };
}

export interface UserMenuItem {
  type?: 'divider';
  label?: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export interface MobileQuickAction {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  borderColor: string;
  textColor: string;
}

// Top bar navigation items
export const topBarItems: TopBarItem[] = [
  {
    icon: Phone,
    text: '1-800-SHOES-NOW',
    href: 'tel:18007466376',
  },
  {
    icon: Clock,
    text: 'Mon-Fri: 9AM-9PM EST',
  },
  {
    icon: Truck,
    text: 'Free Shipping',
  },
  {
    icon: Shield,
    text: 'Secure Payment',
  },
  {
    icon: MapPin,
    text: 'Store Locator',
    href: '/store-locator',
  },
];

// Main navigation items
export const mainNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 'new-arrivals',
    label: 'New Arrivals',
    href: '/products/new-arrivals',
    icon: Flame,
    badge: 'NEW',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 'best-sellers',
    label: 'Best Sellers',
    href: '/products/best-sellers',
    icon: TrendingUp,
    badge: 'HOT',
    badgeColor: 'bg-red-500',
  },
  {
    id: 'categories',
    label: 'Categories',
    href: '#',
    icon: Grid,
    isMegaMenu: true,
    submenu: [
      {
        id: 'men',
        label: "Men's Shoes",
        href: '/categories/men',
        description: 'Stylish footwear for men',
      },
      {
        id: 'women',
        label: "Women's Shoes",
        href: '/categories/women',
        description: 'Elegant designs for women',
      },
      {
        id: 'kids',
        label: "Kids' Shoes",
        href: '/categories/kids',
        description: 'Comfortable shoes for kids',
      },
      {
        id: 'sports',
        label: 'Sports & Athletic',
        href: '/categories/sports',
        description: 'Performance footwear',
      },
      {
        id: 'formal',
        label: 'Formal Shoes',
        href: '/categories/formal',
        description: 'Business & formal wear',
      },
      {
        id: 'casual',
        label: 'Casual Sneakers',
        href: '/categories/casual',
        description: 'Everyday comfort',
      },
    ],
  },
  {
    id: 'sale',
    label: 'Sale',
    href: '/products/on-sale',
    icon: Zap,
    badge: '50% OFF',
    badgeColor: 'bg-[#FF6B35]',
  },
  {
    id: 'brands',
    label: 'Brands',
    href: 'products/brands',
    icon: Award,
  },
];

// Mega menu categories data
export const megaMenuCategories: MegaMenuCategory[] = [
  {
    id: 'men',
    name: "Men's Collection",
    description: 'Premium footwear for men',
    icon: '👔',
    color: 'from-blue-500 to-blue-600',
    subcategories: [
      { name: 'Running Shoes', href: '/categories/men/running', count: 245, isTrending: true },
      { name: 'Casual Shoes', href: '/categories/men/casual', count: 189 },
      { name: 'Formal Shoes', href: '/categories/men/formal', count: 76 },
      { name: 'Sports Shoes', href: '/categories/men/sports', count: 112 },
      { name: 'Boots', href: '/categories/men/boots', count: 89 },
      { name: 'Sneakers', href: '/categories/men/sneakers', count: 156 },
    ],
    brands: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok'],
    featuredProduct: {
      name: 'Premium Leather Oxford',
      price: 129.99,
      rating: 4.8,
      imageColor: 'bg-blue-100',
    },
  },
  {
    id: 'women',
    name: "Women's Collection",
    description: 'Elegant designs for women',
    icon: '👠',
    color: 'from-pink-500 to-purple-600',
    subcategories: [
      { name: 'Heels', href: '/categories/women/heels', count: 134, isTrending: true },
      { name: 'Flats', href: '/categories/women/flats', count: 98 },
      { name: 'Sandals', href: '/categories/women/sandals', count: 167 },
      { name: 'Boots', href: '/categories/women/boots', count: 102 },
      { name: 'Athletic', href: '/categories/women/athletic', count: 76 },
      { name: 'Wedges', href: '/categories/women/wedges', count: 45 },
    ],
    brands: ['Steve Madden', 'Nine West', 'Sam Edelman', 'Naturalizer'],
    featuredProduct: {
      name: 'Designer High Heels',
      price: 89.99,
      rating: 4.9,
      imageColor: 'bg-pink-100',
    },
  },
  {
    id: 'kids',
    name: "Kids' Collection",
    description: 'Comfortable shoes for kids',
    icon: '👟',
    color: 'from-green-500 to-teal-600',
    subcategories: [
      { name: 'School Shoes', href: '/categories/kids/school', count: 67 },
      { name: 'Sports Shoes', href: '/categories/kids/sports', count: 89 },
      { name: 'Sandals', href: '/categories/kids/sandals', count: 112 },
      { name: 'Boots', href: '/categories/kids/boots', count: 54 },
    ],
    brands: ['Stride Rite', 'Skechers', 'Nike Kids', 'Adidas Kids'],
    featuredProduct: {
      name: 'Kids Running Shoes',
      price: 49.99,
      rating: 4.7,
      imageColor: 'bg-green-100',
    },
  },
];

// User menu items
export const userMenuItems: UserMenuItem[] = [
  {
    label: 'My Account',
    href: '/account',
    icon: User,
  },
  {
    label: 'Orders',
    href: '/account/orders',
    icon: Package,
    badge: 3,
  },
  {
    label: 'Wishlist',
    href: '/account/wishlist',
    icon: Heart,
    badge: 2,
  },
  {
    label: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    badge: 3,
  },
  {
    type: 'divider',
  },
  {
    label: 'Settings',
    href: '/account/settings',
    icon: Settings,
  },
  {
    label: 'Payment Methods',
    href: '/account/payment-methods',
    icon: CreditCard,
  },
  {
    label: 'Addresses',
    href: '/account/addresses',
    icon: Map,
  },
  {
    type: 'divider',
  },
  {
    label: 'Help Center',
    href: '/help',
    icon: HelpCircle,
  },
  {
    label: 'Sign Out',
    href: '/logout',
    icon: LogOut,
  },
];

// Mobile quick actions
export const mobileQuickActions: MobileQuickAction[] = [
  {
    label: 'Sale',
    href: '/products/on-sale',
    icon: Zap,
    description: 'Up to 70% off',
    color: 'from-red-50 to-orange-50',
    borderColor: 'border-red-100',
    textColor: 'text-red-700',
  },
  {
    label: 'New Arrivals',
    href: '/products/new-arrivals',
    icon: Flame,
    description: 'Fresh styles',
    color: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-100',
    textColor: 'text-blue-700',
  },
  {
    label: 'Best Sellers',
    href: '/products/best-sellers',
    icon: TrendingUp,
    description: 'Top rated',
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-100',
    textColor: 'text-green-700',
  },
  {
    label: 'Flash Deals',
    href: '/products/flash-deals',
    icon: Gift,
    description: 'Limited time',
    color: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-100',
    textColor: 'text-purple-700',
  },
];