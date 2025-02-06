// src/app/layout.tsx
"use client";

import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      {/* 🔹 Barra lateral fija */}
      <AdminSidebar />

      {/* 🔹 Contenido principal */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
