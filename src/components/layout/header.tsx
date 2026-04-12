import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-ink-900 rounded-md flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-semibold text-ink-900 tracking-tight">
            BiblioTech
          </span>
        </Link>

        <Link
          href="/login"
          className="text-xs font-medium text-ink-500 hover:text-ink-900 transition-colors"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
