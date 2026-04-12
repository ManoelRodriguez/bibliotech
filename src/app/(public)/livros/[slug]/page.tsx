import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBookBySlug } from "@/actions/books";
import { ChevronLeft, BookOpen, Calendar, Hash, AlignLeft, FileText } from "lucide-react";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Livro não encontrado" };

  return {
    title: book.title,
    description: book.description ?? `${book.title} — ${book.author}`,
    openGraph: {
      title: book.title,
      description: book.description ?? undefined,
      images: book.coverUrl ? [{ url: book.coverUrl }] : [],
    },
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Voltar */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-ink-700 transition mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar ao catálogo
      </Link>

      {/* Layout principal */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Capa */}
        <div className="shrink-0 flex justify-center md:justify-start">
          <div className="w-44 md:w-52">
            <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-xl">
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={`Capa de ${book.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-parchment-200 flex flex-col items-center justify-center gap-3 p-4">
                  <BookOpen className="w-10 h-10 text-parchment-500" />
                  <p
                    className="text-center text-sm text-parchment-700 leading-snug"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {book.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="flex-1 space-y-5">
          {/* Gênero */}
          <Link
            href={`/?genre=${book.genre.slug}`}
            className="inline-block px-3 py-1 bg-leather-50 text-leather-700 text-xs font-medium rounded-full hover:bg-leather-100 transition-colors"
          >
            {book.genre.name}
          </Link>

          <div>
            <h1
              className="text-4xl sm:text-5xl font-semibold text-ink-900 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {book.title}
            </h1>
            <p className="text-lg text-ink-500 mt-1">{book.author}</p>
          </div>

          {/* Metadados */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
            {book.pages && (
              <span className="flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-parchment-500" />
                {book.pages} páginas
              </span>
            )}
            {book.year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-parchment-500" />
                {book.year}
              </span>
            )}
            {book.publisher && (
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-parchment-500" />
                {book.publisher}
              </span>
            )}
            {book.isbn && (
              <span className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-parchment-500" />
                {book.isbn}
              </span>
            )}
          </div>

          {/* Descrição */}
          {book.description && (
            <div>
              <h2
                className="text-lg font-semibold text-ink-800 mb-2"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Sobre o livro
              </h2>
              <p className="text-sm text-ink-600 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Seções extras — full width */}
      <div className="mt-12 space-y-10 max-w-3xl">
        {book.summary && (
          <section>
            <h2
              className="text-2xl font-semibold text-ink-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Resumo
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed whitespace-pre-line">
              {book.summary}
            </p>
          </section>
        )}

        {book.notes && (
          <section>
            <h2
              className="text-2xl font-semibold text-ink-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Anotações pessoais
            </h2>
            <div className="relative bg-amber-50 border border-amber-200 rounded-xl p-6">
              {/* Linhas decorativas de caderno */}
              <div className="absolute left-10 top-0 bottom-0 w-px bg-amber-200" aria-hidden />
              <p
                className="relative text-sm text-ink-700 leading-loose whitespace-pre-line pl-6 italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {book.notes}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
