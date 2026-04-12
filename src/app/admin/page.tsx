import { getDashboardStats } from "@/actions/books";
import { BookOpen, CheckCircle, FileEdit, Star, BookMarked } from "lucide-react";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-3xl font-semibold text-ink-900"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Dashboard
        </h1>
        <p className="text-ink-500 text-sm mt-1">Visão geral do acervo</p>
      </div>

      {/* Cards de stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Total de livros"
          value={stats.totalBooks}
          color="leather"
        />
        <StatCard
          icon={CheckCircle}
          label="Publicados"
          value={stats.publishedBooks}
          color="green"
        />
        <StatCard
          icon={FileEdit}
          label="Rascunhos"
          value={stats.draftBooks}
          color="parchment"
        />
        <StatCard
          icon={Star}
          label="Wishlist"
          value={stats.totalWishlist}
          color="gold"
        />
      </div>

      {stats.totalPages > 0 && (
        <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-xl border border-parchment-200">
          <BookMarked className="w-5 h-5 text-leather-600 shrink-0" />
          <p className="text-sm text-ink-700">
            Total de páginas no acervo:{" "}
            <span className="font-semibold text-ink-900">
              {stats.totalPages.toLocaleString("pt-BR")}
            </span>
          </p>
        </div>
      )}

      {/* Livros por gênero */}
      <div>
        <h2
          className="text-xl font-semibold text-ink-900 mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Livros por gênero
        </h2>
        <div className="bg-white rounded-xl border border-parchment-200 divide-y divide-parchment-100">
          {stats.genres.map((genre) => (
            <div key={genre.id} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-ink-700">{genre.name}</span>
              <span className="text-sm font-medium text-ink-900 bg-parchment-100 px-2.5 py-0.5 rounded-full">
                {genre._count.books}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "leather" | "green" | "parchment" | "gold";
}) {
  const colors = {
    leather: "bg-leather-50 text-leather-600",
    green: "bg-green-50 text-green-600",
    parchment: "bg-parchment-100 text-parchment-700",
    gold: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white rounded-xl border border-parchment-200 p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-ink-900">{value}</p>
        <p className="text-xs text-ink-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
