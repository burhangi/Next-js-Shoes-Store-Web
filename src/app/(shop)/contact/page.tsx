"use client";

import React from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactFAQ } from '@/components/contact/ContactFAQ';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Standardized Enterprise Hero */}
      <PageHero
        title="Get in Touch With Our Specialists"
        subtitle="Contact Support"
        description="Have a question about our collections or need help with an order? Our dedicated team is here to provide exceptional service and guidance."
        icon={<Mail className="w-5 h-5 text-white" />}
        bgColor="bg-gradient-to-r from-blue-900 to-[#1A1A1A]" // Distinct professional blue-dark gradient
      />

      {/* Primary Contact Channels */}
      <ContactInfo />

      {/* Main Interaction Section */}
      <ContactForm />

      {/* Quick Help & FAQ Links */}
      <ContactFAQ />

      {/* Map/Location Section - Premium Style */}
      <section className="h-[400px] w-full relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.9718426!3d40.761043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f97bdbfda3%3A0x64e3c23e80c65532!2s721%205th%20Ave%2C%20New%20York%2C%20NY%2010022!5e0!3m2!1sen!2sus!4v1652391234567!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
      </section>
    </main>
  );
}

