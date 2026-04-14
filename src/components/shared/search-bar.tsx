"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ref para sempre ter o searchParams mais recente sem criar dependência no callback
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  // updateSearch é estável — não muda quando searchParams muda externamente (ex: filtro de gênero)
  const updateSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname]
  );

  // useEffect só dispara quando o usuário digita (value muda), não quando gênero muda
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateSearch(value), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, updateSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por título ou autor…"
        className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-parchment-300 bg-white text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-transparent transition"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
