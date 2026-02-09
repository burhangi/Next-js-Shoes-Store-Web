"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CountdownTimerProps {
  endDate?: Date;
  showIcon?: boolean;
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'flash' | 'minimal';
  className?: string;
  onComplete?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate = new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
  showIcon = true,
  showLabel = true,
  variant = 'default',
  className,
  onComplete
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isComplete, setIsComplete] = useState(false);

  function calculateTimeLeft() {
    const difference = endDate.getTime() - Date.now();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalSeconds: difference / 1000
    };
  }

  useEffect(() => {
    if (timeLeft.totalSeconds <= 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft.totalSeconds, onComplete]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'bg-white/90 backdrop-blur-sm border border-primary-200 rounded-lg px-3 py-1.5';
      case 'flash':
        return 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-200 rounded-xl px-4 py-2 shadow-sm';
      case 'minimal':
        return 'bg-transparent';
      default:
        return 'bg-white/95 backdrop-blur-sm border border-primary-100 rounded-xl px-4 py-3 shadow-sm';
    }
  };

  const getTimeUnitClasses = (value: number, unit: string) => {
    if (variant === 'flash') {
      if (value <= 1 && unit === 'hours') {
        return 'bg-gradient-to-br from-red-500 to-red-600 text-white animate-pulse';
      }
      return 'bg-white text-primary-900';
    }
    
    if (variant === 'minimal') {
      return 'bg-primary-50 text-primary-900';
    }
    
    return 'bg-primary-900 text-white';
  };

  if (isComplete) {
    return (
      <div className={cn(
        "flex items-center gap-2 text-red-600 font-semibold",
        variant === 'minimal' ? "text-sm" : "px-4 py-2",
        className
      )}>
        <AlertTriangle className="h-4 w-4" />
        <span>Deal Ended</span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-1.5 text-sm", className)}>
        {showIcon && <Clock className="h-3 w-3 text-primary-500" />}
        <div className="flex items-center gap-1 font-mono">
          <span className="px-1.5 py-0.5 bg-primary-50 rounded text-primary-900 font-bold">
            {formatTime(timeLeft.hours)}
          </span>
          <span className="text-primary-400">:</span>
          <span className="px-1.5 py-0.5 bg-primary-50 rounded text-primary-900 font-bold">
            {formatTime(timeLeft.minutes)}
          </span>
          <span className="text-primary-400">:</span>
          <span className="px-1.5 py-0.5 bg-primary-50 rounded text-primary-900 font-bold">
            {formatTime(timeLeft.seconds)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("inline-flex items-center gap-3", getVariantClasses(), className)}
    >
      {/* Icon */}
      <div className={cn(
        "flex items-center justify-center rounded-full",
        variant === 'flash' 
          ? "w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white" 
          : "w-8 h-8 bg-primary-100 text-primary-600"
      )}>
        {variant === 'flash' ? (
          <Flame className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        {showLabel && (
          <span className={cn(
            "text-xs font-semibold",
            variant === 'flash' ? "text-red-600" : "text-primary-600"
          )}>
            {variant === 'flash' ? 'FLASH DEAL ENDS IN' : 'DEAL ENDS IN'}
          </span>
        )}

        {/* Time Units */}
        <div className="flex items-center gap-1.5">
          {timeLeft.days > 0 && (
            <>
              <div className="flex flex-col items-center">
                <div className={cn(
                  "px-2 py-1 rounded font-mono font-bold text-sm min-w-[2rem] text-center",
                  getTimeUnitClasses(timeLeft.days, 'days')
                )}>
                  {formatTime(timeLeft.days)}
                </div>
                <span className={cn(
                  "text-[10px] mt-0.5",
                  variant === 'flash' ? "text-red-600" : "text-primary-500"
                )}>
                  DAYS
                </span>
              </div>
              <span className={cn(
                "text-sm font-bold",
                variant === 'flash' ? "text-red-400" : "text-primary-300"
              )}>:</span>
            </>
          )}

          <div className="flex flex-col items-center">
            <div className={cn(
              "px-2 py-1 rounded font-mono font-bold text-sm min-w-[2rem] text-center",
              getTimeUnitClasses(timeLeft.hours, 'hours')
            )}>
              {formatTime(timeLeft.hours)}
            </div>
            <span className={cn(
              "text-[10px] mt-0.5",
              variant === 'flash' ? "text-red-600" : "text-primary-500"
            )}>
              HOURS
            </span>
          </div>

          <span className={cn(
            "text-sm font-bold",
            variant === 'flash' ? "text-red-400" : "text-primary-300"
          )}>:</span>

          <div className="flex flex-col items-center">
            <div className={cn(
              "px-2 py-1 rounded font-mono font-bold text-sm min-w-[2rem] text-center",
              getTimeUnitClasses(timeLeft.minutes, 'minutes')
            )}>
              {formatTime(timeLeft.minutes)}
            </div>
            <span className={cn(
              "text-[10px] mt-0.5",
              variant === 'flash' ? "text-red-600" : "text-primary-500"
            )}>
              MIN
            </span>
          </div>

          <span className={cn(
            "text-sm font-bold",
            variant === 'flash' ? "text-red-400" : "text-primary-300"
          )}>:</span>

          <div className="flex flex-col items-center">
            <div className={cn(
              "px-2 py-1 rounded font-mono font-bold text-sm min-w-[2rem] text-center",
              getTimeUnitClasses(timeLeft.seconds, 'seconds')
            )}>
              {formatTime(timeLeft.seconds)}
            </div>
            <span className={cn(
              "text-[10px] mt-0.5",
              variant === 'flash' ? "text-red-600" : "text-primary-500"
            )}>
              SEC
            </span>
          </div>
        </div>

        {/* Progress Bar for Flash variant */}
        {variant === 'flash' && timeLeft.totalSeconds > 0 && (
          <div className="mt-1">
            <div className="h-1 bg-red-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                initial={{ width: "100%" }}
                animate={{ 
                  width: `${(timeLeft.totalSeconds / (48 * 60 * 60)) * 100}%` 
                }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Warning for last hour */}
      {variant === 'flash' && timeLeft.hours === 0 && timeLeft.minutes < 60 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse"
        >
          LAST HOUR!
        </motion.div>
      )}
    </motion.div>
  );
};

// Export a simpler version for common use
export const SimpleCountdownTimer = ({ className }: { className?: string }) => (
  <CountdownTimer 
    variant="compact" 
    showLabel={false}
    className={className}
  />
);

// Export a flash deal specific version
export const FlashDealCountdown = ({ className }: { className?: string }) => (
  <CountdownTimer 
    variant="flash" 
    endDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // 24 hours
    className={className}
  />
);