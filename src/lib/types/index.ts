// 📦src/lib/types/index.ts
import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: 'user' | 'admin';
  membership: 'standard' | 'premium' | 'gold';
  points: number;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface AccountStat {
  id: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  href: string;
}

export interface AccountActivity {
  id: string;
  type: 'order' | 'review' | 'address' | 'payment' | 'account';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  href: string;
}

export interface AccountNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: number;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  preferences: {
    newsletter: boolean;
    promotions: boolean;
    smsAlerts: boolean;
    securityAlerts: boolean;
  };
}