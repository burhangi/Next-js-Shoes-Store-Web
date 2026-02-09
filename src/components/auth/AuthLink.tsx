'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface AuthLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function AuthLink({ href, children, className }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-primary hover:text-primary-dark font-medium transition-colors duration-200',
        className
      )}
    >
      {children}
    </Link>
  )
}