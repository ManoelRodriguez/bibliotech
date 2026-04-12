"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { WishlistCard } from "./wishlist-card";
import { WishlistModal } from "./wishlist-modal";
import type { WishlistItem } from "@prisma/client";

interface WishlistClientProps {
  items: WishlistItem[];
}

export function WishlistClient({ items }: WishlistClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WishlistItem | undefined>();

  function openCreate() {
    setEditingItem(undefined);
    setModalOpen(true);
  }

  function openEdit(item: WishlistItem) {
    setEditingItem(item);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingItem(undefined);
  }

  const pending = items.filter((i) => !i.purchased);
  const purchased = items.filter((i) => i.purchased);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ink-900">Wishlist</h1>
          <p className="text-ink-500 text-sm mt-1">
            {pending.length} {pending.length === 1 ? "item pendente" : "itens pendentes"}
            {purchased.length > 0 && ` · ${purchased.length} comprado${purchased.length > 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-ink-900 hover:bg-ink-700 text-white text-sm font-medium rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Novo item
        </button>
      </div>

      {/* Lista vazia */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-parchment-200 text-center">
          <Star className="w-10 h-10 text-parchment-300 mb-3" />
          <p className="text-ink-500 text-sm">Sua wishlist está vazia.</p>
          <button
            onClick={openCreate}
            className="mt-4 text-sm text-ink-700 hover:text-ink-900 font-medium underline underline-offset-2"
          >
            Adicionar o primeiro item
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pendentes */}
          {pending.length > 0 && (
            <section>
              <h2 className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-3">
                Pendentes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {pending.map((item) => (
                  <WishlistCard key={item.id} item={item} onEdit={openEdit} />
                ))}
              </div>
            </section>
          )}

          {/* Comprados */}
          {purchased.length > 0 && (
            <section>
              <h2 className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-3">
                Comprados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {purchased.map((item) => (
                  <WishlistCard key={item.id} item={item} onEdit={openEdit} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <WishlistModal item={editingItem} onClose={closeModal} />
      )}
    </>
  );
}
