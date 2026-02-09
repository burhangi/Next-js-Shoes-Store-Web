"use client";

import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStats } from '@/components/about/AboutStats';
import { AboutMission } from '@/components/about/AboutMission';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutTimeline } from '@/components/about/AboutTimeline';
import { AboutCertifications } from '@/components/about/AboutCertifications';
import { AboutTeam } from '@/components/about/AboutTeam';
import { AboutTestimonials } from '@/components/about/AboutTestimonials';
import { AboutCTA } from '@/components/about/AboutCTA';

export default function AboutPage() {
  return (
    <main className="bg-white overflow-x-hidden w-full">
      {/* Hero Section - The First Impression */}
      <AboutHero />

      {/* Stats Section - Social Proof & Credentials */}
      <AboutStats />

      {/* Mission & Heritage Section - Brand Story */}
      <AboutMission />

      {/* Core Values Section - Why Trust Us */}
      <AboutValues />

      {/* Timeline Section - Our Journey */}
      <AboutTimeline />

      {/* Certifications & Awards Section - Trust Indicators */}
      <AboutCertifications />

      {/* Team Section - The Faces Behind The Brand */}
      <AboutTeam />

      {/* Testimonials Section - Customer Stories */}
      <AboutTestimonials />

      {/* CTA Section - Final Engagement */}
      <AboutCTA />
    </main>
  );
}