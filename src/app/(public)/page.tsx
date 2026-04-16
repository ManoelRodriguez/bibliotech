import { Suspense } from "react";
import { getBooks, getGenres } from "@/actions/books";
import { BookGrid } from "@/components/books/book-grid";
import { BookFilters } from "@/components/books/book-filters";
import { SearchBar } from "@/components/shared/search-bar";

export const revalidate = 3600;

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
    getBooks(genre, search),
    getGenres(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Barra de filtros */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Suspense fallback={<div className="h-9 bg-parchment-100 rounded-lg w-44 animate-pulse" />}>
          <BookFilters genres={genres} />
        </Suspense>
        <Suspense fallback={<div className="h-9 bg-parchment-100 rounded-lg w-64 animate-pulse" />}>
          <SearchBar />
        </Suspense>
        <p className="text-xs text-ink-300 sm:ml-auto sm:self-center">
          {books.length} {books.length === 1 ? "livro" : "livros"}
          {(genre || search) && " encontrados"}
        </p>
      </div>

      {/* Grid */}
      <BookGrid books={books} animationKey={`${genre ?? ""}-${search ?? ""}`} />
    </div>
  );
}
