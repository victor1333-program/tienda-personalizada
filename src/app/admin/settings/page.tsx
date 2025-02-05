"use client";
import { useEffect, useState } from "react";

export default function ConfigPage() {
  const [config, setConfig] = useState({ invoiceStart: 1000, taxRate: 21, orderEmail: "", contactEmail: "" });

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);

  const handleUpdate = async () => {
    await fetch("/api/config", {
      method: "PUT",
      body: JSON.stringify(config),
    });
    alert("✅ Configuración guardada");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">⚙️ Configuración</h1>
      
      <label className="block mt-4">📄 Número Inicial de Facturas</label>
      <input type="number" value={config.invoiceStart} onChange={(e) => setConfig({ ...config, invoiceStart: Number(e.target.value) })} />

      <label className="block mt-4">💰 IVA (%)</label>
      <input type="number" value={config.taxRate} onChange={(e) => setConfig({ ...config, taxRate: Number(e.target.value) })} />

      <label className="block mt-4">📧 Email para Pedidos</label>
      <input type="email" value={config.orderEmail} onChange={(e) => setConfig({ ...config, orderEmail: e.target.value })} />

      <label className="block mt-4">📧 Email de Contacto</label>
      <input type="email" value={config.contactEmail} onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })} />

      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 mt-6">Guardar Cambios</button>
    </div>
  );
}
