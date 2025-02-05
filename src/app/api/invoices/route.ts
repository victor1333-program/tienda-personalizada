import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔹 Crear nueva factura
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔹 Obtener configuración de facturación
    const config = await prisma.config.findFirst();
    if (!config) {
      return NextResponse.json(
        { error: "No hay configuración de facturación" },
        { status: 500 }
      );
    }

    // 🔹 Obtener el último número de factura y calcular el siguiente
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { invoiceNumber: "desc" },
    });
    const nextInvoiceNumber = lastInvoice
      ? parseInt(lastInvoice.invoiceNumber) + 1
      : config.invoiceStart;

    // 🔹 Calcular impuestos y totales
    const taxAmount = body.subtotal * (config.taxRate / 100);
    const totalAmount = body.subtotal + taxAmount;

    // 🔹 Crear nueva factura en la base de datos
    const newInvoice = await prisma.invoice.create({
      data: {
        orderId: body.orderId,
        invoiceNumber: nextInvoiceNumber.toString(),
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        items: body.items,
        subtotal: body.subtotal,
        tax: taxAmount,
        total: totalAmount,
        status: "pending",
      },
    });

    return NextResponse.json(newInvoice);
  } catch (error) {
    console.error("❌ Error al generar factura:", error);
    return NextResponse.json(
      { error: "Error al generar factura" },
      { status: 500 }
    );
  }
}
