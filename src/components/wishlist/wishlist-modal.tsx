"use client";

import { useCallback } from "react";
import { X } from "lucide-react";
import { WishlistForm } from "./wishlist-form";
import { createWishlistItem, updateWishlistItem } from "@/actions/wishlist";
import type { WishlistItem } from "@prisma/client";

interface WishlistModalProps {
  item?: WishlistItem;
  onClose: () => void;
}

export function WishlistModal({ item, onClose }: WishlistModalProps) {
  const action = item
    ? updateWishlistItem.bind(null, item.id)
    : createWishlistItem;

  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-parchment-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-base font-semibold text-ink-900">
            {item ? "Editar item" : "Novo item na wishlist"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-300 hover:text-ink-700 transition rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <WishlistForm action={action} item={item} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
