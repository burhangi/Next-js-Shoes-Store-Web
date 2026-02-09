"use client";

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header/Header';

export const HeaderWrapper = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) return null;

  return <Header />;
};
