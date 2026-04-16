export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Título */}
      <div>
        <div className="h-8 w-36 bg-parchment-200 rounded-lg" />
        <div className="h-4 w-48 bg-parchment-100 rounded mt-2" />
      </div>

      {/* Cards de stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-parchment-200 p-5 h-20"
          />
        ))}
      </div>

      {/* Bloco */}
      <div className="bg-white rounded-xl border border-parchment-200 h-14" />

      {/* Lista */}
      <div className="bg-white rounded-xl border border-parchment-200 divide-y divide-parchment-100">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 px-5 flex items-center">
            <div className="h-4 w-32 bg-parchment-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
