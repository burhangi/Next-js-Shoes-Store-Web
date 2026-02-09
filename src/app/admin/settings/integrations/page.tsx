// 📦 src/app/admin/settings/integrations/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Shield,
  BarChart3,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { defaultSettings } from '@/lib/data/settings';

export default function IntegrationsSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings.integrations);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const integrations = [
    {
      id: 'googleAnalytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 'facebookPixel',
      name: 'Facebook Pixel',
      description: 'Track conversions and optimize ads',
      icon: Facebook,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing automation',
      icon: Mail,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Transactional email delivery',
      icon: Mail,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'SMS notifications',
      icon: MessageSquare,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 'recaptcha',
      name: 'Google reCAPTCHA',
      description: 'Spam protection for forms',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { name: 'Twitter', icon: Twitter, color: 'bg-sky-500' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          Integrations
        </h2>
        <p className="text-gray-600 mt-1">Connect your store with third-party services</p>
      </div>

      <SettingsCard title="Analytics & Marketing" description="Configure analytics and marketing integrations">
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.color}`}>
                    <integration.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <SettingsToggle
                  label=""
                  checked={integration.id === 'googleAnalytics' ? settings.googleAnalytics :
                          integration.id === 'facebookPixel' ? settings.facebookPixel :
                          integration.id === 'mailchimp' ? settings.mailchimp :
                          integration.id === 'sendgrid' ? settings.sendgrid :
                          integration.id === 'twilio' ? settings.twilio :
                          settings.recaptcha}
                  onCheckedChange={(checked) => {
                    const newSettings = { ...settings };
                    switch (integration.id) {
                      case 'googleAnalytics': newSettings.googleAnalytics = checked; break;
                      case 'facebookPixel': newSettings.facebookPixel = checked; break;
                      case 'mailchimp': newSettings.mailchimp = checked; break;
                      case 'sendgrid': newSettings.sendgrid = checked; break;
                      case 'twilio': newSettings.twilio = checked; break;
                      case 'recaptcha': newSettings.recaptcha = checked; break;
                    }
                    setSettings(newSettings);
                  }}
                />
              </div>
              
              {/* Configuration fields for each integration */}
              {integration.id === 'googleAnalytics' && settings.googleAnalytics && (
                <div className="pl-14">
                  <Label htmlFor="googleAnalyticsId">Tracking ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})}
                    placeholder="UA-XXXXXXXXX-X"
                    className="mt-1"
                  />
                </div>
              )}
              
              {integration.id === 'facebookPixel' && settings.facebookPixel && (
                <div className="pl-14">
                  <Label htmlFor="facebookPixelId">Pixel ID</Label>
                  <Input
                    id="facebookPixelId"
                    value={settings.facebookPixelId}
                    onChange={(e) => setSettings({...settings, facebookPixelId: e.target.value})}
                    placeholder="123456789012345"
                    className="mt-1"
                  />
                </div>
              )}
              
              {integration.id === 'mailchimp' && settings.mailchimp && (
                <div className="pl-14">
                  <Label htmlFor="mailchimpApiKey">API Key</Label>
                  <Input
                    id="mailchimpApiKey"
                    type="password"
                    value={settings.mailchimpApiKey}
                    onChange={(e) => setSettings({...settings, mailchimpApiKey: e.target.value})}
                    placeholder="Your Mailchimp API key"
                    className="mt-1"
                  />
                </div>
              )}
              
              {integration.id === 'sendgrid' && settings.sendgrid && (
                <div className="pl-14">
                  <Label htmlFor="sendgridApiKey">API Key</Label>
                  <Input
                    id="sendgridApiKey"
                    type="password"
                    value={settings.sendgridApiKey}
                    onChange={(e) => setSettings({...settings, sendgridApiKey: e.target.value})}
                    placeholder="SG.abcdefghijklmnop"
                    className="mt-1"
                  />
                </div>
              )}
              
              {integration.id === 'twilio' && settings.twilio && (
                <div className="pl-14">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="twilioSid">Account SID</Label>
                      <Input
                        id="twilioSid"
                        type="password"
                        value={settings.twilioSid}
                        onChange={(e) => setSettings({...settings, twilioSid: e.target.value})}
                        placeholder="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twilioToken">Auth Token</Label>
                      <Input
                        id="twilioToken"
                        type="password"
                        value={settings.twilioToken}
                        onChange={(e) => setSettings({...settings, twilioToken: e.target.value})}
                        placeholder="Your Twilio auth token"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {integration.id === 'recaptcha' && settings.recaptcha && (
                <div className="pl-14">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="recaptchaSiteKey">Site Key</Label>
                      <Input
                        id="recaptchaSiteKey"
                        value={settings.recaptchaSiteKey}
                        onChange={(e) => setSettings({...settings, recaptchaSiteKey: e.target.value})}
                        placeholder="6LcABCdUAAAAABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recaptchaSecretKey">Secret Key</Label>
                      <Input
                        id="recaptchaSecretKey"
                        type="password"
                        value={settings.recaptchaSecretKey}
                        onChange={(e) => setSettings({...settings, recaptchaSecretKey: e.target.value})}
                        placeholder="6LcABCdUAAAAABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Social Media Links" description="Add links to your social media profiles">
        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.color}`}>
                <platform.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <Label htmlFor={platform.name.toLowerCase()}>{platform.name} URL</Label>
                <Input
                  id={platform.name.toLowerCase()}
                  placeholder={`https://${platform.name.toLowerCase()}.com/yourstore`}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="API Webhooks" description="Configure webhooks for third-party integrations">
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              placeholder="https://your-server.com/webhook"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Receive real-time updates for orders, customers, and products
            </p>
          </div>
          
          <div>
            <Label htmlFor="webhookSecret">Webhook Secret</Label>
            <Input
              id="webhookSecret"
              type="password"
              placeholder="Your webhook secret key"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Secret key to verify webhook requests
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Available Events</h4>
            <div className="space-y-2">
              {[
                'order.created',
                'order.updated',
                'order.completed',
                'customer.created',
                'customer.updated',
                'product.created',
                'product.updated',
                'payment.succeeded',
                'payment.failed',
              ].map((event) => (
                <div key={event} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <code className="text-sm text-gray-700">{event}</code>
                </div>
              ))}
            </div>
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