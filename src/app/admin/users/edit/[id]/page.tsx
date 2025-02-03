"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el usuario.");
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setRole(data.role);
      } catch (error) {
        setError("❌ Error al cargar el usuario.");
      }
    }
    fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      if (!res.ok) throw new Error("Error al actualizar el usuario");

      router.push("/admin/users");
    } catch (error) {
      setError("❌ No se pudo actualizar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleUpdate}>
        <label className="block mb-2 font-semibold">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <label className="block mb-2 font-semibold">Rol:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        >
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Usuario"}
        </button>
      </form>
    </div>
  );
}
