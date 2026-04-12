import { Suspense } from "react";
import { getBooks, getGenres } from "@/actions/books";
import { BookGrid } from "@/components/books/book-grid";
import { BookFilters } from "@/components/books/book-filters";
import { SearchBar } from "@/components/shared/search-bar";

export const metadata = {
  title: "BiblioTech — Catálogo",
  description: "Biblioteca virtual pessoal de livros teológicos.",
};

interface HomePageProps {
  searchParams: Promise<{ genre?: string; search?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { genre, search } = await searchParams;
  const [books, genres] = await Promise.all([
    getBooks({ genreSlug: genre, search }),
    getGenres(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero */}
      <section className="text-center py-10 space-y-3">
        <h1
          className="text-5xl sm:text-6xl font-semibold text-ink-900"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Acervo Teológico
        </h1>
        <p className="text-ink-500 text-base max-w-md mx-auto">
          Uma coleção curada de livros para estudo, devoção e referência.
        </p>
      </section>

      {/* Filtros e busca */}
      <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Suspense fallback={<div className="h-9 bg-parchment-100 rounded-full w-64 animate-pulse" />}>
          <BookFilters genres={genres} />
        </Suspense>
        <Suspense fallback={<div className="h-9 bg-parchment-100 rounded-lg w-64 animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </section>

      {/* Contagem */}
      <p className="text-xs text-ink-400">
        {books.length} {books.length === 1 ? "livro encontrado" : "livros encontrados"}
        {(genre || search) && " para os filtros aplicados"}
      </p>

      {/* Grid */}
      <BookGrid books={books} />
    </div>
  );
}
