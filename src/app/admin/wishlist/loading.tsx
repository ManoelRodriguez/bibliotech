export default function WishlistLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-28 bg-parchment-200 rounded-lg" />
          <div className="h-4 w-36 bg-parchment-100 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-parchment-200 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-parchment-200 p-5 h-28"
          />
        ))}
      </div>
    </div>
  );
}
