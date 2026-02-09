'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  format?: 'currency' | 'percentage' | 'number';
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  iconColor = '#FF6B35',
  iconBg = 'bg-[#FF6B35]/10',
  format = 'number',
  isLoading = false,
  onClick,
  className = '',
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      switch (format) {
        case 'currency':
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(val);
        case 'percentage':
          return `${val.toFixed(1)}%`;
        case 'number':
          return new Intl.NumberFormat('en-US').format(val);
      }
    }
    return val;
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-[#FF6B35]' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className={`p-3 rounded-lg ${iconBg}`}>
            <Icon className="w-6 h-6" style={{ color: iconColor }} />
          </div>
        )}
        
        {(change !== undefined && trend) && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {getTrendIcon()}
            <span>{change > 0 ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>

      <div className="mb-1">
        <h3 className="text-2xl font-bold text-gray-900">{formatValue(value)}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>

      {/* Additional context if needed */}
      {change !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>vs. previous period</span>
            <span className="font-medium">
              {trend === 'up' ? '↑ Improved' : '↓ Declined'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Extended version with more features
export const ExtendedMetricCard: React.FC<MetricCardProps & {
  subtitle?: string;
  target?: number;
  progress?: number;
  period?: string;
}> = ({
  title,
  value,
  subtitle,
  change,
  trend,
  icon: Icon,
  target,
  progress,
  period = 'vs. last period',
  ...props
}) => {
  return (
    <MetricCard
      title={title}
      value={value}
      change={change}
      trend={trend}
      icon={Icon}
      {...props}
    >
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
      
      {target !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Target: {new Intl.NumberFormat('en-US').format(target)}</span>
            <span>{((value as number) / target * 100).toFixed(1)}% of target</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full"
              style={{ width: `${Math.min((value as number) / target * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {progress !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {period && change !== undefined && (
        <div className="mt-2 text-xs text-gray-500">
          {period}: {change > 0 ? '+' : ''}{change}%
        </div>
      )}
    </MetricCard>
  );
};