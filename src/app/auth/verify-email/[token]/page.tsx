'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/auth/authbutton'
import { AuthAlert } from '@/components/auth/AuthAlert'

type VerificationStatus = 'loading' | 'success' | 'error' | 'invalid'

export default function VerifyEmailPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string
  
  const [status, setStatus] = useState<VerificationStatus>('loading')
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    verifyToken()
  }, [token])

  const verifyToken = async () => {
    if (!token || token === 'invalid') {
      setStatus('invalid')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo, assume token is valid
      setStatus('success')
      toast.success('Email verified successfully!')
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch {
      setStatus('error')
      toast.error('Verification failed')
    }
  }

  const handleResendEmail = async () => {
    setIsResending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Verification email sent!')
    } catch {
      toast.error('Failed to send email')
    } finally {
      setIsResending(false)
    }
  }

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-light mb-4">
              <Mail className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Verifying your email...
            </h2>
            <p className="text-text-secondary">
              Please wait while we verify your email address.
            </p>
            <div className="mt-8">
              <div className="animate-pulse space-y-3">
                <div className="h-2 bg-border rounded"></div>
                <div className="h-2 bg-border rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          </div>
        )

      case 'success':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Email Verified!
            </h2>
            <p className="text-text-secondary mb-6">
              Your email has been successfully verified. Redirecting to dashboard...
            </p>
            
            <AuthAlert
              type="success"
              message="You can now access all features of your account."
            />
            
            <div className="mt-6 space-y-3">
              <Button
                onClick={() => router.push('/dashboard')}
                variant="primary"
                fullWidth
              >
                Go to dashboard
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="ghost"
                fullWidth
              >
                Go to homepage
              </Button>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Verification Failed
            </h2>
            <p className="text-text-secondary mb-6">
              We encountered an error while verifying your email.
            </p>
            
            <AuthAlert
              type="error"
              message="Please try again or request a new verification email."
            />
            
            <div className="mt-6 space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="primary"
                loading={isResending}
                fullWidth
              >
                Resend verification email
              </Button>
              <Button
                onClick={() => router.push('/auth/login')}
                variant="outline"
                fullWidth
              >
                Back to login
              </Button>
            </div>
          </div>
        )

      case 'invalid':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Invalid Verification Link
            </h2>
            <p className="text-text-secondary mb-6">
              This verification link is invalid or has expired.
            </p>
            
            <AuthAlert
              type="warning"
              message="Please request a new verification email from your account settings."
            />
            
            <div className="mt-6 space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="primary"
                loading={isResending}
                fullWidth
              >
                Request new verification email
              </Button>
              <Button
                onClick={() => router.push('/auth/login')}
                variant="outline"
                fullWidth
              >
                Back to login
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <AuthCard>
      {renderContent()}
    </AuthCard>
  )
}