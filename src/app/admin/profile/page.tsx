// 📦 src/app/admin/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { currentAdminUser } from '@/lib/data/admin';
import { ProfileForm } from '@/components/admin/profile';

export default function ProfileSettingsPage() {
  const [user, setUser] = useState(currentAdminUser);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (updatedUser: typeof currentAdminUser) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setUser(updatedUser);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-7 h-7 text-primary" />
          Profile Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Personal Information</h2>
          <p className="text-sm text-gray-600">Update your personal details</p>
        </div>
        <ProfileForm
          user={user}
          onSave={handleSave}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}