// 📄 /components/account/ProfileForm.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, Calendar, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: 'user' | 'admin';
  membership: 'standard' | 'premium' | 'gold';
  points: number;
  joinedDate: string;
  status: 'active' | 'inactive';
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  preferences: {
    newsletter: boolean;
    promotions: boolean;
    smsAlerts: boolean;
    securityAlerts: boolean;
  };
}

interface ProfileFormProps {
  user: User;
  onSubmit?: (data: ProfileFormData) => Promise<{ success: boolean; message?: string }>;
  loading?: boolean;
  className?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user, 
  onSubmit,
  loading = false,
  className 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ').slice(1).join(' '),
    email: user.email,
    phone: user.phone || '+1 (555) 123-4567',
    birthDate: '1990-01-01',
    gender: 'male',
    preferences: {
      newsletter: true,
      promotions: true,
      smsAlerts: false,
      securityAlerts: true
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox inputs (for preferences)
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked
        }
      }));
    } else {
      // Handle text/date inputs (for flat fields)
      setFormData(prev => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (onSubmit) {
        const result = await onSubmit(formData);
        if (result.success) {
          console.log('Profile updated successfully');
        }
      } else {
        // Mock success
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Profile data (ready for API):', formData);
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6 animate-pulse', className)}>
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={cn('bg-white rounded-xl border border-gray-200 p-6 shadow-sm', className)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <Button 
          type="submit" 
          disabled={isSaving}
          className="bg-primary hover:bg-primary-dark min-w-[120px]"
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Personal Info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Avatar Upload */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-3xl text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors shadow-lg"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-600">Upload a new profile photo</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
          </div>

          {/* Account Security */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
            <h3 className="font-medium text-primary-dark mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Account Security
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">2FA Enabled</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Last Login</span>
                <span className="text-sm text-gray-600">Today, 10:30 AM</span>
              </div>
              <Button variant="outline" size="sm" className="w-full text-primary border-primary hover:bg-primary/10">
                Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="mb-2">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="focus:border-primary focus:ring-primary/30"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="mb-2">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="focus:border-primary focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="mb-2">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="focus:border-primary focus:ring-primary/30"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-2">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="focus:border-primary focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate" className="mb-2">Date of Birth</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="focus:border-primary focus:ring-primary/30"
                />
              </div>
              <div>
                <Label htmlFor="gender" className="mb-2">Gender</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-500" />
              Communication Preferences
            </h3>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                <input 
                  type="checkbox" 
                  name="newsletter"
                  checked={formData.preferences.newsletter}
                  onChange={handleInputChange}
                  className="mt-1 rounded text-primary focus:ring-primary/30" 
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Product Newsletter</span>
                  <p className="text-xs text-gray-500 mt-0.5">Receive updates about new products, features, and company announcements</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                <input 
                  type="checkbox" 
                  name="promotions"
                  checked={formData.preferences.promotions}
                  onChange={handleInputChange}
                  className="mt-1 rounded text-primary focus:ring-primary/30" 
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Promotional Offers</span>
                  <p className="text-xs text-gray-500 mt-0.5">Get exclusive discounts, early access to sales, and special promotions</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                <input 
                  type="checkbox" 
                  name="smsAlerts"
                  checked={formData.preferences.smsAlerts}
                  onChange={handleInputChange}
                  className="mt-1 rounded text-primary focus:ring-primary/30" 
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">SMS Order Alerts</span>
                  <p className="text-xs text-gray-500 mt-0.5">Receive real-time order updates and delivery notifications via SMS</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                <input 
                  type="checkbox" 
                  name="securityAlerts"
                  checked={formData.preferences.securityAlerts}
                  onChange={handleInputChange}
                  className="mt-1 rounded text-primary focus:ring-primary/30" 
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Security Alerts</span>
                  <p className="text-xs text-gray-500 mt-0.5">Get notified about important security updates and account activities</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  );
};