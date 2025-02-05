// src/app/layout.tsx
import "@/globals.css"; // Importar estilos globales
import AdminSidebar from "@/components/AdminSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex bg-gray-100 h-screen">
        {/* Barra lateral fija */}
        <AdminSidebar />

        {/* Contenido principal */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
