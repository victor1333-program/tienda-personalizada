"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  // 🔹 Función para asignar la clase activa
  const getLinkClass = (path: string) =>
    `block p-2 rounded ${
      pathname.includes(path) ? "bg-blue-600" : "hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-6">⚙️ Panel de Administración</h2>

      <nav>
        <ul className="space-y-4">
          {/* 🔹 Dashboard */}
          <li>
            <Link href="/admin" className={getLinkClass("/admin")}>
              🏠 Dashboard
            </Link>
          </li>

          {/* 🔹 Gestión de Pedidos */}
          <li>
            <Link href="/admin/orders" className={getLinkClass("/admin/orders")}>
              📦 Pedidos
            </Link>
          </li>

          {/* 🔹 Gestión de Productos */}
          <li>
            <Link href="/admin/products" className={getLinkClass("/admin/products")}>
              🛒 Productos
            </Link>
          </li>

          {/* 🔹 Gestión de Usuarios */}
          <li>
            <Link href="/admin/users" className={getLinkClass("/admin/users")}>
              👤 Usuarios
            </Link>
          </li>

          {/* 🔹 Gestión de Descuentos */}
          <li>
            <Link href="/admin/discounts" className={getLinkClass("/admin/discounts")}>
              💰 Descuentos
            </Link>
          </li>

          {/* 🔹 Gestión de Facturas */}
          <li>
            <Link href="/admin/invoices" className={getLinkClass("/admin/invoices")}>
              📄 Facturas
            </Link>
          </li>

          {/* 🔹 Gestión de Presupuestos */}
          <li>
            <Link href="/admin/quotes" className={getLinkClass("/admin/quotes")}>
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
                  <Link href="/admin/settings/general" className={getLinkClass("/admin/settings/general")}>
                    🛠️ General
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/billing" className={getLinkClass("/admin/settings/billing")}>
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
