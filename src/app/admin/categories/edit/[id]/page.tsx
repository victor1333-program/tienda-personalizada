"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Error al agregar la categoría");

      router.push("/admin/categories");
    } catch (error) {
      setError("❌ No se pudo agregar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Agregar Categoría</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Nombre de la categoría:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Categoría"}
        </button>
      </form>
    </div>
  );
}
