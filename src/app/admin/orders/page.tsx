// src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
  hasInvoice: boolean;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("❌ Error al cargar pedidos:", error));
  }, []);

  // 🔹 Función para generar la factura
  const handleGenerateInvoice = async (orderId: string) => {
    const res = await fetch("/api/invoices", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });

    if (res.ok) {
      alert("✅ Factura generada con éxito");
      setOrders(orders.map(o => o.id === orderId ? { ...o, hasInvoice: true } : o));
    } else {
      alert("❌ Error al generar la factura");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Gestión de Pedidos</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="p-2 border">{order.customer}</td>
              <td className="p-2 border">{order.total.toFixed(2)} €</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                {order.hasInvoice ? (
                  <a href={`/admin/invoices/${order.id}`} className="text-blue-600 hover:underline">
                    📄 Ver Factura
                  </a>
                ) : (
                  <button
                    onClick={() => handleGenerateInvoice(order.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    ➕ Generar Factura
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
