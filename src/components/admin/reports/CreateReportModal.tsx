// 📦 components/admin/reports/CreateReportModal.tsx - SIMPLIFIED VERSION
'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Calendar, 
  FileText,
  TrendingUp, 
  Users, 
  Package, 
  Globe, 
  DollarSign,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils/cn';
import { reportTemplates, type ReportTemplate, type CreateReportData } from '@/lib/data/reports';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateReportData) => Promise<void>;
}

export const CreateReportModal: React.FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CreateReportData>({
    name: '',
    type: 'sales',
    description: '',
    period: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    format: 'pdf',
    parameters: {},
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTemplate(null);
      setIsSubmitting(false);
      setFormData({
        name: '',
        type: 'sales',
        description: '',
        period: {
          start: new Date().toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0],
        },
        format: 'pdf',
        parameters: {},
      });
    }
  }, [isOpen]);

  // Handle template selection
  const handleTemplateSelect = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      type: template.type,
      name: template.name,
      description: template.description,
      parameters: { ...template.defaultParameters },
      format: template.availableFormats[0],
    }));
  };

  // Handle form changes
  const handleChange = (field: keyof CreateReportData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onCreate(formData);
      onClose();
    } catch (error) {
      console.error('Failed to create report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return <TrendingUp className="w-4 h-4" />;
      case 'products': return <Package className="w-4 h-4" />;
      case 'customers': return <Users className="w-4 h-4" />;
      case 'traffic': return <Globe className="w-4 h-4" />;
      case 'revenue': return <DollarSign className="w-4 h-4" />;
      case 'inventory': return <Package className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="
        max-w-2xl
        w-[90vw]
        max-h-[85vh]
        overflow-y-auto
        bg-white
        rounded-lg
        shadow-xl
        p-0
        border
        z-[1000]
      ">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Create New Report
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm">
                Select a template and configure basic settings
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Template Selection */}
          <div className="space-y-3">
            <Label className="font-medium text-gray-900">
              Select Template
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {reportTemplates.slice(0, 6).map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-all",
                    selectedTemplate?.id === template.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center text-white",
                      template.color
                    )}>
                      <span className="text-sm">{template.icon}</span>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <div className="w-4 h-4 rounded-full bg-primary ml-auto flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Report Details</h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="report-name" className="text-sm font-medium text-gray-900">
                  Report Name *
                </Label>
                <Input
                  id="report-name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter report name"
                  required
                  className="mt-1 h-10"
                />
              </div>

              <div>
                <Label htmlFor="report-description" className="text-sm font-medium text-gray-900">
                  Description (Optional)
                </Label>
                <Textarea
                  id="report-description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description"
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Report Type
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => handleChange('type', value)}
                  >
                    <SelectTrigger className="h-10 mt-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(formData.type)}
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="products">Products</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="traffic">Traffic</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Format
                  </Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value: any) => handleChange('format', value)}
                  >
                    <SelectTrigger className="h-10 mt-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900">
                  Date Range
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <div>
                    <Input
                      type="date"
                      value={formData.period.start}
                      onChange={(e) => handleChange('period', {
                        ...formData.period,
                        start: e.target.value,
                      })}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={formData.period.end}
                      onChange={(e) => handleChange('period', {
                        ...formData.period,
                        end: e.target.value,
                      })}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {selectedTemplate && (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-3">Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {formData.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium text-gray-900 uppercase">
                    {formData.format}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(formData.period.start).toLocaleDateString()} to{' '}
                    {new Date(formData.period.end).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.name.trim() || isSubmitting}
              className="bg-primary hover:bg-primary-dark px-6 py-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};