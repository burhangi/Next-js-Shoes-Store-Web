'use client'

import { ReactNode, FormHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

export function AuthForm({ 
  children, 
  onSubmit, 
  className,
  ...props 
}: AuthFormProps) {
  return (
    <form 
      onSubmit={onSubmit} 
      className={cn('space-y-6', className)}
      {...props}
    >
      {children}
    </form>
  )
}