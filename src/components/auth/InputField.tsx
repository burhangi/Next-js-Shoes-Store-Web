'use client'

import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn, checkPasswordStrength } from '@/lib/utils'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  showPasswordToggle?: boolean
  showStrengthMeter?: boolean
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    label, 
    error, 
    icon, 
    type,
    showPasswordToggle = false,
    showStrengthMeter = false,
    className,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [strength, setStrength] = useState<{
      score: number
      strength: 'weak' | 'medium' | 'strong'
    } | null>(null)
    
    const isPassword = type === 'password'
    const inputValue = value as string

    useEffect(() => {
      if (showStrengthMeter && isPassword && inputValue) {
        const result = checkPasswordStrength(inputValue)
        setStrength(result)
      } else if (!inputValue) {
        setStrength(null)
      }
    }, [inputValue, showStrengthMeter, isPassword])

    const strengthColors = {
      weak: 'bg-red-500',
      medium: 'bg-yellow-500',
      strong: 'bg-green-500'
    }

    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-text-primary">
              {label}
              {props.required && <span className="text-error ml-1">*</span>}
            </label>
            {strength && showStrengthMeter && (
              <span className={`text-xs font-medium ${
                strength.strength === 'strong' ? 'text-green-600' :
                strength.strength === 'medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {strength.strength.toUpperCase()}
              </span>
            )}
          </div>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'input-field',
              icon && 'pl-10',
              showPasswordToggle && isPassword && 'pr-10',
              error && 'input-error',
              className
            )}
            value={value}
            onChange={onChange}
            {...props}
          />
          
          {showPasswordToggle && isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        
        {showStrengthMeter && isPassword && inputValue && strength && (
          <div className="space-y-2">
            <div className="flex h-1 space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i <= strength.score ? strengthColors[strength.strength] : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center text-sm text-error">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
export { InputField }