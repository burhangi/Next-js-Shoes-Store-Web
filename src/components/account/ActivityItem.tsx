// 📄 /components/account/ActivityItem.tsx
"use client";

import { cn } from '@/lib/utils';
import { 
  Package, 
  Star, 
  MapPin, 
  CreditCard, 
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

interface ActivityItemProps {
  id: string;
  type: 'order' | 'review' | 'address' | 'payment' | 'account';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  href: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

const typeIcons: Record<'order' | 'review' | 'address' | 'payment' | 'account', LucideIcon> = {
  order: Package,
  review: Star,
  address: MapPin,
  payment: CreditCard,
  account: User
};

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Completed'
  },
  pending: {
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    label: 'Pending'
  },
  failed: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Failed'
  }
} as const;

export const ActivityItem: React.FC<ActivityItemProps> = (props) => {
  const {
    type,
    title,
    description,
    timestamp,
    status,
    href,
    onClick,
    className,
    loading = false
  } = props;

  if (loading) {
    return (
      <div className={cn('flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200', className)}>
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    );
  }

  const TypeIcon = typeIcons[type];
  const StatusConfig = statusConfig[status];

  const handleClick = () => {
    if (onClick) onClick();
    else if (href && typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200',
        'hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer group',
        className
      )}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={cn(
          'p-3 rounded-xl border flex-shrink-0',
          StatusConfig.borderColor,
          StatusConfig.bgColor
        )}>
          <TypeIcon className={cn('h-5 w-5', StatusConfig.color)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 truncate">{title}</p>
            <span className={cn(
              'px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 flex-shrink-0',
              StatusConfig.bgColor,
              StatusConfig.color
            )}>
              <StatusConfig.icon className="h-3 w-3" />
              {StatusConfig.label}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">{description}</p>
        </div>
      </div>
      
      <div className="ml-4 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{timestamp}</span>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};