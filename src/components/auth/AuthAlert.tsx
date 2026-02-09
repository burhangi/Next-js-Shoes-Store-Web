'use client'

import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface AuthAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  className?: string
}

export function AuthAlert({ 
  type = 'info', 
  title, 
  message, 
  className 
}: AuthAlertProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  }

  const Icon = icons[type]

  return (
    <div className={cn(
      'alert rounded-lg p-4',
      styles[type],
      className
    )}>
      <div className="flex items-start">
        <Icon className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
          type === 'success' ? 'text-green-500' :
          type === 'error' ? 'text-red-500' :
          type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
        }`} />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}