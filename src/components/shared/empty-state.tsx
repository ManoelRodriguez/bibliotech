import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "Nenhum livro encontrado",
  description = "Tente ajustar os filtros ou o termo de busca.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <BookOpen className="w-12 h-12 text-parchment-400 mb-4" />
      <h3
        className="text-xl font-semibold text-ink-700 mb-1"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {title}
      </h3>
      <p className="text-sm text-ink-400 max-w-xs">{description}</p>
    </div>
  );
}
