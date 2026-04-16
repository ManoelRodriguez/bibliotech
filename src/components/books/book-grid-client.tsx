"use client";

import { motion } from "framer-motion";
import { BookCard } from "./book-card";
import type { BookWithGenre } from "@/types";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

interface BookGridClientProps {
  books: BookWithGenre[];
  animationKey: string;
}

export function BookGridClient({ books, animationKey }: BookGridClientProps) {
  return (
    <motion.div
      key={animationKey}
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8"
    >
      {books.map((book) => (
        <motion.div key={book.id} variants={item}>
          <BookCard book={book} />
        </motion.div>
      ))}
    </motion.div>
  );
}
