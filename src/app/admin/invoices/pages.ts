"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  total: number;
  tax: number;
  status: "pending" | "paid";
  createdAt: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // 🔹 Cargar facturas desde la API
  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setFilteredInvoices(data);
      })
      .catch((error) => console.error("❌ Error al cargar facturas:", error));
  }, []);

  // 🔹 Filtrar facturas en tiempo real
  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter((invoice) =>
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((invoice) => invoice.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter(
        (invoice) => invoice.createdAt.split("T")[0] === filterDate
      );
    }

    setFilteredInvoices(filtered);
  }, [searchTerm, filterStatus, filterDate, invoices]);

  // 🔹 Reenviar factura por correo
  const resendInvoice = async (invoiceId: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/resend`, {
        method: "POST",
      });

      if (res.ok) {
        alert("✅ Factura reenviada con éxito");
      } else {
        alert("❌ Error al reenviar la factura");
      }
    } catch (error) {
      console.error("❌ Error al reenviar factura:", error);
    }
  };

  // 🔹 Cambiar estado de factura (Pagada/Pendiente)
  const toggleInvoiceStatus = async (invoiceId: string, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "paid" : "pending";

    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInvoices((prev) =>
          prev.map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
          )
        );
      } else {
        alert("❌ Error al cambiar el estado de la factura");
      }
    } catch (error) {
      console.error("❌ Error al actualizar estado de factura:", error);
    }
  };

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6">📄 Gestión de Facturas</h1>

      {/* 🔹 Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar por cliente..."
          className="border px-3 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">📌 Filtrar por estado</option>
          <option value="paid">✅ Pagada</option>
          <option value="pending">⌛ Pendiente</option>
        </select>
        <input
          type="date"
          className="border px-3 py-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* 🔹 Tabla de facturas */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Número</th>
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">IVA</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="text-center">
                <td className="border p-2">{invoice.invoiceNumber}</td>
                <td className="border p-2">{invoice.clientName}</td>
                <td className="border p-2">{invoice.clientEmail}</td>
                <td className="border p-2">€{invoice.total.toFixed(2)}</td>
                <td className="border p-2">{invoice.tax}%</td>
                <td
                  className={`border p-2 font-bold ${
                    invoice.status === "paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {invoice.status === "paid" ? "✅ Pagada" : "⌛ Pendiente"}
                </td>
                <td className="border p-2">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <Link
                    href={`/admin/invoices/${invoice.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    📄 Ver
                  </Link>
                  <button
                    onClick={() => toggleInvoiceStatus(invoice.id, invoice.status)}
                    className={`px-3 py-1 rounded text-white ${
                      invoice.status === "paid"
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-green-500 hover:bg-green-700"
                    }`}
                  >
                    {invoice.status === "paid" ? "❌ Marcar Pendiente" : "✅ Marcar Pagada"}
                  </button>
                  <button
                    onClick={() => resendInvoice(invoice.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    📧 Reenviar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
