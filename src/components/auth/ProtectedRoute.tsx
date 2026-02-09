// 📦src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Loading from '../common/Loading';
import { routes } from '@/lib/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login with return URL
        const currentPath = window.location.pathname;
        const loginUrl = `${routes.auth.login}?redirect=${encodeURIComponent(currentPath)}`;
        router.push(loginUrl);
      } else if (requireAdmin && user?.role !== 'admin') {
        // Redirect to home if not admin
        router.push(routes.home);
      }
    }
  }, [isAuthenticated, isLoading, router, requireAdmin, user]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || (requireAdmin && user?.role !== 'admin')) {
    return null; // Will redirect
  }

  return <>{children}</>;
};