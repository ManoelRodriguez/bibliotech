import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getBookById, getGenres, updateBook } from "@/actions/books";
import { BookForm } from "@/components/books/book-form";

export const metadata = { title: "Editar livro" };

export default async function EditarLivroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [book, genres] = await Promise.all([getBookById(id), getGenres()]);

  if (!book) notFound();

  const updateBookWithId = updateBook.bind(null, id);

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
         
        >
          Editar livro
        </h1>
        <p className="text-ink-500 text-sm mt-1">{book.title}</p>
      </div>

      <div className="bg-white rounded-xl border border-parchment-200 p-6">
        <BookForm action={updateBookWithId} genres={genres} book={book} />
      </div>
    </div>
  );
}
