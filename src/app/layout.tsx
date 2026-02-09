// 📄 /app/layout.tsx - FINAL COMPLETE
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { HeaderWrapper } from '@/components/layout/header/HeaderWrapper'
import { Footer } from '@/components/layout/footer/Footer'
import { CookieConsent } from '@/components/common/CookieConsent'
import { ChatWidget } from '@/components/common/ChatWidget'
import { BackToTop } from '@/components/common/BackToTop'
import { NotificationToast } from '@/components/common/NotificationToast'
import { NavigationProvider } from './context/NavigationContext'
import { AuthProvider } from '@/lib/providers/AuthProvider'
import { QueryProvider } from '@/lib/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxury Store - Premium Footwear Collection',
  description: 'Discover premium shoes from top brands. Running, casual, formal, and designer footwear for men and women.',
  keywords: ['shoes', 'footwear', 'luxury shoes', 'running shoes', 'sneakers', 'formal shoes'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luxurystore.com',
    title: 'Luxury Store - Premium Footwear',
    description: 'Premium footwear for every occasion',
    siteName: 'Luxury Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Store - Premium Footwear',
    description: 'Premium footwear for every occasion',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased overflow-x-hidden w-full`} suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <NavigationProvider>
              {/* Header - Conditionally rendered */}
              <HeaderWrapper />
              
              {/* Main Content */}
              <main className="min-h-screen overflow-x-hidden w-full">
                {children}
              </main>
              
              {/* Footer */}
              <Footer />
              
              {/* Additional Components */}
              <CookieConsent />
              <ChatWidget />
              <BackToTop />
              <NotificationToast />
            </NavigationProvider>
          </AuthProvider>
        </QueryProvider>
        
        {/* Mobile viewport fix */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Mobile viewport fix
              (function() {
                function updateViewport() {
                  const isMobile = window.innerWidth < 1024;
                  const meta = document.querySelector('meta[name="viewport"]');
                  
                  if (isMobile) {
                    document.documentElement.style.setProperty('--header-height', '56px');
                    if (meta) {
                      meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5');
                    }
                  } else {
                    document.documentElement.style.removeProperty('--header-height');
                    if (meta) {
                      meta.setAttribute('content', 'width=device-width, initial-scale=1');
                    }
                  }
                }
                
                // Run on load
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', updateViewport);
                } else {
                  updateViewport();
                }
                
                // Run on resize
                window.addEventListener('resize', updateViewport);
                
                // Run on orientation change
                window.addEventListener('orientationchange', updateViewport);
              })();
            `
          }}
        />
      </body>
    </html>
  )
}