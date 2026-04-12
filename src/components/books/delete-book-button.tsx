"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteBook } from "@/actions/books";
import { toast } from "sonner";

export function DeleteBookButton({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteBook(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`"${title}" removido com sucesso.`);
      }
      setOpen(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 text-ink-300 hover:text-red-500 transition-colors rounded"
        title="Remover livro"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            onClick={() => !isPending && setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3
              className="text-xl font-semibold text-ink-900 mb-2"
             
            >
              Remover livro?
            </h3>
            <p className="text-sm text-ink-500 mb-6">
              <span className="font-medium text-ink-700">&ldquo;{title}&rdquo;</span> será
              removido permanentemente do catálogo e da capa no Cloudinary.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Remover
              </button>
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-ink-500 hover:text-ink-900 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
