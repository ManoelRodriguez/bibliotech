import { z } from "zod";

const currentYear = new Date().getFullYear();

export const bookSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(200),
  author: z.string().min(1, "Autor obrigatório").max(200),
  genreId: z.string().min(1, "Gênero obrigatório"),
  description: z.string().max(2000).optional().or(z.literal("")),
  summary: z.string().max(5000).optional().or(z.literal("")),
  notes: z.string().max(5000).optional().or(z.literal("")),
  pages: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  publisher: z.string().max(200).optional().or(z.literal("")),
  isbn: z.string().max(20).optional().or(z.literal("")),
  year: z.coerce
    .number()
    .int()
    .min(100)
    .max(currentYear + 1)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  isPublished: z.boolean().default(true),
});

export type BookFormData = z.infer<typeof bookSchema>;
