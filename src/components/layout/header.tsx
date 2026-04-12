import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-leather-600 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-2xl font-semibold text-ink-900 group-hover:text-leather-600 transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            BiblioTech
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-ink-500 hover:text-ink-900 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-leather-600 hover:text-leather-700 transition-colors"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
