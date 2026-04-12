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
    <div className="min-h-screen flex" style={{ backgroundColor: "#1a1d2e" }}>

      {/* ── Painel esquerdo — logo ───────────────────────── */}
      <div
        className="hidden md:flex md:w-[42%] flex-col items-center justify-center p-12"
        style={{ backgroundColor: "#1a1d2e" }}
      >
        <div className="text-center space-y-5">
          <div className="flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <BookOpen className="w-9 h-9 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              BiblioTech
            </h1>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sua biblioteca teológica pessoal.
            </p>
          </div>
        </div>
      </div>

      {/* ── Divisor ─────────────────────────────────────── */}
      <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />

      {/* ── Painel direito — formulário ─────────────────── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-8 py-12"
        style={{ backgroundColor: "#22263a" }}
      >
        {/* Logo mobile */}
        <div className="md:hidden flex flex-col items-center gap-3 mb-10">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">BiblioTech</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Título */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Acessar Plataforma
            </h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              Bem-vindo(a) de volta! Faça login para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@bibliotech.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition disabled:opacity-50 mt-1"
              style={{ backgroundColor: "#3b74f5" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2d63e0")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3b74f5")}
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
