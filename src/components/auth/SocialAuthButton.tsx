'use client'

import { Button } from './authbutton'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaFacebook } from 'react-icons/fa'

interface SocialAuthButtonsProps {
  isLoading?: boolean
  onGoogleClick?: () => void
  onGithubClick?: () => void
  onFacebookClick?: () => void
}

export function SocialAuthButtons({
  isLoading = false,
  onGoogleClick,
  onGithubClick,
  onFacebookClick,
}: SocialAuthButtonsProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-text-muted">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {onGoogleClick && (
          <Button
            type="button"
            variant="outline"
            onClick={onGoogleClick}
            disabled={isLoading}
            className="flex-1"
          >
            <FcGoogle className="w-5 h-5" />
          </Button>
        )}
        
        {onGithubClick && (
          <Button
            type="button"
            variant="outline"
            onClick={onGithubClick}
            disabled={isLoading}
            className="flex-1"
          >
            <FaGithub className="w-5 h-5" />
          </Button>
        )}
        
        {onFacebookClick && (
          <Button
            type="button"
            variant="outline"
            onClick={onFacebookClick}
            disabled={isLoading}
            className="flex-1"
          >
            <FaFacebook className="w-5 h-5 text-[#1877F2]" />
          </Button>
        )}
      </div>
    </div>
  )
}