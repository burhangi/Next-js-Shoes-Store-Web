// 📦 src/app/admin/settings/payment/page.tsx - UPDATED
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

// Define types locally
interface PaymentSettings {
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  razorpayEnabled: boolean;
  stripePublicKey: string;
  stripeSecretKey: string;
  paypalClientId: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  currency: string;
  testMode: boolean;
}

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState<PaymentSettings>({
    stripeEnabled: true,
    paypalEnabled: true,
    razorpayEnabled: false,
    stripePublicKey: 'pk_live_51Hx...w4i2',
    stripeSecretKey: 'sk_live_51Hx...w4i2',
    paypalClientId: 'AY...RQ',
    razorpayKeyId: '',
    razorpayKeySecret: '',
    currency: 'USD',
    testMode: false,
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Payment settings saved successfully!');
    }, 1000);
  };

  const paymentGateways = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Credit card payments',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'PayPal payments',
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Indian payment gateway',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
        <p className="text-gray-600 mt-1">Configure payment gateways and processing options</p>
      </div>

      <SettingsCard title="Payment Gateways" description="Enable and configure payment methods">
        <div className="space-y-4">
          {paymentGateways.map((gateway) => (
            <div key={gateway.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", gateway.color)}>
                    <gateway.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{gateway.name}</h4>
                    <p className="text-sm text-gray-600">{gateway.description}</p>
                  </div>
                </div>
                <SettingsToggle
                  label=""
                  checked={gateway.id === 'stripe' ? settings.stripeEnabled : 
                          gateway.id === 'paypal' ? settings.paypalEnabled : 
                          settings.razorpayEnabled}
                  onCheckedChange={(checked) => {
                    const newSettings = { ...settings };
                    switch (gateway.id) {
                      case 'stripe': 
                        newSettings.stripeEnabled = checked; 
                        break;
                      case 'paypal': 
                        newSettings.paypalEnabled = checked; 
                        break;
                      case 'razorpay': 
                        newSettings.razorpayEnabled = checked; 
                        break;
                    }
                    setSettings(newSettings);
                  }}
                  className="!p-0 !border-0"
                />
              </div>
              
              {gateway.id === 'stripe' && settings.stripeEnabled && (
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="stripePublicKey">Public Key</Label>
                      <Input
                        id="stripePublicKey"
                        value={settings.stripePublicKey}
                        onChange={(e) => setSettings({...settings, stripePublicKey: e.target.value})}
                        type="password"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stripeSecretKey">Secret Key</Label>
                      <Input
                        id="stripeSecretKey"
                        value={settings.stripeSecretKey}
                        onChange={(e) => setSettings({...settings, stripeSecretKey: e.target.value})}
                        type="password"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {gateway.id === 'paypal' && settings.paypalEnabled && (
                <div className="p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="paypalClientId">Client ID</Label>
                    <Input
                      id="paypalClientId"
                      value={settings.paypalClientId}
                      onChange={(e) => setSettings({...settings, paypalClientId: e.target.value})}
                      type="password"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
              
              {gateway.id === 'razorpay' && settings.razorpayEnabled && (
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="razorpayKeyId">Key ID</Label>
                      <Input
                        id="razorpayKeyId"
                        value={settings.razorpayKeyId}
                        onChange={(e) => setSettings({...settings, razorpayKeyId: e.target.value})}
                        type="password"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="razorpayKeySecret">Key Secret</Label>
                      <Input
                        id="razorpayKeySecret"
                        value={settings.razorpayKeySecret}
                        onChange={(e) => setSettings({...settings, razorpayKeySecret: e.target.value})}
                        type="password"
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

      <SettingsCard title="Payment Preferences" description="Configure payment processing settings">
        <div className="space-y-4">
          <div>
            <Label htmlFor="currency">Default Currency</Label>
            <div className="mt-1">
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                {currencies.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <SettingsToggle
            label="Test Mode"
            description="Enable test mode for payment gateways"
            checked={settings.testMode}
            onCheckedChange={(checked) => setSettings({...settings, testMode: checked})}
          />
          
          {settings.testMode && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Test Mode Active</h4>
                  <p className="text-sm text-yellow-700">
                    Payments are processed in test mode. No real transactions will be processed.
                    Use test card numbers for testing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SettingsCard>

      <SettingsCard title="Security" description="Payment security settings">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">PCI DSS Compliant</h4>
              <p className="text-sm text-gray-600">
                All payment processing is PCI DSS compliant. Your customers' payment information is securely encrypted.
              </p>
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