"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Ocultar sidebar en las páginas de login y recuperación de contraseña
  if (["/admin/login", "/admin/recover-password"].includes(pathname)) {
    return null;
  }

  // 🔹 Clase activa para el enlace actual
  const getLinkClass = (path: string) =>
    `block p-2 rounded ${
      pathname.includes(path) ? "bg-blue-600" : "hover:bg-gray-700"
    }`;

  // 🔹 Cerrar sesión
  async function handleLogout() {
    setShowLogoutModal(false);
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (response.ok) {
      router.push("/admin/login");
    } else {
      alert("❌ Error al cerrar sesión");
    }
  }

  return (
    <>
      {/* 🔹 Barra Lateral */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
        <h2 className="text-xl font-bold mb-6">⚙️ Panel de Administración</h2>

        <nav>
          <ul className="space-y-4">
            <li><Link href="/admin" className={getLinkClass("/admin")}>🏠 Dashboard</Link></li>
            <li><Link href="/admin/orders" className={getLinkClass("/admin/orders")}>📦 Pedidos</Link></li>
            <li>
              <details className="group">
                <summary className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
                  🛒 Productos
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ul className="ml-4 space-y-2 mt-2">
                  <li><Link href="/admin/products" className={getLinkClass("/admin/products")}>📦 Productos</Link></li>
                  <li><Link href="/admin/categories" className={getLinkClass("/admin/categories")}>📂 Categorías</Link></li>
                  <li><Link href="/admin/inventory" className={getLinkClass("/admin/inventory")}>📦 Inventario</Link></li>
                  <li><Link href="/admin/providers" className={getLinkClass("/admin/providers")}>🏭 Proveedores</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/admin/gallery" className={getLinkClass("/admin/gallery")}>🖼️ Galería</Link></li>
            <li><Link href="/admin/users" className={getLinkClass("/admin/users")}>👤 Usuarios</Link></li>
            <li><Link href="/admin/discounts" className={getLinkClass("/admin/discounts")}>💰 Descuentos</Link></li>
            <li><Link href="/admin/invoices" className={getLinkClass("/admin/invoices")}>📄 Facturas</Link></li>
            <li><Link href="/admin/quotes" className={getLinkClass("/admin/quotes")}>📝 Presupuestos</Link></li>
            <li>
              <details className="group">
                <summary className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
                  ⚙️ Configuración
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ul className="ml-4 space-y-2 mt-2">
                  <li><Link href="/admin/settings/general" className={getLinkClass("/admin/settings/general")}>🛠️ General</Link></li>
                  <li><Link href="/admin/settings/billing" className={getLinkClass("/admin/settings/billing")}>📄 Facturación</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4"
              >
                🚪 Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 🔹 Modal de Confirmación de Cierre de Sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-lg font-semibold">¿Cerrar sesión?</h2>
            <p className="text-gray-600">Se cerrará tu sesión en el panel de administración.</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Sí, cerrar</button>
              <button onClick={() => setShowLogoutModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
