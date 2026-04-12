"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

interface ImageUploadProps {
  currentUrl?: string | null;
  name?: string;
}

export function ImageUpload({ currentUrl, name = "cover" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Formato inválido. Use JPG, PNG ou WebP.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Imagem maior que 5MB.");
      e.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));
  }

  function handleRemove() {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink-700">Capa do livro</label>

      {preview ? (
        <div className="relative w-32">
          <div className="relative aspect-[2/3] w-32 rounded-lg overflow-hidden border border-parchment-300 shadow-sm">
            <Image src={preview} alt="Preview da capa" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-leather-600 text-white rounded-full flex items-center justify-center hover:bg-leather-700 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center w-32 aspect-[2/3] border-2 border-dashed border-parchment-300 rounded-lg text-ink-300 hover:border-leather-400 hover:text-leather-500 transition-colors"
        >
          <ImagePlus className="w-6 h-6 mb-1" />
          <span className="text-xs text-center px-2">Adicionar capa</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-ink-300">JPG, PNG ou WebP · máx. 5MB</p>
    </div>
  );
}
