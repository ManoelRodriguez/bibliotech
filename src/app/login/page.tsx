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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-leather-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-4xl font-semibold text-ink-900"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            BiblioTech
          </h1>
          <p className="text-ink-500 mt-1 text-sm">Área administrativa</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-parchment-200 p-8">
          <h2
            className="text-2xl font-semibold text-ink-900 mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Entrar
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-parchment-300 bg-parchment-50 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-transparent transition"
                placeholder="admin@bibliotech.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink-700 mb-1.5"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-parchment-300 bg-parchment-50 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-leather-600 hover:bg-leather-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink-300 mt-6">
          BiblioTech — acesso restrito
        </p>
      </div>
    </div>
  );
}
