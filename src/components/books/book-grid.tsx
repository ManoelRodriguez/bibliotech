import { BookGridClient } from "@/components/books/book-grid-client";
import { EmptyState } from "@/components/shared/empty-state";
import type { BookWithGenre } from "@/types";

interface BookGridProps {
  books: BookWithGenre[];
  animationKey?: string;
}

export function BookGrid({ books, animationKey = "default" }: BookGridProps) {
  if (books.length === 0) {
    return <EmptyState />;
  }

  return <BookGridClient books={books} animationKey={animationKey} />;
}
