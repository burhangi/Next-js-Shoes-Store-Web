'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/auth/authbutton'

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Auth Error:', error)
  }, [error])

  return (
    <AuthCard>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-secondary mb-2">
          Something went wrong
        </h2>
        
        <p className="text-text-secondary mb-6">
          We encountered an error while loading this authentication page.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-xs font-mono text-red-800 break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={reset}
            variant="primary"
            fullWidth
          >
            Try Again
          </Button>
          
          <Link href="/auth/login">
            <Button variant="outline" fullWidth>
              Back to Login
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="ghost" fullWidth>
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}
