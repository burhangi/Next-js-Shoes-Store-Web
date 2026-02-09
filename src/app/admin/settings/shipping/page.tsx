// 📦 src/app/admin/settings/shipping/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { defaultSettings } from '@/lib/data/settings';
import type { ShippingZone, PickupLocation } from '@/lib/data/settings';

export default function ShippingSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings.shipping);
  const [isSaving, setIsSaving] = useState(false);
  const [newZone, setNewZone] = useState<Partial<ShippingZone>>({ name: '', countries: [], rate: 0 });
  const [newLocation, setNewLocation] = useState<Partial<PickupLocation>>({ name: '', address: '', phone: '' });
  const [editingZone, setEditingZone] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] = useState<string | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleAddZone = () => {
    if (newZone.name && newZone.rate !== undefined) {
      const zone: ShippingZone = {
        id: Date.now().toString(),
        name: newZone.name,
        countries: newZone.countries || [],
        rate: newZone.rate,
      };
      setSettings({
        ...settings,
        shippingZones: [...settings.shippingZones, zone],
      });
      setNewZone({ name: '', countries: [], rate: 0 });
    }
  };

  const handleRemoveZone = (id: string) => {
    setSettings({
      ...settings,
      shippingZones: settings.shippingZones.filter(zone => zone.id !== id),
    });
  };

  const handleUpdateZone = (id: string, updates: Partial<ShippingZone>) => {
    setSettings({
      ...settings,
      shippingZones: settings.shippingZones.map(zone =>
        zone.id === id ? { ...zone, ...updates } : zone
      ),
    });
    setEditingZone(null);
  };

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address) {
      const location: PickupLocation = {
        id: Date.now().toString(),
        name: newLocation.name,
        address: newLocation.address,
        phone: newLocation.phone || '',
      };
      setSettings({
        ...settings,
        pickupLocations: [...settings.pickupLocations, location],
      });
      setNewLocation({ name: '', address: '', phone: '' });
    }
  };

  const handleRemoveLocation = (id: string) => {
    setSettings({
      ...settings,
      pickupLocations: settings.pickupLocations.filter(location => location.id !== id),
    });
  };

  const handleUpdateLocation = (id: string, updates: Partial<PickupLocation>) => {
    setSettings({
      ...settings,
      pickupLocations: settings.pickupLocations.map(location =>
        location.id === id ? { ...location, ...updates } : location
      ),
    });
    setEditingLocation(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Shipping Settings</h2>
        <p className="text-gray-600 mt-1">Configure shipping methods, rates, and pickup locations</p>
      </div>

      <SettingsCard title="Shipping Configuration" description="Enable shipping and set rates">
        <SettingsToggle
          label="Enable Shipping"
          description="Allow customers to select shipping methods"
          checked={settings.shippingEnabled}
          onCheckedChange={(checked) => setSettings({...settings, shippingEnabled: checked})}
        />

        {settings.shippingEnabled && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="flatRate">Flat Rate Shipping ($)</Label>
                <Input
                  id="flatRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={settings.flatRate}
                  onChange={(e) => setSettings({...settings, flatRate: parseFloat(e.target.value) || 0})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  min="0"
                  step="0.01"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({...settings, freeShippingThreshold: parseFloat(e.target.value) || 0})}
                  className="mt-1"
                  placeholder="0 for no free shipping"
                />
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Shipping Zones" description="Configure shipping rates by region">
        <div className="space-y-4">
          {settings.shippingZones.map((zone) => (
            <div key={zone.id} className="p-4 border rounded-lg space-y-3">
              {editingZone === zone.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Zone Name</Label>
                      <Input
                        value={zone.name}
                        onChange={(e) => handleUpdateZone(zone.id, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Rate ($)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={zone.rate}
                        onChange={(e) => handleUpdateZone(zone.id, { rate: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Countries (comma separated)</Label>
                    <Input
                      value={zone.countries.join(', ')}
                      onChange={(e) => handleUpdateZone(zone.id, { 
                        countries: e.target.value.split(',').map(c => c.trim()).filter(c => c)
                      })}
                      placeholder="US, CA, GB, etc."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateZone(zone.id, {})}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingZone(null)}
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
                    <h4 className="font-medium text-gray-900">{zone.name}</h4>
                    <p className="text-sm text-gray-600">
                      Countries: {zone.countries.join(', ')} | Rate: ${zone.rate.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setEditingZone(zone.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleRemoveZone(zone.id)}
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
            <h4 className="font-medium text-gray-900">Add New Shipping Zone</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Zone Name</Label>
                <Input
                  value={newZone.name}
                  onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                  placeholder="e.g., Europe"
                />
              </div>
              <div>
                <Label>Rate ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newZone.rate || ''}
                  onChange={(e) => setNewZone({...newZone, rate: parseFloat(e.target.value) || 0})}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <Label>Countries (comma separated)</Label>
              <Input
                value={newZone.countries?.join(', ') || ''}
                onChange={(e) => setNewZone({
                  ...newZone, 
                  countries: e.target.value.split(',').map(c => c.trim()).filter(c => c)
                })}
                placeholder="US, CA, GB, etc."
              />
            </div>
            <Button
              onClick={handleAddZone}
              className="flex items-center gap-2"
              disabled={!newZone.name || newZone.rate === undefined}
            >
              <Plus className="w-4 h-4" />
              Add Shipping Zone
            </Button>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Pickup Locations" description="Configure local pickup locations">
        <div className="space-y-4">
          {settings.pickupLocations.map((location) => (
            <div key={location.id} className="p-4 border rounded-lg space-y-3">
              {editingLocation === location.id ? (
                <div className="space-y-3">
                  <div>
                    <Label>Location Name</Label>
                    <Input
                      value={location.name}
                      onChange={(e) => handleUpdateLocation(location.id, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={location.address}
                      onChange={(e) => handleUpdateLocation(location.id, { address: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={location.phone}
                      onChange={(e) => handleUpdateLocation(location.id, { phone: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateLocation(location.id, {})}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingLocation(null)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{location.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                    {location.phone && (
                      <p className="text-sm text-gray-600">Phone: {location.phone}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setEditingLocation(location.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleRemoveLocation(location.id)}
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
            <h4 className="font-medium text-gray-900">Add New Pickup Location</h4>
            <div className="space-y-3">
              <div>
                <Label>Location Name</Label>
                <Input
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                  placeholder="e.g., NYC Store"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                  placeholder="123 Street, City, State"
                />
              </div>
              <div>
                <Label>Phone Number (Optional)</Label>
                <Input
                  value={newLocation.phone}
                  onChange={(e) => setNewLocation({...newLocation, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <Button
              onClick={handleAddLocation}
              className="flex items-center gap-2"
              disabled={!newLocation.name || !newLocation.address}
            >
              <Plus className="w-4 h-4" />
              Add Pickup Location
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