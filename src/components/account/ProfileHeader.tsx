// 📄 /components/account/ProfileHeader.tsx
"use client";

import { Button } from '@/components/ui/button';
import { Gift, Bell, Edit, Crown, Star, User as UserIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
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

interface ProfileHeaderProps {
  user: User;
  onEditProfile?: () => void;
  onViewNotifications?: () => void;
  onViewLoyalty?: () => void;
  loading?: boolean;
  className?: string;
}

const membershipConfig: Record<'standard' | 'premium' | 'gold', {
  gradient: string;
  icon: LucideIcon;
  label: string;
  color: string;
}> = {
  gold: {
    gradient: 'from-amber-500 to-amber-600',
    icon: Crown,
    label: 'Gold Member',
    color: 'text-amber-600'
  },
  premium: {
    gradient: 'from-purple-500 to-purple-600',
    icon: Star,
    label: 'Premium Member',
    color: 'text-purple-600'
  },
  standard: {
    gradient: 'from-gray-500 to-gray-600',
    icon: UserIcon,
    label: 'Standard Member',
    color: 'text-gray-600'
  }
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditProfile,
  onViewNotifications,
  onViewLoyalty,
  loading = false,
  className
}) => {
  if (loading) {
    return (
      <div className={cn('bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-48" />
                <div className="h-4 bg-gray-300 rounded w-32" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-32 h-10 bg-gray-300 rounded" />
              <div className="w-32 h-10 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const membership = membershipConfig[user.membership];
  const MembershipIcon = membership.icon;

  return (
    <div className={cn('bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={cn(
                'w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg',
                membership.gradient
              )}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <MembershipIcon className="h-10 w-10 text-white" />
                )}
              </div>
              {onEditProfile && (
                <button
                  onClick={onEditProfile}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full 
                  border-2 border-gray-200 flex items-center justify-center 
                  hover:bg-gray-50 transition-colors shadow-md"
                  aria-label="Edit profile"
                >
                  <Edit className="h-3.5 w-3.5 text-gray-600" />
                </button>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, <span className="text-primary">{user.name.split(' ')[0]}</span>!
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className={cn(
                  'px-3 py-1 rounded-full text-sm font-semibold text-white flex items-center gap-1',
                  `bg-gradient-to-r ${membership.gradient}`
                )}>
                  <MembershipIcon className="h-3.5 w-3.5" />
                  {membership.label}
                </span>
                <span className="text-gray-600">
                  • Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={onViewLoyalty}
            >
              <Gift className="mr-2 h-4 w-4" />
              {user.points.toLocaleString()} Points
            </Button>
            <Button 
              variant="outline"
              onClick={onViewNotifications}
              className="relative"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};