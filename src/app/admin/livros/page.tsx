import Link from "next/link";
import Image from "next/image";
import { getAdminBooks } from "@/actions/books";
import { DeleteBookButton } from "@/components/books/delete-book-button";
import { Plus, Pencil, BookOpen } from "lucide-react";

export const metadata = { title: "Livros" };

export default async function AdminLivrosPage() {
  const books = await getAdminBooks();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-semibold text-ink-900"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Livros
          </h1>
          <p className="text-ink-500 text-sm mt-1">
            {books.length} {books.length === 1 ? "livro" : "livros"} no acervo
          </p>
        </div>
        <Link
          href="/admin/livros/novo"
          className="flex items-center gap-2 px-4 py-2.5 bg-leather-600 hover:bg-leather-700 text-white text-sm font-medium rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Novo livro
        </Link>
      </div>

      {/* Tabela */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-parchment-200 text-center">
          <BookOpen className="w-10 h-10 text-parchment-400 mb-3" />
          <p className="text-ink-500 text-sm">Nenhum livro cadastrado ainda.</p>
          <Link
            href="/admin/livros/novo"
            className="mt-4 text-sm text-leather-600 hover:text-leather-700 font-medium"
          >
            Adicionar o primeiro livro
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-parchment-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-parchment-200 bg-parchment-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-ink-500 uppercase tracking-wide">
                  Livro
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-500 uppercase tracking-wide hidden md:table-cell">
                  Gênero
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-500 uppercase tracking-wide hidden lg:table-cell">
                  Ano
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-100">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-parchment-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {book.coverUrl ? (
                        <div className="relative w-8 h-12 rounded overflow-hidden shrink-0 shadow-sm">
                          <Image
                            src={book.coverUrl}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-12 rounded bg-parchment-200 flex items-center justify-center shrink-0">
                          <BookOpen className="w-3 h-3 text-parchment-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-ink-900 line-clamp-1">{book.title}</p>
                        <p className="text-ink-400 text-xs">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500 hidden md:table-cell">
                    {book.genre.name}
                  </td>
                  <td className="px-4 py-3 text-ink-500 hidden lg:table-cell">
                    {book.year ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        book.isPublished
                          ? "bg-green-50 text-green-700"
                          : "bg-parchment-100 text-parchment-700"
                      }`}
                    >
                      {book.isPublished ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Link
                        href={`/admin/livros/${book.id}/editar`}
                        className="p-1.5 text-ink-300 hover:text-leather-600 transition-colors rounded"
                        title="Editar livro"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteBookButton id={book.id} title={book.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
