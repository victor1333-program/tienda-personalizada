"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function RecoverPasswordLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/admin/login") || pathname.includes("/admin/recover-password");

  return (
    <div className="flex">
      {!isAuthPage && <AdminSidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
}
