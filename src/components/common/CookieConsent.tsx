// 📦src/components/common/CookieConsent.tsx - UPDATED
"use client";

import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CookieConsentProps {
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  companyName?: string;
  position?: 'bottom' | 'bottom-left' | 'bottom-right';
}

export function CookieConsent({
  privacyPolicyUrl = '/privacy-policy',
  cookiePolicyUrl = '/cookie-policy',
  companyName = 'Luxury Store',
  position = 'bottom'
}: CookieConsentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cookies, setCookies] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // localStorage might not be available
      console.error('Error accessing localStorage:', error);
    }
  }, [isMounted]);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setCookies(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setCookies(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(cookies));
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleToggleCookie = (type: keyof typeof cookies) => {
    if (type === 'necessary') return;
    setCookies(prev => ({ ...prev, [type]: !prev[type] }));
  };

  if (!isMounted || !isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className={cn(
        "fixed z-[60] bg-white border border-gray-200 rounded-xl shadow-2xl p-6 max-w-md mx-4",
        position === 'bottom' && "bottom-6 left-1/2 transform -translate-x-1/2",
        position === 'bottom-left' && "bottom-6 left-6",
        position === 'bottom-right' && "bottom-6 right-6"
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF6B35]/10 rounded-lg">
              <Cookie className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Cookie Preferences</h3>
              <p className="text-sm text-gray-600">{companyName} uses cookies</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition"
            aria-label="Close cookie consent"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        {!isSettingsOpen ? (
          <>
            <p className="text-gray-700 mb-6 text-sm">
              We use cookies to enhance your browsing experience, serve personalized ads or content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#E85A28] text-white rounded-lg font-medium hover:shadow-md transition-shadow"
              >
                Accept All
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Customize
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={handleAcceptNecessary}
                className="py-2 px-3 text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Accept Necessary Only
              </button>
              <div className="flex gap-4 text-sm">
                <a href={privacyPolicyUrl} className="text-[#FF6B35] hover:underline">
                  Privacy Policy
                </a>
                <a href={cookiePolicyUrl} className="text-[#FF6B35] hover:underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </>
        ) : (
          /* Cookie Settings */
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Manage Cookie Preferences</h4>
            
            <div className="space-y-3">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Necessary Cookies</p>
                  <p className="text-sm text-gray-600">Required for basic functionality</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={cookies.necessary}
                    disabled
                    className="w-4 h-4 text-[#FF6B35] bg-gray-100 border-gray-300 rounded"
                  />
                  <span className="absolute -top-6 right-0 text-xs bg-gray-800 text-white px-2 py-1 rounded">
                    Always On
                  </span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div>
                  <p className="font-medium text-gray-900">Analytics Cookies</p>
                  <p className="text-sm text-gray-600">Help us improve our website</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookies.analytics}
                    onChange={() => handleToggleCookie('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B35]"></div>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div>
                  <p className="font-medium text-gray-900">Marketing Cookies</p>
                  <p className="text-sm text-gray-600">Personalized ads and content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookies.marketing}
                    onChange={() => handleToggleCookie('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B35]"></div>
                </label>
              </div>

              {/* Preference Cookies */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div>
                  <p className="font-medium text-gray-900">Preference Cookies</p>
                  <p className="text-sm text-gray-600">Remember your settings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookies.preferences}
                    onChange={() => handleToggleCookie('preferences')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B35]"></div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={handleSaveSettings}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#E85A28] text-white rounded-lg font-medium hover:shadow-md"
              >
                Save Settings
              </button>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/20 z-[55]"
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
}