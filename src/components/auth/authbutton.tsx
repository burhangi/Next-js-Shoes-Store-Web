// components/auth/authbutton.tsx - UPDATED
'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    className,
    disabled,
    ...props 
  }, ref) => {
    
    const variantClasses = {
      primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg',
      outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10',
      ghost: 'text-text-secondary hover:text-primary hover:bg-gray-50',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md'
    }

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl'
    }

    return (
      <button
        ref={ref}
        className={cn(
          'font-semibold',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          loading && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'