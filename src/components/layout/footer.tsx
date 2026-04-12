import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-parchment-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-leather-600 rounded flex items-center justify-center">
            <BookOpen className="w-3 h-3 text-white" />
          </div>
          <span
            className="text-lg font-semibold text-ink-900"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            BiblioTech
          </span>
        </Link>
        <p className="text-xs text-ink-300">
          Biblioteca virtual pessoal de livros teológicos
        </p>
      </div>
    </footer>
  );
}
