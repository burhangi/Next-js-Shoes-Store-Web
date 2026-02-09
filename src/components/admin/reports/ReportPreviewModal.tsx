// 📦 components/admin/reports/ReportPreviewModal.tsx - FIXED
'use client';

import React from 'react';
import { 
  X, 
  Download, 
  Calendar, 
  User, 
  FileText, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  BarChart3,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card'; // ADD THIS IMPORT
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Report } from '@/lib/data/reports';
import { cn } from '@/lib/utils/cn';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  // Format date without causing hydration errors
  const formatDate = React.useMemo(() => {
    return (dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch (error) {
        return dateString;
      }
    };
  }, []);

  const getStatusConfig = () => {
    switch (report.status) {
      case 'ready':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-100',
          label: 'Ready',
        };
      case 'generating':
        return {
          icon: RefreshCw,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          label: 'Generating',
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-100',
          label: 'Failed',
        };
      default:
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          label: 'Pending',
        };
    }
  };

  const getTypeColor = () => {
    switch (report.type) {
      case 'sales': return 'bg-blue-100 text-blue-800';
      case 'products': return 'bg-green-100 text-green-800';
      case 'customers': return 'bg-purple-100 text-purple-800';
      case 'traffic': return 'bg-orange-100 text-orange-800';
      case 'revenue': return 'bg-yellow-100 text-yellow-800';
      case 'inventory': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatusIcon = getStatusConfig().icon;

  const handleDownload = () => {
    if (report.downloadUrl) {
      window.open(report.downloadUrl, '_blank');
    }
  };

  // Use useMemo to format dates to avoid hydration errors
  const formattedDates = React.useMemo(() => ({
    generatedAt: formatDate(report.generatedAt),
    periodStart: new Date(report.period.start).toLocaleDateString(),
    periodEnd: new Date(report.period.end).toLocaleDateString(),
  }), [report.generatedAt, report.period.start, report.period.end]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="
        max-w-4xl
        w-[95vw]
        max-h-[90vh]
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
              <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Report Preview
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                View details for {report.name}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Report Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {report.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {report.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("font-medium", getTypeColor())}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </Badge>
                <Badge variant="outline" className={cn(
                  "flex items-center gap-1",
                  getStatusConfig().bg,
                  getStatusConfig().color
                )}>
                  <StatusIcon className="w-3 h-3" />
                  {getStatusConfig().label}
                </Badge>
                <Badge variant="outline" className="uppercase">
                  {report.format}
                </Badge>
                {report.size && (
                  <Badge variant="outline">
                    {report.size}
                  </Badge>
                )}
              </div>
            </div>
            
            <Button
              onClick={handleDownload}
              disabled={report.status !== 'ready'}
              className="bg-primary hover:bg-primary-dark flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>

          {/* Report Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Metadata */}
            <div className="space-y-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Report Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Generated Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formattedDates.generatedAt}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Generated By:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {report.generatedBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Report ID:</span>
                      <span className="text-sm font-medium text-gray-900 font-mono">
                        {report.id}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date Range */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date Range
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Start Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formattedDates.periodStart}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">End Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formattedDates.periodEnd}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Parameters & Preview */}
            <div className="space-y-4">
              {/* Parameters */}
              {report.parameters && Object.keys(report.parameters).length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Report Parameters
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(report.parameters).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {typeof value === 'boolean' 
                              ? (value ? 'Yes' : 'No')
                              : String(value)
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preview Section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Preview
                  </h3>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {report.format === 'pdf' && '📄'}
                        {report.format === 'csv' && '📊'}
                        {report.format === 'excel' && '📈'}
                        {report.format === 'json' && '🔤'}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {report.format.toUpperCase()} Preview
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click download to view full report
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close Preview
            </Button>
            <Button
              onClick={handleDownload}
              disabled={report.status !== 'ready'}
              className="bg-primary hover:bg-primary-dark"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};