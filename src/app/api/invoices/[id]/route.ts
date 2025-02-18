// src/app/api/invoices/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const invoiceId = params.id;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("❌ Error al obtener la factura:", error);
    return NextResponse.json({ error: "Error al obtener la factura" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const invoiceId = params.id;

  try {
    await prisma.invoice.delete({ where: { id: invoiceId } });
    return NextResponse.json({ message: "Factura eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la factura:", error);
    return NextResponse.json({ error: "Error al eliminar la factura" }, { status: 500 });
  }
}
