import Link from 'next/link';
import { Layers, Home } from 'lucide-react';

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-3xl">👟</span>
        </div>
        <h1 className="text-2xl font-bold text-secondary mb-2">Category Not Found</h1>
        <p className="text-sm text-gray-600 mb-6">
          The category you are looking for doesn't exist or may have been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <Layers className="w-4 h-4" /> All Categories
          </Link>
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
