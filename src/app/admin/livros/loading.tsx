export default function LivrosLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-24 bg-parchment-200 rounded-lg" />
          <div className="h-4 w-40 bg-parchment-100 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-parchment-200 rounded-lg" />
      </div>

      <div className="bg-white rounded-xl border border-parchment-200 divide-y divide-parchment-100">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <div className="w-8 h-12 bg-parchment-100 rounded shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-48 bg-parchment-100 rounded" />
              <div className="h-3 w-28 bg-parchment-50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
