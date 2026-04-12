import type { Book, Genre } from "@prisma/client";

export type BookWithGenre = Book & { genre: Genre };

export type GenreWithCount = Genre & { _count: { books: number } };

// NextAuth type extensions
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

// JWT token type extension lives in next-auth module itself in v5 beta
// Extended via callbacks in src/lib/auth.ts
