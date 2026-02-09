export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-28">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-12 bg-[#E5E7EB] rounded w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-[#E5E7EB] rounded" />
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="aspect-square bg-[#E5E7EB] rounded-xl mb-4" />
                    <div className="h-4 bg-[#E5E7EB] rounded w-3/4 mb-2" />
                    <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}