// 📦 src/app/admin/settings/page.tsx - COMPLETE ERROR-FREE VERSION
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Globe, Calendar } from 'lucide-react';

// Define types locally since we can't import
interface GeneralSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
}

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState<GeneralSettings>({
    storeName: 'ShoeStore Pro',
    storeEmail: 'admin@shoestore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion Street, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    maintenanceMode: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // In real app, save to API
      alert('Settings saved successfully!');
    }, 1000);
  };

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ar', label: 'Arabic' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">General Settings</h2>
        <p className="text-gray-600 mt-1">Configure basic store information and preferences</p>
      </div>

      <SettingsCard 
        title="Store Information" 
        description="Basic details about your store"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="storeName">Store Name *</Label>
            <Input
              id="storeName"
              value={settings.storeName}
              onChange={(e) => setSettings({...settings, storeName: e.target.value})}
              placeholder="Enter store name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="storeEmail">Store Email *</Label>
            <Input
              id="storeEmail"
              type="email"
              value={settings.storeEmail}
              onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
              placeholder="Enter store email"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="storePhone">Phone Number</Label>
            <Input
              id="storePhone"
              value={settings.storePhone}
              onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
              placeholder="Enter phone number"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="storeAddress">Store Address</Label>
            <div className="mt-1">
              <textarea
                id="storeAddress"
                value={settings.storeAddress}
                onChange={(e) => setSettings({...settings, storeAddress: e.target.value})}
                placeholder="Enter store address"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard 
        title="Regional Settings" 
        description="Configure regional preferences for your store"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <div className="mt-1">
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="">Select currency</option>
                {currencies.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <div className="mt-1">
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="">Select timezone</option>
                {timezones.map((timezone) => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <div className="mt-1">
              <select
                id="language"
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="">Select language</option>
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard 
        title="Store Hours" 
        description="Configure when your store is open"
      >
        <div className="space-y-4">
          {[
            { day: 'Monday', open: '09:00', close: '18:00' },
            { day: 'Tuesday', open: '09:00', close: '18:00' },
            { day: 'Wednesday', open: '09:00', close: '18:00' },
            { day: 'Thursday', open: '09:00', close: '18:00' },
            { day: 'Friday', open: '09:00', close: '18:00' },
            { day: 'Saturday', open: '10:00', close: '16:00' },
            { day: 'Sunday', open: '11:00', close: '15:00' },
          ].map((schedule) => (
            <div key={schedule.day} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium text-gray-900">{schedule.day}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{schedule.open}</span>
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{schedule.close}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard 
        title="Maintenance Mode" 
        description="Take your store offline for maintenance"
      >
        <SettingsToggle
          label="Enable Maintenance Mode"
          description="Visitors will see a maintenance page instead of your store"
          checked={settings.maintenanceMode}
          onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
        />
        
        {settings.maintenanceMode && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Maintenance Mode Active</h4>
                <p className="text-sm text-yellow-700">
                  Your store is currently in maintenance mode. Only administrators can access the site.
                  Customers will see a maintenance page.
                </p>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard 
        title="Store Logo & Favicon" 
        description="Upload your store's logo and favicon"
      >
        <div className="space-y-4">
          <div>
            <Label>Store Logo</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <Globe className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Drag & drop your logo here or click to browse</p>
              <p className="text-xs text-gray-500">Recommended size: 200x200px, PNG or JPG</p>
              <Button variant="outline" size="sm" className="mt-4">
                Upload Logo
              </Button>
            </div>
          </div>
          
          <div>
            <Label>Favicon</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Upload favicon for browser tabs</p>
              <p className="text-xs text-gray-500">Recommended size: 32x32px, ICO or PNG</p>
              <Button variant="outline" size="sm" className="mt-3">
                Upload Favicon
              </Button>
            </div>
          </div>
        </div>
      </SettingsCard>

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary-dark px-8 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}