'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, CheckCircle, RefreshCw, ArrowRight, Clock, Shield, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/auth/authbutton'
import { AuthAlert } from '@/components/auth/AuthAlert'
import { cn } from '@/lib/utils/cn'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'
  
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [emailSent, setEmailSent] = useState(true)

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleResendEmail = async () => {
    setIsResending(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Verification email sent successfully!')
      setEmailSent(true)
      setCountdown(60)
      setCanResend(false)
    } catch {
      toast.error('Failed to send email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const handleCheckInbox = () => {
    // Open default email client
    window.location.href = 'mailto:'
  }

  return (
    <AuthCard>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-6"
        >
          <div className="relative">
            {/* Animated rings */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.3, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-primary/20"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-primary/10"
              style={{ left: '-16px', top: '-16px' }}
            />
            
            {/* Mail icon */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg">
              <Mail className="h-12 w-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          Check Your Email
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 mb-3">
            We've sent a verification link to
          </p>
          <p className="text-lg font-semibold text-primary mb-4">
            {email}
          </p>
          <p className="text-sm text-gray-500">
            Click the link in the email to verify your account and get started.
          </p>
        </motion.div>

        {/* Success Alert */}
        {emailSent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AuthAlert
              type="success"
              message="Verification email sent successfully! Please check your inbox and spam folder."
            />
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="my-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            What to do next
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Check your inbox</p>
                <p className="text-sm text-gray-600">Look for an email from us with the subject "Verify your email address"</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Click the verification link</p>
                <p className="text-sm text-gray-600">The link will verify your email and activate your account</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Start shopping!</p>
                <p className="text-sm text-gray-600">Once verified, you'll have full access to your account</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            onClick={handleCheckInbox}
            variant="primary"
            fullWidth
            className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Open Email App
          </Button>

          <div className="relative">
            <Button
              onClick={handleResendEmail}
              variant="outline"
              fullWidth
              loading={isResending}
              disabled={!canResend || isResending}
              className={cn(
                "transition-all duration-300",
                !canResend && "opacity-60 cursor-not-allowed"
              )}
            >
              <RefreshCw className={cn("w-5 h-5 mr-2", isResending && "animate-spin")} />
              {canResend ? 'Resend Verification Email' : `Resend in ${countdown}s`}
            </Button>
          </div>

          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            fullWidth
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Homepage
          </Button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Didn't receive the email?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Wait a few minutes</p>
                <p className="text-xs text-gray-600">It may take up to 5 minutes to arrive</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Check spam folder</p>
                <p className="text-xs text-gray-600">Sometimes emails end up there</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Verify email address</p>
                <p className="text-xs text-gray-600">Make sure you entered it correctly</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-600" />
            <p>
              Your data is protected with industry-standard encryption
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AuthCard>
  )
}
