export default function AdminLoading() {
  return (
    <div className="flex min-h-screen bg-parchment-50">
      {/* Sidebar skeleton */}
      <aside className="w-56 min-h-screen bg-white border-r border-parchment-200 flex flex-col">
        <div className="px-5 py-5 border-b border-parchment-200">
          <div className="h-6 w-28 bg-parchment-200 rounded animate-pulse" />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 bg-parchment-100 rounded-lg animate-pulse" />
          ))}
        </nav>
      </aside>

      {/* Content skeleton */}
      <main className="flex-1 p-8 space-y-8">
        <div className="h-9 w-40 bg-parchment-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-parchment-200 p-5 h-24 animate-pulse" />
          ))}
        </div>
        <div className="bg-white rounded-xl border border-parchment-200 h-48 animate-pulse" />
      </main>
    </div>
  );
}
