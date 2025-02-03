"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl">Productos</h2>
          <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded" onClick={() => router.push("/admin/products")}>
            Gestionar
          </button>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl">Pedidos</h2>
          <button className="mt-4 bg-white text-green-500 px-4 py-2 rounded" onClick={() => router.push("/admin/orders")}>
            Revisar
          </button>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl">Categorías</h2>
          <button className="mt-4 bg-white text-purple-500 px-4 py-2 rounded" onClick={() => router.push("/admin/categories")}>
            Administrar
          </button>
        </div>
      </div>
    </main>
  );
}
