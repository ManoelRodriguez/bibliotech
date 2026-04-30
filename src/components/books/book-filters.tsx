"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { GenreWithCount } from "@/types";

interface BookFiltersProps {
  genres: GenreWithCount[];
}

export function BookFilters({ genres }: BookFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Estado local para atualização imediata — não depende do servidor
  const [value, setValue] = useState(searchParams.get("genre") ?? "");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setValue(next); // atualiza o select na hora

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) {
        params.set("genre", next);
      } else {
        params.delete("genre");
      }
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="h-9 px-3 text-sm rounded-lg border border-parchment-200 bg-white text-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent transition cursor-pointer min-w-[180px]"
    >
      <option value="">Todos os gêneros</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.slug}>
          {genre.name} ({genre._count.books})
        </option>
      ))}
    </select>
  );
}
