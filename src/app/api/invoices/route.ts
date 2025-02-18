// src/app/api/invoices/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany();
    return NextResponse.json(invoices ?? []);
  } catch (error) {
    console.error("❌ Error al obtener las facturas:", error);
    return NextResponse.json({ error: "Error al obtener las facturas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, clientName, clientEmail, items, subtotal, tax, total } = body;

    if (!orderId || !clientName || !clientEmail || !items || !subtotal || !tax || !total) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { invoiceNumber: "desc" },
    });

    const lastInvoiceNumber = lastInvoice?.invoiceNumber || "20250000";
    const newInvoiceNumber = (parseInt(lastInvoiceNumber) + 1).toString();

    const newInvoice = await prisma.invoice.create({
      data: {
        orderId,
        invoiceNumber: newInvoiceNumber,
        clientName,
        clientEmail,
        items: JSON.stringify(items),
        subtotal,
        tax,
        total,
        status: "pending",
      },
    });

    return NextResponse.json(newInvoice);
  } catch (error) {
    console.error("❌ Error al crear la factura:", error);
    return NextResponse.json({ error: "Error al crear la factura" }, { status: 500 });
  }
}
