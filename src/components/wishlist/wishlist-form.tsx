"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WishlistActionState } from "@/actions/wishlist";
import type { WishlistItem } from "@prisma/client";

interface WishlistFormProps {
  action: (
    prevState: WishlistActionState,
    formData: FormData
  ) => Promise<WishlistActionState>;
  item?: WishlistItem;
  onSuccess: () => void;
}

const inputClass =
  "w-full px-3 py-2 text-sm rounded-lg border border-parchment-200 bg-parchment-50 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent transition";

const priorityLabels = { HIGH: "Alta", MEDIUM: "Média", LOW: "Baixa" };

export function WishlistForm({ action, item, onSuccess }: WishlistFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          type="text"
          defaultValue={item?.title}
          required
          maxLength={200}
          placeholder="Ex: Institutos da Religião Cristã"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">Autor</label>
          <input
            name="author"
            type="text"
            defaultValue={item?.author ?? ""}
            maxLength={200}
            placeholder="João Calvino"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">Gênero</label>
          <input
            name="genre"
            type="text"
            defaultValue={item?.genre ?? ""}
            maxLength={100}
            placeholder="Teologia Sistemática"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">Prioridade</label>
          <select
            name="priority"
            defaultValue={item?.priority ?? "MEDIUM"}
            className={cn(inputClass, "cursor-pointer")}
          >
            {(["HIGH", "MEDIUM", "LOW"] as const).map((p) => (
              <option key={p} value={p}>
                {priorityLabels[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">Link</label>
          <input
            name="link"
            type="url"
            defaultValue={item?.link ?? ""}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Anotações</label>
        <textarea
          name="notes"
          defaultValue={item?.notes ?? ""}
          rows={3}
          maxLength={2000}
          placeholder="Por que quer esse livro, edição preferida..."
          className={cn(inputClass, "resize-none")}
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input type="hidden" name="purchased" value="false" />
        <input
          id="purchased"
          name="purchased"
          type="checkbox"
          value="true"
          defaultChecked={item?.purchased ?? false}
          className="w-4 h-4 rounded border-parchment-300 text-ink-900 focus:ring-ink-900"
        />
        <label htmlFor="purchased" className="text-sm text-ink-600">
          Já comprado
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-parchment-200">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-ink-900 hover:bg-ink-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {item ? "Salvar" : "Adicionar"}
        </button>
      </div>
    </form>
  );
}
