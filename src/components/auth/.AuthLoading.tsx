export function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      <p className="text-text-secondary">Loading...</p>
    </div>
  )
}