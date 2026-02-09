// 📦 components/admin/settings/SettingsCard.tsx - UPDATED
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
  className,
  headerClassName,
}) => {
  return (
    <Card className={cn("border-gray-200", className)}>
      <CardHeader className={cn("pb-3", headerClassName)}>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-600">{description}</CardDescription>
        )}
      </CardHeader>
      <div className="h-px bg-gray-200 mb-4" /> {/* Simple separator */}
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};