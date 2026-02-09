'use client';

import React, { useState } from 'react';
import { Upload, X, Calendar, Image, Video, Type, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BannerFormData {
  name: string;
  description: string;
  type: 'image' | 'video' | 'carousel' | 'text';
  position: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
  startDate: string;
  endDate?: string;
  priority: number;
  imageFile?: File;
}

export const CreateBannerForm: React.FC = () => {
  const [formData, setFormData] = useState<BannerFormData>({
    name: '',
    description: '',
    type: 'image',
    position: 'home-hero',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    backgroundColor: '#FF6B35',
    textColor: '#FFFFFF',
    startDate: new Date().toISOString().split('T')[0],
    priority: 1,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const bannerTypes = [
    { value: 'image', label: 'Image Banner', icon: Image },
    { value: 'video', label: 'Video Banner', icon: Video },
    { value: 'carousel', label: 'Carousel', icon: Layers },
    { value: 'text', label: 'Text Banner', icon: Type },
  ];

  const bannerPositions = [
    { value: 'home-hero', label: 'Homepage Hero' },
    { value: 'home-middle', label: 'Homepage Middle' },
    { value: 'category-top', label: 'Category Top' },
    { value: 'product-page', label: 'Product Page' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'checkout', label: 'Checkout' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof BannerFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({ ...prev, imageFile: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your API
    alert('Banner created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Banner Name *</Label>
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
              <Label htmlFor="priority">Priority *</Label>
              <Input
                id="priority"
                name="priority"
                type="number"
                min="1"
                max="10"
                value={formData.priority}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-gray-500">Lower number = higher priority (1-10)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the purpose of this banner..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Banner Type *</Label>
              <Select value={formData.type} onValueChange={handleSelectChange('type')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select banner type" />
                </SelectTrigger>
                <SelectContent>
                  {bannerTypes.map((type) => {
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
              <Label>Position *</Label>
              <Select value={formData.position} onValueChange={handleSelectChange('position')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {bannerPositions.map((position) => (
                    <SelectItem key={position.value} value={position.value}>
                      {position.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Section */}
      <Card>
        <CardHeader>
          <CardTitle>Content & Design</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Summer Collection 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle (Optional)</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Up to 50% off on all summer footwear"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctaText">Button Text (Optional)</Label>
              <Input
                id="ctaText"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleInputChange}
                placeholder="Shop Now"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLink">Button Link (Optional)</Label>
              <Input
                id="ctaLink"
                name="ctaLink"
                value={formData.ctaLink}
                onChange={handleInputChange}
                placeholder="/products/summer-sale"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="backgroundColor"
                  name="backgroundColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={handleInputChange}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.backgroundColor}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="textColor"
                  name="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={handleInputChange}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.textColor}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Banner Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {previewImage ? (
                <div className="space-y-4">
                  <div className="relative mx-auto max-w-md">
                    <img
                      src={previewImage}
                      alt="Banner preview"
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Preview of your banner image</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag & drop your banner image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Recommended: 1920x600px (Desktop), 800x400px (Mobile). Max 5MB
                  </p>
                  <Button type="button" variant="outline">
                    Browse Files
                    <Input
                      type="file"
                      className="hidden"
                      id="banner-image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </>
              )}
            </div>
            {!previewImage && (
              <p className="text-xs text-gray-500">
                * Image is required for Image, Video, and Carousel banner types
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Section */}
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
                  End Date (Optional)
                </div>
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ''}
                onChange={handleInputChange}
                min={formData.startDate}
              />
              <p className="text-xs text-gray-500">Leave empty for no end date</p>
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
          Create Banner
        </Button>
      </div>
    </form>
  );
};