'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Lock, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { InputField } from '@/components/auth/InputField'
import { Button } from '@/components/auth/authbutton'
import { AuthAlert } from '@/components/auth/AuthAlert'

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Validate token
    if (!token || token === 'invalid') {
      setIsValidToken(false)
      toast.error('Invalid or expired reset token')
    }
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      toast.success('Password reset successfully!')
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    } catch {
      toast.error('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidToken) {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Lock className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">
            Invalid Token
          </h2>
          <p className="text-text-secondary mb-6">
            This password reset link is invalid or has expired.
          </p>
          
          <AuthAlert
            type="error"
            title="Token Expired"
            message="Please request a new password reset link."
          />
          
          <div className="mt-6">
            <Button
              onClick={() => router.push('/auth/forgot-password')}
              variant="primary"
              fullWidth
            >
              Request new link
            </Button>
          </div>
        </div>
      </AuthCard>
    )
  }

  if (isSuccess) {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-text-secondary mb-6">
            Your password has been updated successfully. Redirecting to login...
          </p>
          
          <AuthAlert
            type="success"
            message="You can now sign in with your new password."
          />
          
          <div className="mt-6">
            <Button
              onClick={() => router.push('/auth/login')}
              variant="primary"
              fullWidth
            >
              Go to login
            </Button>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary">Reset password</h2>
        <p className="text-text-secondary mt-2">
          Create a new secure password for your account
        </p>
      </div>

      <AuthForm onSubmit={handleSubmit}>
        <InputField
          label="New password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<Lock className="w-5 h-5" />}
          showPasswordToggle
          required
          disabled={isLoading}
        />

        <InputField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<Lock className="w-5 h-5" />}
          showPasswordToggle
          required
          disabled={isLoading}
        />

        <div className="space-y-3">
          <div className="text-sm text-text-secondary">
            <p className="font-medium">Password requirements:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>At least 8 characters</li>
              <li>Uppercase and lowercase letters</li>
              <li>At least one number</li>
            </ul>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          fullWidth
        >
          Reset password
        </Button>
      </AuthForm>
    </AuthCard>
  )
}