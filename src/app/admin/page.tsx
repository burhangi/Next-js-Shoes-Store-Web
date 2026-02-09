// 📦 src/app/admin/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';
import { defaultSettings } from '@/lib/data/settings';
import { Button } from '@/components/ui/button';

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings.general);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // In real app, save to API
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

      <SettingsCard title="Store Information" description="Basic details about your store">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="storeName">Store Name *</Label>
            <Input
              id="storeName"
              value={settings.storeName}
              onChange={(e) => setSettings({...settings, storeName: e.target.value})}
              placeholder="Enter store name"
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
            />
          </div>
          <div>
            <Label htmlFor="storePhone">Phone Number</Label>
            <Input
              id="storePhone"
              value={settings.storePhone}
              onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="storeAddress">Store Address</Label>
            <Textarea
              id="storeAddress"
              value={settings.storeAddress}
              onChange={(e) => setSettings({...settings, storeAddress: e.target.value})}
              placeholder="Enter store address"
              rows={2}
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Regional Settings" description="Configure regional preferences for your store">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Maintenance Mode" description="Take your store offline for maintenance">
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

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary-dark px-8"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}