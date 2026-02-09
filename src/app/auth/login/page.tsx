'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { InputField } from '@/components/auth/InputField'
import { Button } from '@/components/auth/authbutton'
import { AuthLink } from '@/components/auth/AuthLink'
import { SocialAuthButtons } from '@/components/auth/SocialAuthButton'
import { routes } from '@/lib/routes'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
      
      toast.success('Successfully signed in!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary">Welcome back</h2>
        <p className="text-text-secondary mt-2">
          Sign in to your account to continue
        </p>
      </div>

      <SocialAuthButtons />

      <AuthForm onSubmit={handleSubmit}>
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
          label="Password"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
              Remember me
            </label>
          </div>

          <AuthLink href={routes.auth.forgotPassword}>
            Forgot password?
          </AuthLink>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          fullWidth
        >
          Sign in
        </Button>

        <div className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <AuthLink href={routes.auth.register}>
            Sign up for free
          </AuthLink>
        </div>
      </AuthForm>
    </AuthCard>
  )
}