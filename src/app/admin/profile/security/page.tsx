// 📦 src/app/admin/profile/security/page.tsx
'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { adminSessions, currentAdminUser } from '@/lib/data/admin';
import { SecuritySettings } from '@/components/admin/profile';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(currentAdminUser.twoFactorEnabled);
  const [sessions, setSessions] = useState(adminSessions);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Password changed successfully!');
    }, 1000);
  };

  const handleTwoFactorToggle = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    alert(`Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleSessionRevoke = (sessionId: string) => {
    if (confirm('Are you sure you want to revoke this session?')) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      alert('Session revoked successfully');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="w-7 h-7 text-primary" />
          Security Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account security and active sessions
        </p>
      </div>

      <SecuritySettings
        sessions={sessions}
        twoFactorEnabled={twoFactorEnabled}
        onPasswordChange={handlePasswordChange}
        onTwoFactorToggle={handleTwoFactorToggle}
        onSessionRevoke={handleSessionRevoke}
        isLoading={isLoading}
      />

      {/* Security Tips */}
      <SettingsCard title="Security Tips" description="Best practices for keeping your account secure">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Use Strong Passwords</p>
              <p className="text-sm text-blue-700">
                Use a combination of uppercase, lowercase, numbers, and special characters.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900 mb-1">Enable Two-Factor Authentication</p>
              <p className="text-sm text-green-700">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900 mb-1">Review Active Sessions</p>
              <p className="text-sm text-yellow-700">
                Regularly check and revoke sessions from unknown devices or locations.
              </p>
            </div>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
