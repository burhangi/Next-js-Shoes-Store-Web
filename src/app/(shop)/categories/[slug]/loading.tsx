export default function CategoryDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="py-6 md:py-10">
            {/* Breadcrumb */}
            <div className="h-4 w-48 bg-white/10 rounded animate-pulse mb-6" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-white/10 rounded-full animate-pulse" />
                </div>
                <div className="h-10 w-64 bg-white/10 rounded-lg animate-pulse" />
                <div className="h-5 w-96 bg-white/10 rounded animate-pulse" />
                <div className="h-5 w-72 bg-white/10 rounded animate-pulse" />
                <div className="flex gap-3 pt-2">
                  <div className="h-10 w-36 bg-white/10 rounded-lg animate-pulse" />
                  <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
                </div>
                <div className="flex items-center gap-6 pt-6 border-t border-white/10 mt-4">
                  <div className="text-center space-y-1">
                    <div className="h-7 w-12 bg-white/10 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center space-y-1">
                    <div className="h-7 w-12 bg-white/10 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center space-y-1">
                    <div className="h-7 w-16 bg-white/10 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-[4/3] bg-white/10 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section Skeleton */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-9 w-52 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-3 md:p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
