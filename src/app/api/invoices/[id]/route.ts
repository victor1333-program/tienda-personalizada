import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // ✅ Extraemos ID de forma segura

    if (!id) {
      return NextResponse.json({ error: "ID de factura no proporcionado" }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { items: true }, // ✅ Aseguramos que los items se incluyan
    });

    if (!invoice) {
      return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("❌ Error al obtener la factura:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
