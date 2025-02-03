"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, isActive }),
      });

      if (!res.ok) throw new Error("Error al crear el usuario");

      router.push("/admin/users");
    } catch (error) {
      setError("❌ No se pudo crear el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Añadir Usuario</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleCreateUser}>
        <label className="block mb-2 font-semibold">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <label className="block mb-2 font-semibold">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <label className="block mb-2 font-semibold">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
          Usuario Activo
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}
