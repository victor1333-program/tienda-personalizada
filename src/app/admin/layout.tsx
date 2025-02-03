import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">LoviPrint Admin</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="block text-gray-700 hover:text-blue-600">📊 Dashboard</Link>
          <Link href="/admin/products" className="block text-gray-700 hover:text-blue-600">👕 Productos</Link>
          <Link href="/admin/categories" className="block text-gray-700 hover:text-blue-600">📂 Categorías</Link>
          <Link href="/admin/orders" className="block text-gray-700 hover:text-blue-600">📦 Pedidos</Link>
          <Link href="/admin/users" className="block text-gray-700 hover:text-blue-600">👤 Usuarios</Link>
          <Link href="/admin/settings" className="block text-gray-700 hover:text-blue-600">⚙️ Configuración</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Panel de Administración</h2>
          <div className="text-gray-600">🔑 Admin</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
