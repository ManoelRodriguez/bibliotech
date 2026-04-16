import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const books = await prisma.book.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });

  const bookEntries: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/livros/${book.slug}`,
    lastModified: book.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...bookEntries,
  ];
}
