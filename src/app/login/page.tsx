"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex bg-parchment-100">

      {/* ── Esquerda — identidade ───────────────────────── */}
      <div className="hidden md:flex md:w-[45%] flex-col items-center justify-center p-12 bg-parchment-100">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-ink-900 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-ink-900 tracking-tight">
              BiblioTech
            </h1>
            <p className="text-sm text-ink-400 mt-1.5">
              Sua biblioteca teológica pessoal.
            </p>
          </div>
        </div>
      </div>

      {/* ── Direita — formulário ────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-white border-l border-parchment-200">

        {/* Logo mobile */}
        <div className="md:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-ink-900 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-ink-900">BiblioTech</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-ink-900 tracking-tight">
              Acessar Plataforma
            </h2>
            <p className="text-sm text-ink-400 mt-1">
              Bem-vindo(a) de volta! Faça login para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1.5">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@bibliotech.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-parchment-200 bg-parchment-50 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-1.5">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-parchment-200 bg-parchment-50 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white bg-ink-900 hover:bg-ink-700 disabled:opacity-50 transition mt-1"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
