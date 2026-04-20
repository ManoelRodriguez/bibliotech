"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  function buildUrl(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else params.set("page", String(page));
    const q = params.toString();
    return q ? `${pathname}?${q}` : pathname;
  }

  // Gera os números de página a exibir com ellipsis
  function getPages(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
      pages.push(p);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  const btnBase = "flex items-center justify-center w-8 h-8 rounded-lg text-sm transition-colors";

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Anterior */}
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)} className={cn(btnBase, "text-ink-500 hover:bg-parchment-100 hover:text-ink-900")}>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className={cn(btnBase, "text-ink-300 cursor-not-allowed")}>
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {/* Números */}
      {getPages().map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className={cn(btnBase, "text-ink-300 cursor-default")}>…</span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p)}
            className={cn(
              btnBase,
              p === currentPage
                ? "bg-leather-600 text-white font-medium"
                : "text-ink-500 hover:bg-parchment-100 hover:text-ink-900"
            )}
          >
            {p}
          </Link>
        )
      )}

      {/* Próximo */}
      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)} className={cn(btnBase, "text-ink-500 hover:bg-parchment-100 hover:text-ink-900")}>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className={cn(btnBase, "text-ink-300 cursor-not-allowed")}>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
