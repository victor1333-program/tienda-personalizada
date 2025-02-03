"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("❌ Error al obtener categorías:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    setLoading(true);
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar categoría:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>

      <div className="flex justify-between items-center mb-4">
        <Link href="/admin/categories/add">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            <FiPlusCircle /> Agregar Categoría
          </button>
        </Link>
      </div>

      <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t hover:bg-gray-100">
              <td className="p-3">{category.name}</td>
              <td className="p-3 flex justify-center gap-3">
                <Link href={`/admin/categories/edit/${category.id}`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400">
                    <FiEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
