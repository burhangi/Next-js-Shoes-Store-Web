// app/(shop)/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-12 bg-white">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">Page Not Found</h1>
        <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl font-bold hover:bg-[#E85A28] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/categories"
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Shop Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
