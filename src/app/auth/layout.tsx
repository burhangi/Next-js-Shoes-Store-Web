// app/(auth)/layout.tsx - FIXED STICKY HEADER
"use client"

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Truck, Package, Sparkles } from 'lucide-react'
import { AuthFooter } from '@/components/auth/AuthFooter'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const storeFeatures = [
    {
      icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Free Shipping",
      description: "On orders over $100"
    },
    {
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Secure Payment",
      description: "256-bit encryption"
    },
    {
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Premium Quality",
      description: "Authentic products"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-primary-lighter overflow-x-hidden">
      {/* Simple Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-accent/10 to-accent/5 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header - ALWAYS VISIBLE ON SCROLL */}
      <header className="relative z-40 border-b border-primary/10 bg-white/95 backdrop-blur-md sticky top-0 w-full">
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 mx-auto max-w-7xl">
            
            {/* Back Button - Always visible */}
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors flex-shrink-0 z-50"
            >
              <ArrowLeft className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-sm font-medium text-secondary sm:hidden">Back</span>
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-secondary whitespace-nowrap">Back to store</span>
                <div className="text-xs text-text-muted whitespace-nowrap">Continue shopping</div>
              </div>
            </Link>

            {/* Logo - Always centered and visible */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-50">
              <Link href="/" className="flex items-center gap-2">
                {/* Show only LS logo on mobile */}
                <div className="sm:hidden">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-sm">
                    <div className="text-xs font-bold text-white">LS</div>
                  </div>
                </div>
                
                {/* Show full logo on desktop */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-sm">
                    <div className="text-sm font-bold text-white">LS</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-secondary">
                      LUXURY<span className="text-primary">STORE</span>
                    </div>
                    <div className="text-xs text-text-muted">SHOES</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Features - Always visible on desktop */}
            <div className="hidden lg:flex items-center gap-4 z-50">
              {storeFeatures.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-secondary whitespace-nowrap">{feature.title}</div>
                    <div className="text-xs text-text-muted whitespace-nowrap">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty div for mobile spacing - matches back button width */}
            <div className="lg:hidden w-12 flex-shrink-0 z-50"></div>
          </div>
        </div>
      </header>

      {/* Main Content - Added extra top padding to account for sticky header */}
      <main className="relative z-10 pt-4 pb-4 sm:pt-6 sm:pb-6 md:pt-8 md:pb-8 lg:pt-10 lg:pb-10 w-full">
        <div className="w-full px-4 sm:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-between gap-6 sm:gap-8 mx-auto max-w-7xl">
            
            {/* Left Side - Showcase (Desktop only) */}
            <div className="hidden lg:block lg:w-1/2 max-w-md">
              <div className="space-y-6 sm:space-y-8">
                {/* Hero Section */}
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
                    Step Into
                    <span className="block text-gradient-primary mt-2">
                      Luxury
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
                    Discover premium footwear collection. Where style meets comfort in every step.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md">
                  {storeFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="card-light p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-secondary text-sm sm:text-base truncate">
                            {feature.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-text-muted mt-1 break-words">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-secondary text-white rounded-xl p-4 sm:p-6 max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <div className="text-lg">⭐</div>
                    </div>
                    <div>
                      <div className="font-bold text-xl sm:text-2xl">4.8/5</div>
                      <div className="text-xs sm:text-sm text-gray-300">Customer Rating</div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-200 italic">
                    "Exceptional quality and service. Truly premium experience."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <div className="card-premium w-full">
                {/* Form Header */}
                <div className="text-center px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm flex-shrink-0">
                    <div className="text-lg sm:text-xl font-bold text-white">LS</div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-2">
                    LUXURY STORE
                  </h2>
                  <div className="w-12 h-0.5 sm:w-16 bg-gradient-to-r from-primary to-accent mx-auto mb-3"></div>
                  <p className="text-sm sm:text-base text-text-secondary">
                    Welcome to Luxury Shoes
                  </p>
                </div>
                
                {/* Auth Content */}
                <div className="px-4 sm:px-6 pb-6 sm:pb-8 w-full">
                  {children}
                </div>
                
                {/* Footer */}
                <div className="px-4 sm:px-6 py-4 border-t border-primary/10 bg-white/50 w-full">
                  <div className="text-center text-xs text-text-muted space-y-1">
                    <p className="break-words">By continuing, you agree to our Terms & Privacy Policy</p>
                    <p>© {new Date().getFullYear()} Luxury Store</p>
                  </div>
                </div>
              </div>

              {/* Mobile Features */}
              <div className="lg:hidden mt-6 sm:mt-8 w-full">
                <h3 className="text-lg font-semibold text-secondary text-center mb-4">
                  Why Luxury Store
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {storeFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white rounded-lg border border-primary/10 w-full"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-medium text-secondary truncate">{feature.title}</h4>
                          <p className="text-xs text-text-muted mt-0.5 break-words">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 bg-white py-4 sm:py-6 mt-6 sm:mt-8 w-full">
        <div className="w-full px-4 sm:px-6 mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto max-w-7xl">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center flex-shrink-0">
                  <div className="text-xs font-bold text-white">LS</div>
                </div>
                <span className="text-sm font-bold text-secondary whitespace-nowrap">LUXURY STORE</span>
              </div>
              <p className="text-xs text-text-muted whitespace-nowrap">Premium footwear collection</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {storeFeatures.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-secondary whitespace-nowrap">{feature.title}</div>
                    <div className="text-xs text-text-muted hidden sm:block whitespace-nowrap">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}