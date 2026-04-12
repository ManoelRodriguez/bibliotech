import { z } from "zod";

export const wishlistSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(200),
  author: z.string().max(200).optional().or(z.literal("")),
  genre: z.string().max(100).optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  link: z.string().url("URL inválida").optional().or(z.literal("")),
  purchased: z.boolean().default(false),
});

export type WishlistFormData = z.infer<typeof wishlistSchema>;
