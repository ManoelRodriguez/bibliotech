"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { GenreWithCount } from "@/types";

interface BookFiltersProps {
  genres: GenreWithCount[];
}

export function BookFilters({ genres }: BookFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeGenre = searchParams.get("genre");

  function handleGenre(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("genre", slug);
    } else {
      params.delete("genre");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => handleGenre(null)}
        className={cn(
          "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
          !activeGenre
            ? "bg-leather-600 text-white"
            : "bg-parchment-100 text-ink-600 hover:bg-parchment-200"
        )}
      >
        Todos
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenre(genre.slug)}
          className={cn(
            "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
            activeGenre === genre.slug
              ? "bg-leather-600 text-white"
              : "bg-parchment-100 text-ink-600 hover:bg-parchment-200"
          )}
        >
          {genre.name}
          {genre._count.books > 0 && (
            <span className="ml-1.5 opacity-60 text-xs">{genre._count.books}</span>
          )}
        </button>
      ))}
    </div>
  );
}
