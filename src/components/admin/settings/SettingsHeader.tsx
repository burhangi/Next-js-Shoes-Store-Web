// 📦 components/admin/settings/SettingsHeader.tsx
'use client';

import React, { useState } from 'react';
import { Save, RefreshCw, Settings as SettingsIcon, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

export const SettingsHeader: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved', 'All changes have been saved successfully');
    }, 1500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      toast.info('Settings reset', 'All settings have been reset to defaults');
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-primary" />
              Store Settings
            </h1>
            <p className="text-gray-600">Configure your store preferences and integrations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset All
            </Button>
            
            <Button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="bg-primary hover:bg-primary-dark flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};