"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { wishlistSchema } from "@/lib/validations/wishlist";
import { revalidatePath } from "next/cache";
import type { WishlistItem } from "@prisma/client";

export type WishlistActionState = { error?: string; success?: boolean };

const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 } as const;

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado.");
}

export async function getWishlistItems(): Promise<WishlistItem[]> {
  await requireAuth();
  const items = await prisma.wishlistItem.findMany();
  return items.sort((a, b) => {
    if (a.purchased !== b.purchased) return a.purchased ? 1 : -1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export async function createWishlistItem(
  prevState: WishlistActionState,
  formData: FormData
): Promise<WishlistActionState> {
  await requireAuth();

  const parsed = wishlistSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    notes: formData.get("notes"),
    priority: formData.get("priority"),
    link: formData.get("link"),
    purchased: formData.get("purchased") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.wishlistItem.create({
    data: {
      title: parsed.data.title,
      author: parsed.data.author || null,
      genre: parsed.data.genre || null,
      notes: parsed.data.notes || null,
      priority: parsed.data.priority,
      link: parsed.data.link || null,
      purchased: parsed.data.purchased,
    },
  });

  revalidatePath("/admin/wishlist");
  return { success: true };
}

export async function updateWishlistItem(
  id: string,
  prevState: WishlistActionState,
  formData: FormData
): Promise<WishlistActionState> {
  await requireAuth();

  const existing = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!existing) return { error: "Item não encontrado." };

  const parsed = wishlistSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    notes: formData.get("notes"),
    priority: formData.get("priority"),
    link: formData.get("link"),
    purchased: formData.get("purchased") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.wishlistItem.update({
    where: { id },
    data: {
      title: parsed.data.title,
      author: parsed.data.author || null,
      genre: parsed.data.genre || null,
      notes: parsed.data.notes || null,
      priority: parsed.data.priority,
      link: parsed.data.link || null,
      purchased: parsed.data.purchased,
    },
  });

  revalidatePath("/admin/wishlist");
  return { success: true };
}

export async function toggleWishlistPurchased(
  id: string
): Promise<WishlistActionState> {
  await requireAuth();

  const item = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!item) return { error: "Item não encontrado." };

  await prisma.wishlistItem.update({
    where: { id },
    data: { purchased: !item.purchased },
  });

  revalidatePath("/admin/wishlist");
  return {};
}

export async function deleteWishlistItem(
  id: string
): Promise<WishlistActionState> {
  await requireAuth();

  const item = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!item) return { error: "Item não encontrado." };

  await prisma.wishlistItem.delete({ where: { id } });

  revalidatePath("/admin/wishlist");
  return {};
}
