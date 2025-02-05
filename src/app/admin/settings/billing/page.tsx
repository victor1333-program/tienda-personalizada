"use client";

import { useEffect, useState } from "react";

export default function FacturacionConfigPage() {
  const [taxRate, setTaxRate] = useState<number>(21);
  const [invoiceEmail, setInvoiceEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Cargar configuración actual desde la API
  useEffect(() => {
    fetch("/api/config/facturacion")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTaxRate(data.taxRate);
          setInvoiceEmail(data.invoiceEmail);
        }
      })
      .catch((error) => console.error("❌ Error al cargar configuración:", error))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Guardar cambios en la configuración
  const handleSave = async () => {
    try {
      const res = await fetch("/api/config/facturacion", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taxRate, invoiceEmail }),
      });

      if (res.ok) {
        alert("✅ Configuración guardada correctamente");
      } else {
        alert("❌ Error al guardar la configuración");
      }
    } catch (error) {
      console.error("❌ Error al guardar configuración:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando configuración...</p>;
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ Configuración de Facturación</h1>

      <div className="bg-white p-6 shadow-md rounded-md">
        <label className="block mb-4">
          <span className="font-semibold">🧾 IVA (%)</span>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="w-full border p-2 mt-2"
          />
        </label>

        <label className="block mb-4">
          <span className="font-semibold">📧 Email de Facturación</span>
          <input
            type="email"
            value={invoiceEmail}
            onChange={(e) => setInvoiceEmail(e.target.value)}
            className="w-full border p-2 mt-2"
          />
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          💾 Guardar Configuración
        </button>
      </div>
    </main>
  );
}
