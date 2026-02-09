'use client';

import React from 'react';
import { Mail, Send, Clock, CheckCircle, PauseCircle, FileText, BarChart3, Calendar, Users, Edit, Trash2, Eye } from 'lucide-react';
import { MarketingEmailCampaign } from '@/lib/data/marketing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface EmailCampaignCardProps {
  campaign: MarketingEmailCampaign;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  className?: string;
}

export const EmailCampaignCard: React.FC<EmailCampaignCardProps> = ({
  campaign,
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  className = '',
}) => {
  const getStatusConfig = (status: MarketingEmailCampaign['status']) => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: FileText,
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: Clock,
        };
      case 'sending':
        return {
          label: 'Sending',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: Send,
        };
      case 'sent':
        return {
          label: 'Sent',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircle,
        };
      case 'paused':
        return {
          label: 'Paused',
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          icon: PauseCircle,
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: CheckCircle,
        };
    }
  };

  const getTypeLabel = (type: MarketingEmailCampaign['type']) => {
    const labels: Record<MarketingEmailCampaign['type'], string> = {
      'newsletter': 'Newsletter',
      'promotional': 'Promotional',
      'abandoned_cart': 'Abandoned Cart',
      'welcome': 'Welcome',
      're_engagement': 'Re-engagement',
    };
    return labels[type];
  };

  const statusConfig = getStatusConfig(campaign.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not sent';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg ${statusConfig.bgColor}`}>
            <Mail className={`w-5 h-5 ${statusConfig.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-lg">{campaign.name}</h3>
              <Badge variant="outline" className={`${statusConfig.bgColor} ${statusConfig.color} border-transparent flex items-center gap-1`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{campaign.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {getTypeLabel(campaign.type)}
              </Badge>
              <span className="text-xs text-gray-500 truncate">{campaign.subject}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{campaign.recipientCount.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Recipients</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{campaign.openRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Open Rate</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{campaign.clickRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Click Rate</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{campaign.bounceRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Bounce Rate</div>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {campaign.scheduleDate ? (
                <span>
                  Scheduled: {formatDate(campaign.scheduleDate)} at {formatTime(campaign.scheduleDate)}
                </span>
              ) : (
                <span>No schedule</span>
              )}
            </div>
            {campaign.sentDate && (
              <div className="flex items-center gap-1">
                <Send className="w-4 h-4" />
                <span>Sent: {formatDate(campaign.sentDate)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{campaign.sentCount.toLocaleString()}/{campaign.recipientCount.toLocaleString()} sent</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview?.(campaign.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(campaign.id)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          {campaign.status === 'draft' || campaign.status === 'paused' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus?.(campaign.id)}
              className="flex-1"
            >
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          ) : campaign.status === 'scheduled' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus?.(campaign.id)}
              className="flex-1"
            >
              <PauseCircle className="w-4 h-4 mr-1" />
              Pause
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(campaign.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};