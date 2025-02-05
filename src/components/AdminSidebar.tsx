"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">⚙️ Panel de Administración</h2>

      <nav>
        <ul className="space-y-4">
          {/* 🔹 Dashboard */}
          <li>
            <Link
              href="/admin"
              className={`block p-2 rounded ${pathname === "/admin" ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              🏠 Dashboard
            </Link>
          </li>

          {/* 🔹 Gestión de Pedidos */}
          <li>
            <Link
              href="/admin/orders"
              className={`block p-2 rounded ${pathname.includes("/admin/orders") ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              📦 Pedidos
            </Link>
          </li>

          {/* 🔹 Gestión de Productos */}
          <li>
            <Link
              href="/admin/products"
              className={`block p-2 rounded ${pathname.includes("/admin/products") ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              🛒 Productos
            </Link>
          </li>

          {/* 🔹 Gestión de Usuarios */}
          <li>
            <Link
              href="/admin/users"
              className={`block p-2 rounded ${pathname.includes("/admin/users") ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              👤 Usuarios
            </Link>
          </li>

          {/* 🔹 Gestión de Descuentos */}
          <li>
            <Link
              href="/admin/discounts"
              className={`block p-2 rounded ${pathname.includes("/admin/discounts") ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              💰 Descuentos
            </Link>
          </li>

          {/* 🔹 Gestión de Facturas */}
          <li>
            <Link
              href="/admin/invoices"
              className={`block p-2 rounded ${pathname.includes("/admin/invoices") ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              📄 Facturas
            </Link>
          </li>

          {/* 🔹 Gestión de Presupuestos */}
          <li>
            <Link
              href="/admin/quotes"
              className={`block p-2 rounded ${pathname.includes("/admin/quotes") ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              📝 Presupuestos
            </Link>
          </li>

          {/* 🔹 Configuración */}
          <li>
            <details className="group">
              <summary className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
                ⚙️ Configuración
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <ul className="ml-4 space-y-2 mt-2">
                <li>
                  <Link
                    href="/admin/settings/general"
                    className={`block p-2 rounded ${pathname.includes("/admin/settings/general") ? "bg-blue-600" : "hover:bg-gray-700"}`}
                  >
                    🛠️ General
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings/billing"
                    className={`block p-2 rounded ${pathname.includes("/admin/settings/billing") ? "bg-blue-600" : "hover:bg-gray-700"}`}
                  >
                    📄 Facturación
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* 🔹 Cerrar Sesión */}
          <li>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4">
              🚪 Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
