// 📦 src/app/admin/settings/tax/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, Save, Globe, Percent } from 'lucide-react';
import { defaultSettings } from '@/lib/data/settings';
import type { TaxRate } from '@/lib/data/settings';

export default function TaxSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings.tax);
  const [isSaving, setIsSaving] = useState(false);
  const [newTaxRate, setNewTaxRate] = useState<Partial<TaxRate>>({ name: '', rate: 0, country: '' });
  const [newExemptCategory, setNewExemptCategory] = useState('');
  const [editingTaxRate, setEditingTaxRate] = useState<string | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleAddTaxRate = () => {
    if (newTaxRate.name && newTaxRate.rate !== undefined && newTaxRate.country) {
      const taxRate: TaxRate = {
        id: Date.now().toString(),
        name: newTaxRate.name,
        rate: newTaxRate.rate,
        country: newTaxRate.country,
        state: newTaxRate.state,
      };
      setSettings({
        ...settings,
        taxRates: [...settings.taxRates, taxRate],
      });
      setNewTaxRate({ name: '', rate: 0, country: '' });
    }
  };

  const handleRemoveTaxRate = (id: string) => {
    setSettings({
      ...settings,
      taxRates: settings.taxRates.filter(rate => rate.id !== id),
    });
  };

  const handleUpdateTaxRate = (id: string, updates: Partial<TaxRate>) => {
    setSettings({
      ...settings,
      taxRates: settings.taxRates.map(rate =>
        rate.id === id ? { ...rate, ...updates } : rate
      ),
    });
    setEditingTaxRate(null);
  };

  const handleAddExemptCategory = () => {
    if (newExemptCategory.trim()) {
      setSettings({
        ...settings,
        taxExemptCategories: [...settings.taxExemptCategories, newExemptCategory.trim()],
      });
      setNewExemptCategory('');
    }
  };

  const handleRemoveExemptCategory = (category: string) => {
    setSettings({
      ...settings,
      taxExemptCategories: settings.taxExemptCategories.filter(c => c !== category),
    });
  };

  const countries = [
    'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'AU', 'JP', 'IN', 'BR', 'MX', 'CN', 'RU'
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tax Settings</h2>
        <p className="text-gray-600 mt-1">Configure tax rates, rules, and exemptions</p>
      </div>

      <SettingsCard title="Tax Configuration" description="Enable taxes and set default rates">
        <SettingsToggle
          label="Enable Taxes"
          description="Calculate and collect taxes on orders"
          checked={settings.taxEnabled}
          onCheckedChange={(checked) => setSettings({...settings, taxEnabled: checked})}
        />

        {settings.taxEnabled && (
          <div className="space-y-4 mt-4">
            <SettingsToggle
              label="Tax Inclusive Pricing"
              description="Display prices with tax included"
              checked={settings.taxInclusive}
              onCheckedChange={(checked) => setSettings({...settings, taxInclusive: checked})}
            />
            
            <div>
              <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
              <Input
                id="defaultTaxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={settings.defaultTaxRate}
                onChange={(e) => setSettings({...settings, defaultTaxRate: parseFloat(e.target.value) || 0})}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                This rate will be used when no specific tax rate applies
              </p>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Tax Rates" description="Configure tax rates by country and region">
        <div className="space-y-4">
          {settings.taxRates.map((rate) => (
            <div key={rate.id} className="p-4 border rounded-lg space-y-3">
              {editingTaxRate === rate.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Tax Name</Label>
                      <Input
                        value={rate.name}
                        onChange={(e) => handleUpdateTaxRate(rate.id, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={rate.rate}
                        onChange={(e) => handleUpdateTaxRate(rate.id, { rate: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Country</Label>
                      <select
                        value={rate.country}
                        onChange={(e) => handleUpdateTaxRate(rate.id, { country: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      >
                        <option value="">Select country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    {rate.country === 'US' && (
                      <div>
                        <Label>State (Optional)</Label>
                        <select
                          value={rate.state || ''}
                          onChange={(e) => handleUpdateTaxRate(rate.id, { state: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        >
                          <option value="">All states</option>
                          {usStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateTaxRate(rate.id, {})}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingTaxRate(null)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      {rate.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {rate.country}
                      {rate.state && `, ${rate.state}`}
                      {' • '}
                      Rate: {rate.rate}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setEditingTaxRate(rate.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleRemoveTaxRate(rate.id)}
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Add New Tax Rate
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Tax Name</Label>
                <Input
                  value={newTaxRate.name}
                  onChange={(e) => setNewTaxRate({...newTaxRate, name: e.target.value})}
                  placeholder="e.g., California Sales Tax"
                />
              </div>
              <div>
                <Label>Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={newTaxRate.rate || ''}
                  onChange={(e) => setNewTaxRate({...newTaxRate, rate: parseFloat(e.target.value) || 0})}
                  placeholder="8.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Country</Label>
                <select
                  value={newTaxRate.country}
                  onChange={(e) => setNewTaxRate({...newTaxRate, country: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              {newTaxRate.country === 'US' && (
                <div>
                  <Label>State (Optional)</Label>
                  <select
                    value={newTaxRate.state || ''}
                    onChange={(e) => setNewTaxRate({...newTaxRate, state: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="">All states</option>
                    {usStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <Button
              onClick={handleAddTaxRate}
              className="flex items-center gap-2"
              disabled={!newTaxRate.name || newTaxRate.rate === undefined || !newTaxRate.country}
            >
              <Plus className="w-4 h-4" />
              Add Tax Rate
            </Button>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Tax Exempt Categories" description="Products in these categories will be tax exempt">
        <div className="space-y-4">
          {settings.taxExemptCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {settings.taxExemptCategories.map((category) => (
                <div
                  key={category}
                  className="px-3 py-2 bg-green-100 text-green-800 rounded-lg flex items-center gap-2"
                >
                  <span>{category}</span>
                  <button
                    onClick={() => handleRemoveExemptCategory(category)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tax exempt categories configured</p>
          )}

          <div className="flex gap-2">
            <Input
              value={newExemptCategory}
              onChange={(e) => setNewExemptCategory(e.target.value)}
              placeholder="e.g., Books, Groceries, Medicine"
              className="flex-1"
            />
            <Button
              onClick={handleAddExemptCategory}
              disabled={!newExemptCategory.trim()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
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