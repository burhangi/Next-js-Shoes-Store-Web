// 📦 components/admin/reports/ReportCard.tsx - UPDATED WITH SELECTION
'use client';

import React from 'react';
import { 
  FileText, Download, Clock, Calendar, User, 
  MoreVertical, Eye, Edit, Trash2, RefreshCw,
  CheckCircle, AlertCircle, XCircle, Clock as ClockIcon,
  Check
} from 'lucide-react';
import { Report } from '@/lib/data/reports';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface ReportCardProps {
  report: Report;
  selected?: boolean;
  onSelect?: (checked: boolean) => void;
  onView?: (report: Report) => void;
  onEdit?: (report: Report) => void;
  onDelete?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  onRegenerate?: (report: Report) => void;
  className?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  selected = false,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onRegenerate,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-100',
          label: 'Failed',
        };
      default:
        return {
          icon: ClockIcon,
          color: 'text-gray-600',
          bg: 'bg-gray-100',
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

  const getFormatIcon = () => {
    switch (report.format) {
      case 'pdf': return '📄';
      case 'csv': return '📊';
      case 'excel': return '📈';
      case 'json': return '🔤';
      default: return '📋';
    }
  };

  const StatusIcon = getStatusConfig().icon;

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden relative",
      selected && "ring-2 ring-primary",
      className
    )}>
      {/* Selection Checkbox */}
      {onSelect && (
        <div className="absolute top-3 left-3 z-10">
          <button
            onClick={() => onSelect(!selected)}
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              selected 
                ? "bg-primary border-primary" 
                : "bg-white border-gray-300 hover:border-primary"
            )}
          >
            {selected && <Check className="w-3 h-3 text-white" />}
          </button>
        </div>
      )}
      
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getTypeColor()}>
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
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {report.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {report.description}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onView?.(report)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload?.(report)} disabled={report.status !== 'ready'}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRegenerate?.(report)}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit?.(report)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(report)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>Period</span>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(report.period.start)} - {formatDate(report.period.end)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Generated</span>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(report.generatedAt)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <User className="w-3 h-3" />
              <span>By</span>
            </div>
            <p className="text-sm font-medium text-gray-900 truncate">
              {report.generatedBy}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FileText className="w-3 h-3" />
              <span>Format</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{getFormatIcon()}</span>
              <span className="text-sm font-medium text-gray-900 uppercase">
                {report.format}
              </span>
              {report.size && (
                <span className="text-xs text-gray-500">({report.size})</span>
              )}
            </div>
          </div>
        </div>

        {/* Parameters Preview */}
        {report.parameters && Object.keys(report.parameters).length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Parameters:</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(report.parameters).slice(0, 3).map(([key, value]) => (
                <span
                  key={key}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  title={`${key}: ${value}`}
                >
                  {key}: {typeof value === 'boolean' ? (value ? '✓' : '✗') : value}
                </span>
              ))}
              {Object.keys(report.parameters).length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{Object.keys(report.parameters).length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="px-5 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(report)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onDownload?.(report)}
            disabled={report.status !== 'ready'}
            className="flex-1 bg-primary hover:bg-primary-dark"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};