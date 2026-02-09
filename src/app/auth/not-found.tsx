// app/(auth)/not-found.tsx
import Link from 'next/link'
import { Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/auth/authbutton'

export default function AuthNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-white p-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20" />
            <div className="relative w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Page Not Found
          </h1>
          
          <p className="text-neutral-600 mb-8">
            The authentication page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link href="/auth/login">
              <Button variant="primary" fullWidth>
                Go to Login
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" fullWidth icon={<Home className="w-4 h-4" />}>
                Back to Homepage
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
            <p className="text-sm text-neutral-600">
              Need help? Check our{' '}
              <Link href="/help" className="text-primary font-semibold hover:underline">
                help center
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}