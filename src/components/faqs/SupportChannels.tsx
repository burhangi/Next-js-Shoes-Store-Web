"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const channels = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our team",
    value: "Start Chatting Now",
    detail: "Avg. wait: < 2 mins",
    color: "from-green-50 to-emerald-50",
    iconColor: "text-green-600",
    borderColor: "border-green-100",
    action: "#chat",
    available: true
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with a specialist",
    value: "+1 (888) 123-4567",
    detail: "Mon-Fri, 9am - 6pm EST",
    color: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    action: "tel:+18881234567",
    available: true
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    value: "support@shoesstore.com",
    detail: "Response within 24h",
    color: "from-orange-50 to-amber-50",
    iconColor: "text-primary",
    borderColor: "border-orange-100",
    action: "mailto:support@shoesstore.com",
    available: true
  },
  {
    icon: Clock,
    title: "Help Center",
    description: "Browse self-service guides",
    value: "Explore Articles",
    detail: "100+ helpful resources",
    color: "from-purple-50 to-violet-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-100",
    action: "/help",
    available: true
  }
];

export const SupportChannels: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {channels.map((channel, index) => {
        const Icon = channel.icon;
        return (
          <motion.a
            key={channel.title}
            href={channel.action}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Availability Badge */}
            {channel.available && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 border border-green-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-green-700">Available</span>
                </div>
              </div>
            )}

            {/* Icon */}
            <div className={cn(
              "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
              channel.color
            )}>
              <Icon className={cn("w-6 h-6", channel.iconColor)} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
              {channel.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {channel.description}
            </p>

            {/* Value/CTA */}
            <div className="mb-3">
              <div className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">
                {channel.value}
              </div>
            </div>

            {/* Additional Detail */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">
                  {channel.detail}
                </span>
              </div>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
