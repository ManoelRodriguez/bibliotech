import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-parchment-50">
      <AdminSidebar />
      <main className="flex-1 pt-14 md:pt-0 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
