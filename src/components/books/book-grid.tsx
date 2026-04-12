import { BookCard } from "@/components/books/book-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { BookWithGenre } from "@/types";

interface BookGridProps {
  books: BookWithGenre[];
}

export function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
