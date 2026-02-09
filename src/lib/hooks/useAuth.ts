// 📦src/lib/hooks/useAuth.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const router = useRouter();

  // Check auth on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='))
          ?.split('=')[1];

        const userCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('user-data='))
          ?.split('=')[1];

        if (token && userCookie) {
          const user = JSON.parse(decodeURIComponent(userCookie));
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string, redirect?: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '123',
      name: 'John Doe',
      email: email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    // Set cookies
    document.cookie = `auth-token=mock-token-${Date.now()}; path=/; max-age=86400`;
    document.cookie = `user-data=${encodeURIComponent(JSON.stringify(mockUser))}; path=/; max-age=86400`;
    document.cookie = `user-role=${mockUser.role}; path=/; max-age=86400`;

    setAuthState({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
    });

    router.push(redirect || routes.account.dashboard);
    return { success: true, user: mockUser };
  }, [router]);

  const register = useCallback(async (data: any) => {
    // Simulate registration
    const mockUser: User = {
      id: '456',
      name: data.name,
      email: data.email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    // Set cookies
    document.cookie = `auth-token=mock-token-${Date.now()}; path=/; max-age=86400`;
    document.cookie = `user-data=${encodeURIComponent(JSON.stringify(mockUser))}; path=/; max-age=86400`;
    document.cookie = `user-role=${mockUser.role}; path=/; max-age=86400`;

    setAuthState({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
    });

    router.push(routes.account.dashboard);
    return { success: true, user: mockUser };
  }, [router]);

  const logout = useCallback(async () => {
    // Clear cookies
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user-data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    router.push(routes.home);
  }, [router]);

  return {
    ...authState,
    login,
    register,
    logout,
  };
};