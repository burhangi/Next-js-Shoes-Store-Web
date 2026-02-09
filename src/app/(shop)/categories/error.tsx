"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="h-7 w-7 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-secondary mb-2">Something went wrong!</h1>
        <p className="text-sm text-gray-600 mb-6">
          We encountered an error while loading the categories. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-gray-200 text-secondary rounded-lg font-bold text-sm hover:bg-gray-50 transition-all"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
