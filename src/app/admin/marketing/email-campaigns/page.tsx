'use client';

import React, { useState, useMemo } from 'react';
import { EmailCampaignCard } from '@/components/admin/marketing/EmailCampaignCard';
import { getEmailCampaigns, MarketingEmailCampaign, EmailCampaignStatus, EmailCampaignType } from '@/lib/data/marketing';
import { Plus, Search, Filter, Mail, Send, Clock, CheckCircle, FileText, Download, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function EmailCampaignsPage() {
  const [filters, setFilters] = useState({
    status: 'all' as EmailCampaignStatus | 'all',
    type: 'all' as EmailCampaignType | 'all',
    search: '',
  });

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  // Get filtered campaigns
  const campaigns = useMemo(() => {
    let filtered = getEmailCampaigns();
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === filters.status);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(campaign => campaign.type === filters.type);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchLower) ||
        campaign.description.toLowerCase().includes(searchLower) ||
        campaign.subject.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [filters]);

  const statusOptions: Array<{ value: EmailCampaignStatus | 'all'; label: string; icon: React.ElementType }> = [
    { value: 'all', label: 'All Status', icon: Mail },
    { value: 'draft', label: 'Draft', icon: FileText },
    { value: 'scheduled', label: 'Scheduled', icon: Clock },
    { value: 'sending', label: 'Sending', icon: Send },
    { value: 'sent', label: 'Sent', icon: CheckCircle },
    { value: 'paused', label: 'Paused', icon: Clock },
    { value: 'cancelled', label: 'Cancelled', icon: CheckCircle },
  ];

  const typeOptions: Array<{ value: EmailCampaignType | 'all'; label: string }> = [
    { value: 'all', label: 'All Types' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'abandoned_cart', label: 'Abandoned Cart' },
    { value: 'welcome', label: 'Welcome' },
    { value: 're_engagement', label: 'Re-engagement' },
  ];

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      type: 'all',
      search: '',
    });
    setSelectedCampaigns([]);
  };

  const handleSelectAll = () => {
    if (selectedCampaigns.length === campaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(campaigns.map(c => c.id));
    }
  };

  const handleCampaignAction = (action: 'send' | 'pause' | 'duplicate' | 'delete') => {
    if (selectedCampaigns.length === 0) return;
    
    const actionText = {
      send: 'send',
      pause: 'pause',
      duplicate: 'duplicate',
      delete: 'delete',
    }[action];
    
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedCampaigns.length} campaign(s)?`)) {
      console.log(`${actionText} campaigns:`, selectedCampaigns);
      setSelectedCampaigns([]);
    }
  };

  // Calculate metrics
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipientCount, 0);
  const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const averageOpenRate = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length 
    : 0;
  const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
          <p className="text-gray-600">Manage and track your email marketing campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin/marketing/email-campaigns/create">
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4" />
              Create Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* Campaign Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recipients</p>
                <p className="text-2xl font-bold text-gray-900">{totalRecipients.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">{totalSent.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Send className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">{averageOpenRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledCampaigns}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search campaigns by name, subject, or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('status', option.value)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5 ${
                        filters.status === option.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange('type', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.status !== 'all' || filters.type !== 'all' || filters.search) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {filters.status !== 'all' && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Status: {statusOptions.find(s => s.value === filters.status)?.label}
                    </Badge>
                  )}
                  {filters.type !== 'all' && (
                    <Badge variant="outline" className="bg-purple-100 text-purple-700">
                      Type: {typeOptions.find(t => t.value === filters.type)?.label}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCampaigns.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.length === campaigns.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedCampaigns.length} campaign{selectedCampaigns.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleCampaignAction('send')}
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Send Selected
                  </Button>
                  <Button
                    onClick={() => handleCampaignAction('pause')}
                    variant="outline"
                    size="sm"
                    className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Pause Selected
                  </Button>
                  <Button
                    onClick={() => handleCampaignAction('duplicate')}
                    variant="outline"
                    size="sm"
                  >
                    Duplicate Selected
                  </Button>
                  <Button
                    onClick={() => handleCampaignAction('delete')}
                    variant="destructive"
                    size="sm"
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSelectedCampaigns([])}
                variant="ghost"
                size="sm"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns List */}
      {campaigns.length > 0 ? (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <EmailCampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={() => console.log('Edit', campaign.id)}
              onDelete={() => {
                if (window.confirm('Delete this campaign?')) {
                  console.log('Delete', campaign.id);
                }
              }}
              onPreview={() => console.log('Preview', campaign.id)}
              onToggleStatus={() => console.log('Toggle status', campaign.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Mail className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-6">
              {filters.search 
                ? `No campaigns match "${filters.search}"`
                : 'No campaigns match the selected filters'
              }
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleClearFilters}
                variant="outline"
              >
                Clear filters
              </Button>
              <Link href="/admin/marketing/email-campaigns/create">
                <Button className="bg-primary hover:bg-primary-dark">
                  Create your first campaign
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Summary */}
      {campaigns.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
                <div className="text-sm text-gray-600">Total Campaigns</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {campaigns.filter(c => c.status === 'sent').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {campaigns.filter(c => c.status === 'scheduled').length}
                </div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {averageOpenRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Avg. Open Rate</div>
              </div>
            </div>
            
            {/* Campaign Types Distribution */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Campaign Types Distribution</h4>
              <div className="space-y-3">
                {typeOptions
                  .filter(option => option.value !== 'all')
                  .map((type) => {
                    const typeCount = campaigns.filter(c => c.type === type.value).length;
                    const percentage = campaigns.length > 0 ? (typeCount / campaigns.length) * 100 : 0;
                    
                    return (
                      <div key={type.value} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{type.label}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {typeCount} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}