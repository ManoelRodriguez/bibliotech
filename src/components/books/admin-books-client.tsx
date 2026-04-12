"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { deleteBook } from "@/actions/books";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AdminBooksClientProps {
  bookId: string;
  bookTitle: string;
}

export function AdminBooksClient({ bookId, bookTitle }: AdminBooksClientProps) {
  const router = useRouter();
  const [isPendingEdit, startEdit] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleEdit() {
    startEdit(() => {
      router.push(`/admin/livros/${bookId}/editar`);
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startDelete(async () => {
      const result = await deleteBook(bookId);
      if (result.error) toast.error(result.error);
      else toast.success(`"${bookTitle}" removido.`);
      setConfirmDelete(false);
    });
  }

  return (
    <>
      <button
        onClick={handleEdit}
        disabled={isPendingEdit}
        className="p-2.5 text-ink-400 hover:text-ink-700 hover:bg-parchment-100 rounded-lg transition"
        title="Editar"
      >
        {isPendingEdit
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <Pencil className="w-4 h-4" />
        }
      </button>

      <button
        onClick={handleDelete}
        disabled={isPendingDelete}
        className={cn(
          "p-2.5 rounded-lg transition",
          confirmDelete
            ? "text-red-600 bg-red-50 hover:bg-red-100"
            : "text-ink-400 hover:text-red-500 hover:bg-red-50"
        )}
        title={confirmDelete ? "Clique para confirmar" : "Remover"}
      >
        {isPendingDelete
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <Trash2 className="w-4 h-4" />
        }
      </button>
    </>
  );
}
