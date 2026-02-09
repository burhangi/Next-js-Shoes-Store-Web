import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { routes } from '@/lib/routes'

interface AuthHeaderProps {
  title?: string
  subtitle?: string
  showBackButton?: boolean
}

export function AuthHeader({ 
  title, 
  subtitle, 
  showBackButton = true 
}: AuthHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {showBackButton && (
              <Link
                href="/"
                className="flex items-center text-text-secondary hover:text-primary transition-colors duration-200 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Back to home</span>
              </Link>
            )}
          </div>
          
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-secondary hidden sm:inline">
                Store<span className="text-primary">.</span>
              </span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href={routes.auth.login}
              className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 hidden sm:inline"
            >
              Sign in
            </Link>
            <Link
              href={routes.auth.register}
              className="btn-primary text-sm py-2 px-4 hidden sm:inline-flex"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </div>
      
      {(title || subtitle) && (
        <div className="bg-gradient-to-r from-primary-light/20 to-transparent py-8">
          <div className="container-custom text-center">
            {title && (
              <h1 className="text-3xl font-bold text-secondary mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-text-secondary max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  )
}