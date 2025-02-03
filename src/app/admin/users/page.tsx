"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25); // 🔢 Opciones: 25, 50, 100, 200

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("No se pudieron obtener los usuarios.");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("❌ Error al cargar los usuarios:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    ) && (roleFilter ? user.role === roleFilter : true);
  });

  // 📌 Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

      {/* 🔍 Barra de búsqueda, filtro y cantidad por página */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Todos los roles</option>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
        <select
          className="border p-2 rounded"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reiniciar a la primera página
          }}
        >
          <option value="25">25 por página</option>
          <option value="50">50 por página</option>
          <option value="100">100 por página</option>
          <option value="200">200 por página</option>
        </select>
      </div>

      {/* 📋 Tabla de usuarios */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.isActive ? "✅ Activo" : "❌ Inactivo"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔀 Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ⬅️ Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente ➡️
        </button>
      </div>

      {/* ➕ Botón para agregar usuario */}
      <div className="mt-6">
        <Link
          href="/admin/users/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Añadir Usuario
        </Link>
      </div>
    </main>
  );
}
