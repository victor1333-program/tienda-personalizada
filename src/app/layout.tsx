// src/app/layout.tsx
"use client";

import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
