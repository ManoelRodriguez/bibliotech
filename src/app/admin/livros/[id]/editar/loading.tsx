export default function EditarLivroLoading() {
  return (
    <div className="space-y-6 max-w-3xl animate-pulse">
      <div>
        <div className="h-4 w-32 bg-parchment-100 rounded mb-4" />
        <div className="h-8 w-36 bg-parchment-200 rounded-lg" />
        <div className="h-4 w-48 bg-parchment-100 rounded mt-2" />
      </div>
      <div className="bg-white rounded-xl border border-parchment-200 p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-20 bg-parchment-100 rounded" />
            <div className="h-9 w-full bg-parchment-50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
