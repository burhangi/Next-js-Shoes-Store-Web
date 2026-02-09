"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ContactMethod {
  icon: any;
  title: string;
  description: string;
  value: string;
  action: string;
  color: string;
}

interface ContactInfoProps {
  methods?: ContactMethod[];
}

const defaultMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Available Mon-Fri, 9am-6pm EST",
    value: "+1 (888) 123-4567",
    action: "tel:+18881234567",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Our team typically responds within 24h",
    value: "support@luxurystore.com",
    action: "mailto:support@luxurystore.com",
    color: "bg-orange-50 text-[#FF6B35]",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Fastest way to get help during hours",
    value: "Start a conversation",
    action: "#",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: MapPin,
    title: "Visit Our Flagship",
    description: "Experience the quality in person",
    value: "721 5th Ave, New York, NY 10022",
    action: "https://maps.google.com",
    color: "bg-purple-50 text-purple-600",
  }
];

export const ContactInfo: React.FC<ContactInfoProps> = ({ methods = defaultMethods }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-8 rounded-[32px] bg-white border border-gray-100 hover:border-[#FF6B35]/20 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300",
                  method.color
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-black text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {method.title}
                </h3>
                <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                  {method.description}
                </p>
                <div className="text-[15px] font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  {method.value}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
