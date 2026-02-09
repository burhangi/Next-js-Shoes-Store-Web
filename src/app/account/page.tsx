// 📄 /app/account/page.tsx - FIXED SPREAD ERRORS
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';

// Import components
import { ProfileHeader } from '@/components/account/ProfileHeader';
import { AccountNav } from '@/components/account/AccountNav';
import { StatCard } from '@/components/account/StatCard';
import { ActivityItem } from '@/components/account/ActivityItem';
import { ProfileForm } from '@/components/account/ProfileForm';

// Import data
import { mockUser } from '@/lib/data/users';
import { accountStats, recentActivities, accountNavItems } from '@/lib/data/account';

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`${routes.auth.login}?redirect=${encodeURIComponent(routes.account.dashboard)}`);
    }
  }, [isAuthenticated, router]);

  // Mock data
  const user = mockUser;
  const stats = { orders: 24, wishlist: 8, points: 1250 };

  // Event handlers (Backend will implement these)
  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
    router.push(routes.home);
  };

  const handleProfileUpdate = async (data: any) => {
    console.log('Profile data to be sent to backend:', data);
    return { success: true, message: 'Profile updated successfully' };
  };

  const handleViewOrders = () => router.push(routes.account.orders);
  const handleViewWishlist = () => router.push(routes.account.wishlist);
  const handleViewReviews = () => router.push('/account/reviews');
  const handleViewLoyalty = () => router.push(routes.account.loyalty);
  const handleViewNotifications = () => router.push(routes.account.notifications);
  const handleEditProfile = () => router.push(routes.account.settings);

  // Handler functions for stats
  const getStatClickHandler = (href: string) => {
    if (href === '/account/orders') return handleViewOrders;
    if (href === '/account/wishlist') return handleViewWishlist;
    if (href === '/account/reviews') return handleViewReviews;
    if (href === '/account/loyalty') return handleViewLoyalty;
    return undefined;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Profile Header */}
      <ProfileHeader
        user={user}
        onEditProfile={handleEditProfile}
        onViewNotifications={handleViewNotifications}
        onViewLoyalty={handleViewLoyalty}
        loading={loading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <AccountNav
              user={user}
              navItems={accountNavItems}
              stats={stats}
              onLogout={handleLogout}
              loading={loading}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {accountStats.map((stat) => (
                <StatCard
                  key={stat.id}
                  id={stat.id}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  bgColor={stat.bgColor}
                  trend={stat.trend}
                  href={stat.href}
                  onClick={getStatClickHandler(stat.href)}
                  loading={loading}
                />
              ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-600">Your latest account actions</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleViewOrders}
                  className="text-primary hover:text-primary-dark"
                  disabled={loading}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    id={activity.id}
                    type={activity.type}
                    title={activity.title}
                    description={activity.description}
                    timestamp={activity.timestamp}
                    status={activity.status}
                    href={activity.href}
                    loading={loading}
                  />
                ))}
              </div>
            </motion.div>

            {/* Profile Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProfileForm 
                user={user} 
                onSubmit={handleProfileUpdate}
                loading={loading}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}