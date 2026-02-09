// 📦 src/app/(shop)/reviews/loading.tsx
export default function ReviewsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-[#E85A28] py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse">
            <div className="h-16 bg-gray-200 rounded w-24 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2" />
            <div className="h-4 bg-gray-200 rounded w-40 mx-auto" />
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4" />
              <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="h-12 w-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
