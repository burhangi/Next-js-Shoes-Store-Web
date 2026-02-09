'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { InputField } from '@/components/auth/InputField'
import { Button } from '@/components/auth/authbutton'
import { AuthLink } from '@/components/auth/AuthLink'
import { SocialAuthButtons } from '@/components/auth/SocialAuthButton'
import { validateEmail, validatePhoneNumber, sanitizeInput } from '@/lib/utils'
import { routes } from '@/lib/routes'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const sanitizedValue = type === 'checkbox' ? checked : sanitizeInput(value)
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: sanitizedValue 
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions'
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
      
      toast.success('Account created successfully! Please verify your email.')
      // Redirect to verify-email page with email parameter
      router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`)
    } catch (error) {
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary">Create your account</h2>
        <p className="text-text-secondary mt-2">
          Join thousands of satisfied customers
        </p>
      </div>

      <SocialAuthButtons />

      <AuthForm onSubmit={handleSubmit}>
        <InputField
          label="Full name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<User className="w-5 h-5" />}
          required
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail className="w-5 h-5" />}
            required
            disabled={isLoading}
          />

          <InputField
            label="Phone number (optional)"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            icon={<Phone className="w-5 h-5" />}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={<Lock className="w-5 h-5" />}
            showPasswordToggle
            showStrengthMeter
            required
            disabled={isLoading}
          />

          <InputField
            label="Confirm password"
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
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary mt-1"
            />
            <label htmlFor="acceptTerms" className="text-sm text-text-secondary">
              I agree to the{' '}
              <AuthLink href={routes.pages.terms} className="text-sm">
                Terms of Service
              </AuthLink>{' '}
              and{' '}
              <AuthLink href={routes.pages.privacy} className="text-sm">
                Privacy Policy
              </AuthLink>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-error">{errors.acceptTerms}</p>
          )}

          <div className="flex items-start space-x-2">
            <input
              id="acceptMarketing"
              name="acceptMarketing"
              type="checkbox"
              checked={formData.acceptMarketing}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary mt-1"
            />
            <label htmlFor="acceptMarketing" className="text-sm text-text-secondary">
              I want to receive marketing emails about new products, special offers, and other updates.
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          fullWidth
          className="mt-4"
        >
          Create account
        </Button>

        <div className="text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <AuthLink href={routes.auth.login}>
            Sign in here
          </AuthLink>
        </div>
      </AuthForm>

      <div className="mt-6 text-xs text-text-muted text-center">
        <p>Your data is protected with industry-standard encryption.</p>
        <p className="mt-1">By creating an account, you agree to receive promotional emails. You can unsubscribe at any time.</p>
      </div>
    </AuthCard>
  )
}