'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateBannerForm } from '@/components/admin/marketing/CreateBannerForm';
import Link from 'next/link';

export default function CreateBannerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/marketing/banners">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back to Banners
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Banner</h1>
          <p className="text-gray-600">Design and schedule a new marketing banner</p>
        </div>
      </div>

      {/* Preview Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">?</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Banner Preview</h3>
              <p className="text-sm text-gray-600">
                Your banner will appear here as you fill out the form
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <CreateBannerForm />
    </div>
  );
}