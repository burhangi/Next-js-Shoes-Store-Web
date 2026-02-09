import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📦',
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-50 mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold text-primary-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-primary-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="accent">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};