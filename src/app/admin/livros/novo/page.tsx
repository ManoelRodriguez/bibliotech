import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getGenres, createBook } from "@/actions/books";
import { BookForm } from "@/components/books/book-form";

export const metadata = { title: "Novo livro" };

export default async function NovoLivroPage() {
  const genres = await getGenres();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link
          href="/admin/livros"
          className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-ink-700 transition mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para livros
        </Link>
        <h1
          className="text-3xl font-semibold text-ink-900"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Novo livro
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-parchment-200 p-6">
        <BookForm action={createBook} genres={genres} />
      </div>
    </div>
  );
}
