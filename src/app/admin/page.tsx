import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Ventas Totales</h2>
          <p className="text-2xl font-bold text-blue-600">$5,000</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Pedidos Pendientes</h2>
          <p className="text-2xl font-bold text-blue-600">8</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Clientes Registrados</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Productos en Stock</h2>
          <p className="text-2xl font-bold text-blue-600">45</p>
        </div>
      </div>

      {/* Botones de Acceso Rápido */}
      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/admin/products" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600">
          📦 Gestionar Productos
        </Link>
        <Link href="/admin/orders" className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600">
          📋 Ver Pedidos
        </Link>
        <Link href="/admin/categories" className="bg-purple-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-600">
          📂 Administrar Categorías
        </Link>
        <Link href="/admin/users" className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600">
          👤 Usuarios
        </Link>
      </div>
    </div>
  );
}
