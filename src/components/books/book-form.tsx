"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/shared/image-upload";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/actions/books";
import type { BookWithGenre, GenreWithCount } from "@/types";

interface BookFormProps {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  genres: GenreWithCount[];
  book?: BookWithGenre;
}

const initialState: ActionState = {};

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-leather-600 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-parchment-300 bg-white text-ink-900 text-sm placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-transparent transition";

export function BookForm({ action, genres, book }: BookFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">
        {/* Upload de capa */}
        <ImageUpload currentUrl={book?.coverUrl} />

        {/* Campos principais */}
        <div className="space-y-4">
          <Field label="Título" required>
            <input
              name="title"
              type="text"
              defaultValue={book?.title}
              required
              maxLength={200}
              placeholder="Ex: Teologia Sistemática"
              className={inputClass}
            />
          </Field>

          <Field label="Autor" required>
            <input
              name="author"
              type="text"
              defaultValue={book?.author}
              required
              maxLength={200}
              placeholder="Ex: Wayne Grudem"
              className={inputClass}
            />
          </Field>

          <Field label="Gênero" required>
            <select
              name="genreId"
              defaultValue={book?.genreId}
              required
              className={cn(inputClass, "cursor-pointer")}
            >
              <option value="">Selecione um gênero</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Páginas">
              <input
                name="pages"
                type="number"
                defaultValue={book?.pages ?? ""}
                min={1}
                placeholder="384"
                className={inputClass}
              />
            </Field>
            <Field label="Ano">
              <input
                name="year"
                type="number"
                defaultValue={book?.year ?? ""}
                min={100}
                max={new Date().getFullYear() + 1}
                placeholder="2010"
                className={inputClass}
              />
            </Field>
            <Field label="ISBN">
              <input
                name="isbn"
                type="text"
                defaultValue={book?.isbn ?? ""}
                maxLength={20}
                placeholder="978-..."
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Editora">
            <input
              name="publisher"
              type="text"
              defaultValue={book?.publisher ?? ""}
              maxLength={200}
              placeholder="Ex: Vida Nova"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Campos de texto longo */}
      <Field label="Descrição">
        <textarea
          name="description"
          defaultValue={book?.description ?? ""}
          rows={3}
          maxLength={2000}
          placeholder="Breve descrição pública do livro..."
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      <Field label="Resumo / Resenha">
        <textarea
          name="summary"
          defaultValue={book?.summary ?? ""}
          rows={5}
          maxLength={5000}
          placeholder="Resumo detalhado ou resenha pessoal..."
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      <Field label="Anotações pessoais">
        <textarea
          name="notes"
          defaultValue={book?.notes ?? ""}
          rows={4}
          maxLength={5000}
          placeholder="Notas, destaques, citações favoritas..."
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      {/* Publicado */}
      <div className="flex items-center gap-3">
        <input
          type="hidden"
          name="isPublished"
          value="false"
        />
        <input
          id="isPublished"
          name="isPublished"
          type="checkbox"
          value="true"
          defaultChecked={book ? book.isPublished : true}
          className="w-4 h-4 rounded border-parchment-300 text-leather-600 focus:ring-leather-600"
        />
        <label htmlFor="isPublished" className="text-sm text-ink-700">
          Publicado no catálogo público
        </label>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-3 pt-2 border-t border-parchment-200">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-leather-600 hover:bg-leather-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {book ? "Salvar alterações" : "Criar livro"}
        </button>
        <a
          href="/admin/livros"
          className="px-5 py-2.5 text-sm font-medium text-ink-500 hover:text-ink-900 transition"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
