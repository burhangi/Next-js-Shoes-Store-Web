// 📄 /components/account/StatCard.tsx
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatCardProps {
  id: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  href: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = (props) => {
  const {
    title,
    value,
    icon: Icon,
    color,
    bgColor,
    trend,
    href,
    onClick,
    className,
    loading = false
  } = props;

  const handleClick = () => {
    if (onClick) onClick();
    else if (href && typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  if (loading) {
    return (
      <div className={cn(
        'bg-white p-5 rounded-xl border border-gray-200 animate-pulse',
        className
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" />
          <div className="w-16 h-6 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={cn(
        'bg-white p-5 rounded-xl border border-gray-200 transition-all duration-300 cursor-pointer group',
        'hover:shadow-lg hover:border-primary/30',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-3 rounded-lg', bgColor)}>
          <Icon className={cn('h-6 w-6', color)} />
        </div>
        {trend && (
          <div className={cn(
            'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            trend.isPositive 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      
      <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={cn('h-full transition-all duration-500', bgColor)}
          style={{ width: '75%' }}
        />
      </div>
    </motion.div>
  );
};