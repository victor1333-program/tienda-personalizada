"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string;
  stock: number;
  price: number;
  category: string;
  provider: string;
  isActive: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterProvider, setFilterProvider] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [actionType, setActionType] = useState<"activate" | "deactivate" | "delete" | null>(null);

  // 🔄 Cargar productos al montar
  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  // 🔍 Filtrar productos dinámicamente
  const filteredProducts = products.filter((p) => {
    return (
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)) &&
      (filterCategory ? p.category === filterCategory : true) &&
      (filterProvider ? p.provider === filterProvider : true) &&
      (filterStatus === "active" ? p.isActive : filterStatus === "inactive" ? !p.isActive : true)
    );
  });

  // ✅ Seleccionar productos
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 🔧 Acciones Masivas
  const handleAction = async () => {
    if (!actionType) return;
    const confirm = window.confirm(`¿Estás seguro de querer ${actionType} los productos seleccionados?`);
    if (!confirm) return;

    const res = await fetch("/api/products/bulk-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: actionType, productIds: selected }),
    });
    if (res.ok) {
      alert(`✅ Productos ${actionType === "delete" ? "eliminados" : "actualizados"} correctamente`);
      const updated = products.filter((p) => !selected.includes(p.id));
      setProducts(updated);
      setSelected([]);
      setActionType(null);
    } else {
      alert("❌ Error al realizar la acción masiva");
    }
  };

  // 🖱️ Renderizar productos
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🛒 Gestión de Productos</h1>
        <Link href="/admin/products/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-500">
            <FiPlusCircle /> Agregar Producto
          </button>
        </Link>
      </div>

      {/* 🔍 Filtros */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">📂 Filtrar por categoría</option>
          <option value="Camisetas">Camisetas</option>
          <option value="Tazas">Tazas</option>
          <option value="Accesorios">Accesorios</option>
        </select>

        <select
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">🏭 Filtrar por proveedor</option>
          <option value="Proveedor A">Proveedor A</option>
          <option value="Proveedor B">Proveedor B</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">⚙️ Filtrar por estado</option>
          <option value="active">✅ Activos</option>
          <option value="inactive">❌ Inactivos</option>
        </select>
      </div>

      {/* 🛠️ Acciones Masivas */}
      <div className="flex gap-3 mb-4">
        <button
          className="bg-green-600 text-white px-3 py-2 rounded disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={() => {
            setActionType("activate");
            handleAction();
          }}
        >
          🟢 Activar
        </button>
        <button
          className="bg-yellow-600 text-white px-3 py-2 rounded disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={() => {
            setActionType("deactivate");
            handleAction();
          }}
        >
          🟡 Desactivar
        </button>
        <button
          className="bg-red-600 text-white px-3 py-2 rounded disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={() => {
            setActionType("delete");
            handleAction();
          }}
        >
          🔴 Eliminar
        </button>
      </div>

      {/* 📋 Tabla de Productos */}
      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelected(
                    e.target.checked ? products.map((p) => p.id) : []
                  )
                }
              />
            </th>
            <th className="p-2">🖼️ Imagen</th>
            <th className="p-2 text-left">🏷️ Nombre</th>
            <th className="p-2 text-left">🔍 SKU</th>
            <th className="p-2">⚖️ Inventario</th>
            <th className="p-2">💲 Precio</th>
            <th className="p-2">📂 Categoría</th>
            <th className="p-2">🏭 Proveedor</th>
            <th className="p-2">⚙️ Estado</th>
            <th className="p-2">🔧 Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 border-t cursor-pointer"
              >
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                  />
                </td>
                <td className="p-2 text-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  ) : (
                    "❌"
                  )}
                </td>
                <td className="p-2 text-left">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="p-2">{product.sku}</td>
                <td className="p-2 text-center">{product.stock}</td>
                <td className="p-2 text-center">€{product.price.toFixed(2)}</td>
                <td className="p-2 text-center">{product.category}</td>
                <td className="p-2 text-center">{product.provider}</td>
                <td className="p-2 text-center">
                  {product.isActive ? "✅ Activo" : "❌ Inactivo"}
                </td>
                <td className="p-2 text-center">
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <button className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-400">
                      <FiEdit />
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                    onClick={() => {
                      if (
                        window.confirm(
                          `¿Eliminar el producto "${product.name}"?`
                        )
                      ) {
                        handleAction();
                      }
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4">
                ❌ No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
