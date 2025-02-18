"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ocultar el Sidebar en la página de login
  const hideSidebarPaths = ["/admin/login"];

  const shouldShowSidebar = !hideSidebarPaths.includes(pathname);

  return (
    <div className="flex h-screen">
      {shouldShowSidebar && <Sidebar />}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
