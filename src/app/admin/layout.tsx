"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import "@/styles/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 🔹 Si estamos en "/admin/login", solo mostramos el contenido sin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 ml-64">{children}</main>
    </div>
  );
}
