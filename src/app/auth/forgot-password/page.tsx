'use client'

import { useState } from 'react'
import { Mail, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { InputField } from '@/components/auth/InputField'
import { Button } from '@/components/auth/authbutton'
import { AuthAlert } from '@/components/auth/AuthAlert'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      toast.success('Reset instructions sent to your email!')
    } catch {
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">
            Check your email
          </h2>
          <p className="text-text-secondary mb-6">
            We've sent a password reset link to{' '}
            <span className="font-semibold text-primary">{email}</span>
          </p>
          
          <AuthAlert
            type="info"
            message="If you don't see the email, check your spam folder or try again."
          />
          
          <div className="mt-6 space-y-3">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              fullWidth
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try another email
            </Button>
            
            <Link href="/auth/login">
              <Button variant="ghost" fullWidth>
                Back to login
              </Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary">Forgot password</h2>
        <p className="text-text-secondary mt-2">
          Enter your email to receive reset instructions
        </p>
      </div>

      <AuthForm onSubmit={handleSubmit}>
        <InputField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          icon={<Mail className="w-5 h-5" />}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          fullWidth
        >
          Send reset link
        </Button>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </Link>
        </div>
      </AuthForm>
    </AuthCard>
  )
}