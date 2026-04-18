"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  LayoutDashboard,
  Library,
  Star,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/livros", label: "Livros", icon: Library },
  { href: "/admin/wishlist", label: "Wishlist", icon: Star },
];

function SidebarContent({
  onNavigate,
  showClose,
  onClose,
}: {
  onNavigate: () => void;
  showClose: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-parchment-200 flex items-center justify-between">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 bg-ink-900 rounded-md flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-semibold text-ink-900 tracking-tight">
            BiblioTech
          </span>
        </Link>
        {showClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-ink-400 hover:text-ink-700 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-parchment-100 text-ink-900 font-medium"
                  : "text-ink-400 hover:bg-parchment-100 hover:text-ink-700"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out + Theme */}
      <div className="p-3 border-t border-parchment-200 space-y-0.5">
        <ThemeToggle />
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-ink-400 hover:bg-parchment-100 hover:text-ink-700 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sair
        </button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ── Top bar mobile ─────────────────────────────── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-white border-b border-parchment-200 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-ink-500 hover:text-ink-900 rounded-lg transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group">
          <div className="w-7 h-7 bg-ink-900 rounded-md flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-semibold text-ink-900 tracking-tight">
            BiblioTech
          </span>
        </Link>
      </div>

      {/* ── Sidebar desktop ────────────────────────────── */}
      <aside className="hidden md:flex w-56 min-h-screen bg-white border-r border-parchment-200 flex-col shrink-0">
        <SidebarContent onNavigate={() => {}} showClose={false} onClose={() => {}} />
      </aside>

      {/* ── Drawer mobile ──────────────────────────────── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-ink-900/30 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          {/* Drawer */}
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col shadow-xl">
            <SidebarContent onNavigate={close} showClose={true} onClose={close} />
          </aside>
        </>
      )}
    </>
  );
}
