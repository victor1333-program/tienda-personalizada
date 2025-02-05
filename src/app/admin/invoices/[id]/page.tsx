// src/app/admin/invoices/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import InvoicePDF from "@/components/InvoicePDF"; // ✅ Componente de vista previa en PDF

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: "paid" | "pending";
  createdAt: string;
}

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetch(`/api/invoices/${id}`)
      .then((res) => res.json())
      .then((data) => setInvoice(data))
      .catch((error) => console.error("❌ Error al cargar la factura:", error));
  }, [id]);

  if (!invoice) {
    return <p className="text-center text-gray-500">Cargando factura...</p>;
  }

  // 🔹 Función para descargar la factura en PDF con jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Factura Nº: ${invoice.invoiceNumber}`, 20, 20);
    doc.text(`Cliente: ${invoice.clientName}`, 20, 30);
    doc.text(`Correo: ${invoice.clientEmail}`, 20, 40);
    doc.text(`Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 50);
    doc.text(`Estado: ${invoice.status === "paid" ? "Pagada" : "Pendiente"}`, 20, 60);

    autoTable(doc, {
      startY: 70,
      head: [["Producto", "Cantidad", "Precio", "Total"]],
      body: invoice.items.map((item) => [
        item.name,
        item.quantity,
        `${item.price.toFixed(2)} €`,
        `${(item.quantity * item.price).toFixed(2)} €`,
      ]),
    });

    doc.text(`Subtotal: ${invoice.subtotal.toFixed(2)} €`, 20, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA: ${invoice.tax.toFixed(2)} €`, 20, doc.lastAutoTable.finalY + 20);
    doc.text(`Total: ${invoice.total.toFixed(2)} €`, 20, doc.lastAutoTable.finalY + 30);

    doc.save(`Factura-${invoice.invoiceNumber}.pdf`);
  };

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6">📄 Factura Nº {invoice.invoiceNumber}</h1>

      {/* 🔹 Detalles de la factura */}
      <div className="border p-4 rounded bg-white shadow-md">
        <p><strong>Cliente:</strong> {invoice.clientName}</p>
        <p><strong>Correo:</strong> {invoice.clientEmail}</p>
        <p><strong>Fecha:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
        <p className={`font-bold ${invoice.status === "paid" ? "text-green-600" : "text-red-600"}`}>
          Estado: {invoice.status === "paid" ? "✅ Pagada" : "⌛ Pendiente"}
        </p>
      </div>

      {/* 🔹 Tabla de productos */}
      <table className="w-full border-collapse border my-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.quantity}</td>
              <td className="p-2 border">{item.price.toFixed(2)} €</td>
              <td className="p-2 border">{(item.quantity * item.price).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Totales */}
      <div className="text-right font-bold">
        <p>Subtotal: {invoice.subtotal.toFixed(2)} €</p>
        <p>IVA: {invoice.tax.toFixed(2)} €</p>
        <p className="text-xl">Total: {invoice.total.toFixed(2)} €</p>
      </div>

      {/* 🔹 Vista previa en PDF con react-pdf */}
      <h2 className="text-xl font-bold mt-6">🖥️ Vista previa de factura</h2>
      <div className="bg-white p-4 shadow-md">
        <PDFViewer width="100%" height="500px">
          <InvoicePDF invoice={invoice} />
        </PDFViewer>
      </div>

      {/* 🔹 Botón de descarga PDF */}
      <button
        onClick={handleDownloadPDF}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        📥 Descargar Factura en PDF
      </button>
    </main>
  );
}
