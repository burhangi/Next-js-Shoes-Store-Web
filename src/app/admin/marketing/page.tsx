'use client';

import React, { useState } from 'react';
import { MarketingStats } from '@/components/admin/marketing/MarketingStats';
import { BannerCard } from '@/components/admin/marketing/BannerCard';
import { CouponCard } from '@/components/admin/marketing/CouponCard';
import { EmailCampaignCard } from '@/components/admin/marketing/EmailCampaignCard';
import { DiscountCard } from '@/components/admin/marketing/DiscountCard';
import { getBanners, getCoupons, getEmailCampaigns, getDiscounts } from '@/lib/data/marketing';
import { Plus, TrendingUp, BarChart3, Calendar, Mail, Image, Tag, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function MarketingPage() {
  // Get marketing data
  const banners = getBanners({ status: 'active' }).slice(0, 3);
  const coupons = getCoupons({ status: 'active' }).slice(0, 3);
  const emailCampaigns = getEmailCampaigns({ status: 'scheduled' }).slice(0, 3);
  const discounts = getDiscounts({ status: 'active' }).slice(0, 3);

  const marketingStats = {
    totalCampaigns: 25,
    activeCampaigns: 12,
    totalCoupons: 45,
    activeCoupons: 23,
    totalBanners: 18,
    activeBanners: 10,
    emailOpenRate: 24.5,
    couponRedemptionRate: 18.7,
  };

  const quickActions = [
    {
      title: 'Create Campaign',
      description: 'Launch a new email campaign',
      icon: Mail,
      color: 'bg-blue-100 text-blue-600',
      link: '/admin/marketing/email-campaigns/create',
    },
    {
      title: 'Generate Coupon',
      description: 'Create a discount coupon',
      icon: Tag,
      color: 'bg-green-100 text-green-600',
      link: '/admin/marketing/coupons/create',
    },
    {
      title: 'Design Banner',
      description: 'Create a marketing banner',
      icon: Image,
      color: 'bg-purple-100 text-purple-600',
      link: '/admin/marketing/banners/create',
    },
    {
      title: 'Schedule Sale',
      description: 'Plan a seasonal discount',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
      link: '/admin/marketing/discounts/create',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
          <p className="text-gray-600">Manage campaigns, promotions, and marketing assets</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <MarketingStats stats={marketingStats} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className="block"
              >
                <Card className="hover:shadow-md transition-all cursor-pointer border-gray-200 hover:border-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketing Sections */}
      <div className="space-y-8">
        {/* Active Banners */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Banners</h3>
              <p className="text-sm text-gray-600">Currently running marketing banners</p>
            </div>
            <Link
              href="/admin/marketing/banners"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all banners →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onEdit={() => console.log('Edit', banner.id)}
                onPreview={() => console.log('Preview', banner.id)}
              />
            ))}
          </div>
        </section>

        {/* Active Coupons */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Coupons</h3>
              <p className="text-sm text-gray-600">Currently available discount coupons</p>
            </div>
            <Link
              href="/admin/marketing/coupons"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all coupons →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onEdit={() => console.log('Edit', coupon.id)}
                onCopy={(code) => {
                  navigator.clipboard.writeText(code);
                  console.log('Copied:', code);
                }}
              />
            ))}
          </div>
        </section>

        {/* Scheduled Campaigns */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Scheduled Campaigns</h3>
              <p className="text-sm text-gray-600">Upcoming email campaigns</p>
            </div>
            <Link
              href="/admin/marketing/email-campaigns"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all campaigns →
            </Link>
          </div>
          <div className="space-y-4">
            {emailCampaigns.map((campaign) => (
              <EmailCampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={() => console.log('Edit', campaign.id)}
                onPreview={() => console.log('Preview', campaign.id)}
              />
            ))}
          </div>
        </section>

        {/* Active Discounts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Discounts</h3>
              <p className="text-sm text-gray-600">Currently running discount campaigns</p>
            </div>
            <Link
              href="/admin/marketing/discounts"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all discounts →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {discounts.map((discount) => (
              <DiscountCard
                key={discount.id}
                discount={discount}
                onEdit={() => console.log('Edit', discount.id)}
                onPreview={() => console.log('Preview', discount.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Boost Your Marketing Performance</h3>
            <p className="text-white/90">
              Monitor campaign metrics, optimize conversion rates, and drive more sales with our marketing tools.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button className="bg-white text-primary hover:bg-gray-100">
              <TrendingUp className="w-4 h-4 mr-2" />
              Optimize Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}