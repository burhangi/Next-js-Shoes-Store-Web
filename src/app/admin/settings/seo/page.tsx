// 📦 src/app/admin/settings/seo/page.tsx - Comprehensive SEO Dashboard
'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsCard } from '@/components/admin/settings/SettingsCard';
import { SettingsToggle } from '@/components/admin/settings/SettingsToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Globe, 
  Eye, 
  TrendingUp,
  BarChart3,
  FileText,
  Link as LinkIcon,
  Settings,
  Target,
  Zap
} from 'lucide-react';
import { defaultSettings } from '@/lib/data/settings';
import {
  SEODashboard,
  SEOKeywordTracker,
  SEOSiteAuditComponent,
  SEOContentAnalyzer
} from '@/components/admin/seo';
import {
  seoKeywords,
  seoContent,
  seoSiteAudits,
  seoBacklinks,
  seoPerformance
} from '@/lib/data/seo';
import { cn } from '@/lib/utils/cn';

export default function SEOSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings.seo);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('https://shoestore.com/product/sneakers');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('SEO settings saved successfully!');
    }, 1000);
  };

  const generateSitemap = () => {
    alert('Sitemap generated successfully!');
  };

  const handleRunAudit = () => {
    alert('Site audit started. This may take a few minutes...');
  };

  const handleExportReport = () => {
    alert('Exporting SEO report...');
  };

  const handleAddKeyword = (keyword: string) => {
    alert(`Adding keyword: ${keyword}`);
  };

  const handleAnalyzeContent = (url: string) => {
    alert(`Analyzing content at: ${url}`);
  };

  // Calculate dashboard stats
  const totalKeywords = seoKeywords.length;
  const avgPosition = seoKeywords.reduce((sum, k) => sum + k.position, 0) / totalKeywords;
  const totalBacklinks = seoBacklinks.length;
  const siteScore = 85; // Calculated score
  const totalPages = seoContent.length;
  const issuesCount = seoSiteAudits.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-7 h-7 text-primary" />
            SEO Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Complete SEO management and optimization for your store
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 h-auto p-1 bg-gray-100">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Keywords</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Audit</span>
          </TabsTrigger>
          <TabsTrigger value="backlinks" className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Backlinks</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          <SEODashboard
            totalKeywords={totalKeywords}
            avgPosition={avgPosition}
            totalBacklinks={totalBacklinks}
            siteScore={siteScore}
            totalPages={totalPages}
            issuesCount={issuesCount}
          />
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-6 mt-6">
          <SEOKeywordTracker
            keywords={seoKeywords}
            onAddKeyword={handleAddKeyword}
          />
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6 mt-6">
          <SEOContentAnalyzer
            content={seoContent}
            onAnalyze={handleAnalyzeContent}
          />
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6 mt-6">
          <SEOSiteAuditComponent
            audits={seoSiteAudits}
            onRunAudit={handleRunAudit}
            onExport={handleExportReport}
          />
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks" className="space-y-6 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Backlink Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Monitor your website's backlinks and domain authority</p>
              </div>
            </div>

            <div className="space-y-4">
              {seoBacklinks.map((backlink) => (
                <div
                  key={backlink.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="w-4 h-4 text-gray-400" />
                        <a
                          href={backlink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary-dark font-medium"
                        >
                          {backlink.domain}
                        </a>
                        <span className={cn(
                          "px-2 py-0.5 text-xs font-semibold rounded",
                          backlink.type === 'dofollow' 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        )}>
                          {backlink.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{backlink.url}</p>
                      <p className="text-xs text-gray-500">Anchor: "{backlink.anchorText}"</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">DA: {backlink.authority}</p>
                      <p className="text-xs text-gray-500">{new Date(backlink.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <SettingsCard title="Basic SEO" description="Configure basic SEO settings for your store">
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  value={settings.siteTitle}
                  onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                  placeholder="Your Store Name - Tagline"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Appears in browser tabs and search results
                </p>
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Meta Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  placeholder="Brief description of your store"
                  rows={3}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Appears in search results below the title (150-160 characters recommended)
                </p>
              </div>
              
              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                  placeholder="shoes, sneakers, footwear, fashion"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Comma-separated keywords relevant to your store
                </p>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Social Media & Open Graph" description="Configure social media sharing">
            <div className="space-y-4">
              <div>
                <Label htmlFor="ogImage">Open Graph Image URL</Label>
                <Input
                  id="ogImage"
                  value={settings.ogImage}
                  onChange={(e) => setSettings({...settings, ogImage: e.target.value})}
                  placeholder="/og-image.png"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Image displayed when your site is shared on social media (1200x630px recommended)
                </p>
              </div>
              
              <div>
                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                <Input
                  id="twitterHandle"
                  value={settings.twitterHandle}
                  onChange={(e) => setSettings({...settings, twitterHandle: e.target.value})}
                  placeholder="@yourstore"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your Twitter username (without @) for Twitter cards
                </p>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Search Engine Indexing" description="Control how search engines index your site">
            <div className="space-y-4">
              <div>
                <Label htmlFor="robotsTxt">robots.txt Content</Label>
                <Textarea
                  id="robotsTxt"
                  value={settings.robotsTxt}
                  onChange={(e) => setSettings({...settings, robotsTxt: e.target.value})}
                  rows={4}
                  className="mt-1 font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Instructions for search engine crawlers
                </p>
              </div>
              
              <SettingsToggle
                label="Enable Sitemap"
                description="Generate XML sitemap for search engines"
                checked={settings.sitemapEnabled}
                onCheckedChange={(checked) => setSettings({...settings, sitemapEnabled: checked})}
              />
              
              {settings.sitemapEnabled && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-800">Sitemap</h4>
                      <p className="text-sm text-blue-700">
                        Your sitemap is available at: https://shoestore.com/sitemap.xml
                      </p>
                    </div>
                    <Button
                      onClick={generateSitemap}
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      Regenerate Sitemap
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SettingsCard>

          <SettingsCard title="Analytics & Tracking" description="Configure analytics and tracking codes">
            <div className="space-y-4">
              <div>
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})}
                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                <Input
                  id="googleTagManagerId"
                  value={settings.googleTagManagerId}
                  onChange={(e) => setSettings({...settings, googleTagManagerId: e.target.value})}
                  placeholder="GTM-XXXXXXX"
                  className="mt-1"
                />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Search Preview" description="Preview how your site appears in search results">
            <div className="space-y-4">
              <div>
                <Label htmlFor="previewUrl">URL to Preview</Label>
                <Input
                  id="previewUrl"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Globe className="w-4 h-4" />
                    {previewUrl}
                  </div>
                  <h3 className="text-xl text-blue-600 font-medium">
                    {settings.siteTitle || 'Your Store Name'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {settings.siteDescription || 'Store description will appear here'}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    This is how your site might appear in search results
                  </div>
                </div>
              </div>
            </div>
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
