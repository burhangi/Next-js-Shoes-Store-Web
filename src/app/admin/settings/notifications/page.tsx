// 📦 src/app/admin/settings/notifications/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { defaultSettings } from '@/lib/data/settings';
import { Button } from '@/components/ui/button';

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings.notifications);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notifications Settings</h2>
        <p className="text-gray-600 mt-1">Configure email and alert preferences</p>
      </div>

      <SettingsCard title="Email Notifications" description="Configure email notification preferences">
        <div className="space-y-4">
          <SettingsToggle
            label="Enable Email Notifications"
            description="Receive all email notifications"
            checked={settings.emailNotifications}
            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
          />
          
          {settings.emailNotifications && (
            <div className="space-y-3 pl-4 border-l-2 border-gray-200">
              <SettingsToggle
                label="New Order Notifications"
                description="Get notified when a new order is placed"
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => setSettings({...settings, orderNotifications: checked})}
              />
              
              <SettingsToggle
                label="Low Stock Alerts"
                description="Get notified when product stock is low"
                checked={settings.lowStockAlerts}
                onCheckedChange={(checked) => setSettings({...settings, lowStockAlerts: checked})}
              />
              
              <SettingsToggle
                label="Customer Review Alerts"
                description="Get notified when customers leave reviews"
                checked={settings.customerReviewAlerts}
                onCheckedChange={(checked) => setSettings({...settings, customerReviewAlerts: checked})}
              />
            </div>
          )}
        </div>
      </SettingsCard>

      <SettingsCard title="Marketing & Newsletters" description="Configure marketing preferences">
        <div className="space-y-4">
          <SettingsToggle
            label="Marketing Emails"
            description="Receive marketing and promotional emails"
            checked={settings.marketingEmails}
            onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
          />
          
          <SettingsToggle
            label="Newsletter Subscriptions"
            description="Allow customers to subscribe to newsletters"
            checked={settings.newsletterSubscriptions}
            onCheckedChange={(checked) => setSettings({...settings, newsletterSubscriptions: checked})}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Webhook Integrations" description="Configure third-party integrations">
        <div className="space-y-4">
          <div>
            <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
            <Input
              id="slackWebhook"
              value={settings.slackWebhook}
              onChange={(e) => setSettings({...settings, slackWebhook: e.target.value})}
              placeholder="https://hooks.slack.com/services/..."
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Receive notifications in your Slack channel
            </p>
          </div>
          
          <div>
            <Label htmlFor="discordWebhook">Discord Webhook URL</Label>
            <Input
              id="discordWebhook"
              value={settings.discordWebhook}
              onChange={(e) => setSettings({...settings, discordWebhook: e.target.value})}
              placeholder="https://discord.com/api/webhooks/..."
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Receive notifications in your Discord server
            </p>
          </div>
          
          <div>
            <Label htmlFor="telegramWebhook">Telegram Bot Webhook</Label>
            <Input
              id="telegramWebhook"
              value={settings.telegramWebhook}
              onChange={(e) => setSettings({...settings, telegramWebhook: e.target.value})}
              placeholder="https://api.telegram.org/bot..."
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Receive notifications in your Telegram group
            </p>
          </div>
        </div>
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