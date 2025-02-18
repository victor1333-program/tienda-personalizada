"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cliente";
};

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<"admin" | "cliente">("cliente");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el usuario.");
        const data: User = await res.json();
        setName(data.name);
        setRole(data.role);
      } catch {
        setError("❌ Error al cargar el usuario.");
      }
    }
    if (id) fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      if (!res.ok) throw new Error("Error al actualizar el usuario");

      router.push("/admin/users");
    } catch {
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
          required
        />

        <label className="block mb-2 font-semibold">Rol:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "cliente")}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
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
