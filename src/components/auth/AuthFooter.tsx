// components/auth/AuthFooter.tsx - RESPONSIVE VERSION
import Link from 'next/link'

export function AuthFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white/50 border-t border-primary/10 backdrop-blur-sm mt-12">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-secondary">
              Stepper<span className="text-primary">Store</span>
            </span>
            <span className="hidden sm:inline text-xs text-text-muted ml-2">
              © {currentYear} All rights reserved
            </span>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-text-secondary">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/help"
              className="hover:text-primary transition-colors duration-200"
            >
              Help
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
          
          {/* Version */}
          <div className="text-xs text-text-muted">
            v1.0.0
          </div>
        </div>
        
        {/* Copyright on mobile */}
        <div className="sm:hidden text-center text-xs text-text-muted mt-4">
          © {currentYear} Stepper Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}