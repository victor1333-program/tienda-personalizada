"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Error al cargar los productos");

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el producto");

      setProducts(products.filter((product) => product.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Productos</h1>

      <div className="mb-4">
        <Link
          href="/admin/products/add"
          className="bg-blue-500 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <FiPlusCircle className="mr-2" />
          Agregar Producto
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Precio</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    <FiEdit />
                  </Link>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
