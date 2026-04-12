"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bookSchema } from "@/lib/validations/book";
import { slugify } from "@/lib/utils";
import { uploadCover, deleteCover } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { BookWithGenre, GenreWithCount } from "@/types";

export type ActionState = { error?: string };

// ─── Queries públicas ──────────────────────────────────────────────────────

export async function getBooks(options?: {
  genreSlug?: string;
  search?: string;
}): Promise<BookWithGenre[]> {
  return prisma.book.findMany({
    where: {
      isPublished: true,
      ...(options?.genreSlug && {
        genre: { slug: options.genreSlug },
      }),
      ...(options?.search && {
        OR: [
          { title: { contains: options.search, mode: "insensitive" } },
          { author: { contains: options.search, mode: "insensitive" } },
        ],
      }),
    },
    include: { genre: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBookBySlug(
  slug: string
): Promise<BookWithGenre | null> {
  return prisma.book.findUnique({
    where: { slug, isPublished: true },
    include: { genre: true },
  });
}

export async function getGenres(): Promise<GenreWithCount[]> {
  return prisma.genre.findMany({
    include: { _count: { select: { books: { where: { isPublished: true } } } } },
    orderBy: { name: "asc" },
  });
}

// ─── Queries admin ─────────────────────────────────────────────────────────

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado.");
  return session;
}

export async function getAdminBooks(): Promise<BookWithGenre[]> {
  await requireAuth();
  return prisma.book.findMany({
    include: { genre: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBookById(id: string): Promise<BookWithGenre | null> {
  await requireAuth();
  return prisma.book.findUnique({
    where: { id },
    include: { genre: true },
  });
}

export async function getDashboardStats() {
  await requireAuth();
  const [totalBooks, publishedBooks, genres, totalWishlist] = await Promise.all([
    prisma.book.count(),
    prisma.book.count({ where: { isPublished: true } }),
    prisma.genre.findMany({
      include: { _count: { select: { books: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.wishlistItem.count(),
  ]);
  const totalPages = await prisma.book.aggregate({ _sum: { pages: true } });
  return {
    totalBooks,
    publishedBooks,
    draftBooks: totalBooks - publishedBooks,
    genres,
    totalWishlist,
    totalPages: totalPages._sum.pages ?? 0,
  };
}

// ─── Mutations ─────────────────────────────────────────────────────────────

export async function createBook(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const raw = {
    title: formData.get("title"),
    author: formData.get("author"),
    genreId: formData.get("genreId"),
    description: formData.get("description"),
    summary: formData.get("summary"),
    notes: formData.get("notes"),
    pages: formData.get("pages"),
    publisher: formData.get("publisher"),
    isbn: formData.get("isbn"),
    year: formData.get("year"),
    isPublished: formData.get("isPublished") === "true",
  };

  const parsed = bookSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const data = parsed.data;
  const slug = slugify(data.title);

  // Verificar slug duplicado
  const existing = await prisma.book.findUnique({ where: { slug } });
  if (existing) {
    return { error: "Já existe um livro com esse título. Altere o título." };
  }

  let coverUrl: string | undefined;
  let coverPublicId: string | undefined;

  const coverFile = formData.get("cover") as File | null;
  if (coverFile && coverFile.size > 0) {
    try {
      const result = await uploadCover(coverFile);
      coverUrl = result.url;
      coverPublicId = result.publicId;
    } catch {
      return { error: "Falha no upload da capa. Tente novamente." };
    }
  }

  await prisma.book.create({
    data: {
      title: data.title,
      slug,
      author: data.author,
      genreId: data.genreId,
      description: data.description || null,
      summary: data.summary || null,
      notes: data.notes || null,
      pages: data.pages ?? null,
      publisher: data.publisher || null,
      isbn: data.isbn || null,
      year: data.year ?? null,
      isPublished: data.isPublished,
      coverUrl,
      coverPublicId,
    },
  });

  revalidatePath("/admin/livros");
  revalidatePath("/");
  redirect("/admin/livros");
}

export async function updateBook(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const existing = await prisma.book.findUnique({ where: { id } });
  if (!existing) return { error: "Livro não encontrado." };

  const raw = {
    title: formData.get("title"),
    author: formData.get("author"),
    genreId: formData.get("genreId"),
    description: formData.get("description"),
    summary: formData.get("summary"),
    notes: formData.get("notes"),
    pages: formData.get("pages"),
    publisher: formData.get("publisher"),
    isbn: formData.get("isbn"),
    year: formData.get("year"),
    isPublished: formData.get("isPublished") === "true",
  };

  const parsed = bookSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const data = parsed.data;
  const newSlug = slugify(data.title);

  // Verificar slug duplicado (excluindo o próprio livro)
  if (newSlug !== existing.slug) {
    const slugConflict = await prisma.book.findUnique({ where: { slug: newSlug } });
    if (slugConflict) {
      return { error: "Já existe um livro com esse título. Altere o título." };
    }
  }

  let coverUrl = existing.coverUrl ?? undefined;
  let coverPublicId = existing.coverPublicId ?? undefined;

  const coverFile = formData.get("cover") as File | null;
  if (coverFile && coverFile.size > 0) {
    try {
      // Deletar capa antiga se existir
      if (existing.coverPublicId) await deleteCover(existing.coverPublicId);
      const result = await uploadCover(coverFile);
      coverUrl = result.url;
      coverPublicId = result.publicId;
    } catch {
      return { error: "Falha no upload da capa. Tente novamente." };
    }
  }

  await prisma.book.update({
    where: { id },
    data: {
      title: data.title,
      slug: newSlug,
      author: data.author,
      genreId: data.genreId,
      description: data.description || null,
      summary: data.summary || null,
      notes: data.notes || null,
      pages: data.pages ?? null,
      publisher: data.publisher || null,
      isbn: data.isbn || null,
      year: data.year ?? null,
      isPublished: data.isPublished,
      coverUrl,
      coverPublicId,
    },
  });

  revalidatePath("/admin/livros");
  revalidatePath(`/livros/${newSlug}`);
  revalidatePath("/");
  redirect("/admin/livros");
}

export async function deleteBook(id: string): Promise<ActionState> {
  await requireAuth();

  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return { error: "Livro não encontrado." };

  if (book.coverPublicId) {
    try {
      await deleteCover(book.coverPublicId);
    } catch {
      // não bloqueia a exclusão se o Cloudinary falhar
    }
  }

  await prisma.book.delete({ where: { id } });

  revalidatePath("/admin/livros");
  revalidatePath("/");
  return {};
}
