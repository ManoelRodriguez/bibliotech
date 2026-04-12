"use client";

import { useTransition, useState } from "react";
import { Pencil, Trash2, ExternalLink, Check, Loader2 } from "lucide-react";
import { toggleWishlistPurchased, deleteWishlistItem } from "@/actions/wishlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { WishlistItem } from "@prisma/client";

const priorityConfig = {
  HIGH: { label: "Alta", class: "bg-red-50 text-red-600" },
  MEDIUM: { label: "Média", class: "bg-amber-50 text-amber-600" },
  LOW: { label: "Baixa", class: "bg-parchment-100 text-parchment-600" },
};

interface WishlistCardProps {
  item: WishlistItem;
  onEdit: (item: WishlistItem) => void;
}

export function WishlistCard({ item, onEdit }: WishlistCardProps) {
  const [isPendingToggle, startToggle] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleToggle() {
    startToggle(async () => {
      const result = await toggleWishlistPurchased(item.id);
      if (result.error) toast.error(result.error);
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startDelete(async () => {
      const result = await deleteWishlistItem(item.id);
      if (result.error) toast.error(result.error);
      else toast.success("Item removido.");
    });
  }

  const priority = priorityConfig[item.priority];

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-parchment-200 p-4 flex flex-col gap-3 transition-opacity",
        item.purchased && "opacity-60"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-medium text-ink-900 leading-snug",
              item.purchased && "line-through text-ink-400"
            )}
          >
            {item.title}
          </p>
          {item.author && (
            <p className="text-xs text-ink-400 mt-0.5">{item.author}</p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
          {item.genre && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-100 text-ink-500">
              {item.genre}
            </span>
          )}
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", priority.class)}>
            {priority.label}
          </span>
        </div>
      </div>

      {/* Notas */}
      {item.notes && (
        <p className="text-xs text-ink-500 leading-relaxed line-clamp-2">{item.notes}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-parchment-100">
        {/* Toggle comprado */}
        <button
          onClick={handleToggle}
          disabled={isPendingToggle}
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium rounded-md px-3 py-2 transition min-w-[44px]",
            item.purchased
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : "bg-parchment-100 text-ink-500 hover:bg-parchment-200"
          )}
        >
          {isPendingToggle
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Check className="w-3.5 h-3.5" />
          }
          {item.purchased ? "Comprado" : "Marcar"}
        </button>

        {/* Ações */}
        <div className="flex items-center gap-1">
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-ink-400 hover:text-ink-700 hover:bg-parchment-100 rounded-lg transition"
              title="Abrir link"
            >
              <ExternalLink className="w-4.5 h-4.5" />
            </a>
          )}

          <button
            onClick={() => onEdit(item)}
            className="p-2.5 text-ink-400 hover:text-ink-700 hover:bg-parchment-100 rounded-lg transition"
            title="Editar"
          >
            <Pencil className="w-4.5 h-4.5" />
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
            title={confirmDelete ? "Clique para confirmar exclusão" : "Remover"}
          >
            {isPendingDelete
              ? <Loader2 className="w-4.5 h-4.5 animate-spin" />
              : <Trash2 className="w-4.5 h-4.5" />
            }
          </button>
        </div>
      </div>
    </div>
  );
}
