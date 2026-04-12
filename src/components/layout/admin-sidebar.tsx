"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BookOpen, LayoutDashboard, Library, Star, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/livros", label: "Livros", icon: Library },
  { href: "/admin/wishlist", label: "Wishlist", icon: Star },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-parchment-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-parchment-200">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-leather-600 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-xl font-semibold text-ink-900 group-hover:text-leather-600 transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            BiblioTech
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-leather-50 text-leather-700"
                  : "text-ink-500 hover:bg-parchment-100 hover:text-ink-900"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-parchment-200">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-ink-500 hover:bg-parchment-100 hover:text-ink-900 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  );
}
