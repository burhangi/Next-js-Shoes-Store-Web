"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export interface FAQSection {
  icon: any;
  title: string;
  links: Array<{ label: string; href: string }>;
}

interface ContactFAQProps {
  sections?: FAQSection[];
}

const defaultSections: FAQSection[] = [
  {
    icon: Truck,
    title: "Shipping & Delivery",
    links: [
      { label: "Track my order", href: "/track-order" },
      { label: "Shipping rates", href: "/shipping" },
      { label: "Delivery times", href: "/help" },
    ]
  },
  {
    icon: RefreshCw,
    title: "Returns & Refunds",
    links: [
      { label: "Start a return", href: "/returns" },
      { label: "Return policy", href: "/terms" },
      { label: "Check refund status", href: "/help" },
    ]
  },
  {
    icon: ShieldCheck,
    title: "Payments & Security",
    links: [
      { label: "Accepted payments", href: "/help" },
      { label: "Secure transactions", href: "/privacy" },
      { label: "Installment plans", href: "/help" },
    ]
  }
];

export const ContactFAQ: React.FC<ContactFAQProps> = ({ sections = defaultSections }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-[12px] font-black text-[#FF6B35] uppercase tracking-widest">Self-Service Help</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[32px] md:text-[48px] font-black text-[#1A1A1A] tracking-tighter"
          >
            Looking For Quick <span className="text-[#FF6B35]">Answers?</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-10 rounded-[40px] bg-[#F8FAFC] border border-gray-100 hover:border-[#FF6B35]/20 hover:bg-white transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-black text-[#1A1A1A] mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="flex items-center justify-between text-[14px] font-bold text-gray-500 hover:text-[#FF6B35] transition-colors group/link"
                      >
                        {link.label}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
