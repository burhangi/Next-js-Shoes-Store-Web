// components/auth/AuthCard.tsx - CORRECTED
'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Footprints, Sparkles } from 'lucide-react'

interface AuthCardProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  showIcon?: boolean
  variant?: 'default' | 'premium'
}

export function AuthCard({ 
  children, 
  className,
  title,
  subtitle,
  showIcon = true,
  variant = 'default'
}: AuthCardProps) {
  const variants = {
    default: 'card',
    premium: 'card-premium'
  }

  return (
    <div className={cn(
      'relative',
      'animate-in fade-in duration-500',
      variant === 'premium' && 'pulse-glow'
    )}>
      {/* Shimmer Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 shimmer" />
      </div>
      
      <div className={cn(
        variants[variant],
        'backdrop-blur-sm',
        'hover-lift-3d',
        className
      )}>
        {/* Premium Badge */}
        {variant === 'premium' && (
          <div className="absolute -top-3 -right-3 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur" />
              <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        )}
        
        {/* Header */}
        {title && (
          <div className="relative text-center mb-8">
            {showIcon && (
              <div className="mb-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-lg opacity-30" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg">
                    <Footprints className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            )}
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-text-secondary max-w-md mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          'relative',
          !title && 'mt-2'
        )}>
          {children}
        </div>
        
        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </div>
  )
}