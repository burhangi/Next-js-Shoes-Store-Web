'use client';

import React, { useState } from 'react';
import { ArrowLeft, Percent, DollarSign, Truck, Gift, Copy, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default function CreateCouponPage() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'percentage',
    value: 20,
    applicableTo: 'all_products',
    minPurchaseAmount: '',
    maxDiscountAmount: '',
    usageLimit: '',
    userLimit: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    singleUse: true,
  });

  const [generatedCode, setGeneratedCode] = useState<string>('');

  const couponTypes = [
    { value: 'percentage', label: 'Percentage Off', icon: Percent },
    { value: 'fixed_amount', label: 'Fixed Amount', icon: DollarSign },
    { value: 'free_shipping', label: 'Free Shipping', icon: Truck },
    { value: 'bogo', label: 'Buy One Get One', icon: Gift },
  ];

  const applicableToOptions = [
    { value: 'all_products', label: 'All Products' },
    { value: 'specific_categories', label: 'Specific Categories' },
    { value: 'specific_products', label: 'Specific Products' },
    { value: 'specific_brands', label: 'Specific Brands' },
  ];

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(code);
    setFormData(prev => ({ ...prev, code }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Coupon form submitted:', formData);
    alert('Coupon created successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/marketing/coupons">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back to Coupons
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Coupon</h1>
          <p className="text-gray-600">Generate discount codes and set up promotions</p>
        </div>
      </div>

      {/* Preview Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Coupon Preview</h3>
              <p className="text-sm text-gray-600">Your coupon will be ready to use once created</p>
            </div>
            {formData.code && (
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{formData.code}</div>
                <div className="text-sm text-gray-600">Discount Code</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Coupon Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Coupon Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Summer Sale 2024"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code *</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="SUMMER24"
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateRandomCode}>
                    <Copy className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the purpose of this coupon..."
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Type *</Label>
                <Select value={formData.type} onValueChange={handleSelectChange('type')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    {couponTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  {formData.type === 'percentage' ? 'Discount Percentage *' : 
                   formData.type === 'fixed_amount' ? 'Discount Amount ($) *' : 'Discount Value'}
                </Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder={formData.type === 'percentage' ? '20' : '10'}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Restrictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Applicable To *</Label>
              <Select value={formData.applicableTo} onValueChange={handleSelectChange('applicableTo')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select applicable products" />
                </SelectTrigger>
                <SelectContent>
                  {applicableToOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPurchaseAmount">Minimum Purchase Amount ($)</Label>
                <Input
                  id="minPurchaseAmount"
                  name="minPurchaseAmount"
                  type="number"
                  value={formData.minPurchaseAmount}
                  onChange={handleInputChange}
                  placeholder="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDiscountAmount">Maximum Discount Amount ($)</Label>
                <Input
                  id="maxDiscountAmount"
                  name="maxDiscountAmount"
                  type="number"
                  value={formData.maxDiscountAmount}
                  onChange={handleInputChange}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  name="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                  placeholder="1000"
                />
                <p className="text-xs text-gray-500">Leave empty for unlimited uses</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userLimit">Per User Limit</Label>
                <Input
                  id="userLimit"
                  name="userLimit"
                  type="number"
                  value={formData.userLimit}
                  onChange={handleInputChange}
                  placeholder="1"
                />
                <p className="text-xs text-gray-500">Times a single user can use this coupon</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="singleUse" className="font-medium">Single Use Per Customer</Label>
                <p className="text-sm text-gray-600">Customer can only use this coupon once</p>
              </div>
              <Switch
                id="singleUse"
                checked={formData.singleUse}
                onCheckedChange={handleSwitchChange('singleUse')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date *
                  </div>
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </div>
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate}
                />
                <p className="text-xs text-gray-500">Leave empty for no expiration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-dark">
            Create Coupon
          </Button>
        </div>
      </form>
    </div>
  );
}