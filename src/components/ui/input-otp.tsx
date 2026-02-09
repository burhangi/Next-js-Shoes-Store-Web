// components/ui/input-otp.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  length?: number
  value: string
  onChange: (value: string) => void
  type?: "text" | "password"
  separator?: React.ReactNode
  autoFocus?: boolean
  disabled?: boolean
  error?: boolean
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({
    length = 6,
    value,
    onChange,
    type = "text",
    separator,
    autoFocus = true,
    disabled = false,
    error = false,
    className,
    ...props
  }, ref) => {
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

    const focusInput = (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    }

    const handleChange = (index: number, char: string) => {
      if (char.length > 1) {
        // Handle paste
        const chars = char.slice(0, length - index).split('')
        let newValue = value.split('')
        
        chars.forEach((c, i) => {
          const pos = index + i
          if (pos < length) {
            newValue[pos] = c
          }
        })
        
        const newValueStr = newValue.join('')
        onChange(newValueStr)
        
        // Focus last filled input
        const lastFilledIndex = Math.min(length - 1, index + chars.length)
        focusInput(lastFilledIndex)
      } else {
        // Handle single character
        const newValue = value.split('')
        newValue[index] = char
        const newValueStr = newValue.join('')
        onChange(newValueStr)
        
        if (char && index < length - 1) {
          focusInput(index + 1)
        }
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!value[index] && index > 0) {
          focusInput(index - 1)
        }
      } else if (e.key === 'ArrowLeft') {
        if (index > 0) {
          focusInput(index - 1)
        }
      } else if (e.key === 'ArrowRight') {
        if (index < length - 1) {
          focusInput(index + 1)
        }
      }
    }

    React.useEffect(() => {
      if (autoFocus) {
        focusInput(0)
      }
    }, [autoFocus])

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)}>
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <input
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type={type}
                maxLength={1}
                value={value[index] || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={disabled}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg border-2 text-center text-xl font-semibold",
                  "focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200",
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-primary-300",
                  disabled && "opacity-50 cursor-not-allowed",
                  value[index] && "border-accent-500"
                )}
                {...props}
              />
              
              {index === value.length && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-0.5 w-4 bg-primary-400 animate-pulse" />
                </motion.div>
              )}
            </motion.div>
            
            {separator && index < length - 1 && (
              <span className="text-primary-400">{separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

// OTP Verification Component
interface OTPVerificationProps {
  length?: number
  onComplete: (otp: string) => void
  loading?: boolean
  error?: string
  resendEnabled?: boolean
  onResend?: () => void
  countdown?: number
}

export const OTPVerification = ({
  length = 6,
  onComplete,
  loading = false,
  error,
  resendEnabled = true,
  onResend,
  countdown = 60,
}: OTPVerificationProps) => {
  const [otp, setOtp] = React.useState("")
  const [timeLeft, setTimeLeft] = React.useState(countdown)

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  React.useEffect(() => {
    if (otp.length === length) {
      onComplete(otp)
    }
  }, [otp, length, onComplete])

  const handleResend = () => {
    if (timeLeft === 0) {
      setTimeLeft(countdown)
      onResend?.()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-primary-900">
          Enter Verification Code
        </h3>
        <p className="mt-2 text-sm text-primary-600">
          We've sent a code to your email
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          length={length}
          value={otp}
          onChange={setOtp}
          disabled={loading}
          error={!!error}
        />
      </div>

      {error && (
        <p className="text-center text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="text-center">
        <p className="text-sm text-primary-600">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || !resendEnabled || loading}
            className={cn(
              "font-medium",
              timeLeft > 0 || !resendEnabled || loading
                ? "text-primary-400 cursor-not-allowed"
                : "text-accent-600 hover:text-accent-700"
            )}
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend Code"}
          </button>
        </p>
      </div>

      {loading && (
        <div className="text-center">
          <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-300 border-t-accent-600" />
          <p className="mt-2 text-sm text-primary-600">Verifying...</p>
        </div>
      )}
    </div>
  )
}

export { InputOTP }