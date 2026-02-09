// 📦 src/app/admin/settings/layout.tsx
'use client';

import React from 'react';
import { SettingsSidebar } from '@/components/admin/settings/SettingsSidebar';
import { SettingsHeader } from '@/components/admin/settings/SettingsHeader';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader />
      <div className="flex">
        <SettingsSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}