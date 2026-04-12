import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { BookWithGenre } from "@/types";

interface BookCardProps {
  book: BookWithGenre;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/livros/${book.slug}`} className="group block">
      {/* Capa */}
      <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`Capa de ${book.title}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-parchment-200 flex flex-col items-center justify-center gap-2 p-4">
            <BookOpen className="w-8 h-8 text-parchment-500" />
            <p
              className="text-center text-xs font-medium text-parchment-700 line-clamp-3 leading-snug"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {book.title}
            </p>
          </div>
        )}

        {/* Gênero badge */}
        <div className="absolute bottom-2 left-2">
          <span className="inline-block px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-xs text-ink-600 font-medium">
            {book.genre.name}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-0.5">
        <h3
          className="text-sm font-semibold text-ink-900 line-clamp-2 leading-snug group-hover:text-leather-700 transition-colors"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {book.title}
        </h3>
        <p className="text-xs text-ink-400 line-clamp-1">{book.author}</p>
      </div>
    </Link>
  );
}
