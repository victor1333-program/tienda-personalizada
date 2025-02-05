// src/app/api/invoices/[id]/pdf/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const invoiceId = params.id;

    // 🔹 Buscar la factura en la base de datos
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { order: { include: { user: true } } },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
    }

    // 🔹 Crear un nuevo PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    // 🔹 Estilos del PDF
    const { width, height } = page.getSize();
    const fontSize = 14;

    page.drawText("Factura", { x: 50, y: height - 50, size: 20, color: rgb(0, 0, 0) });
    page.drawText(`Número: ${invoice.id}`, { x: 50, y: height - 80, size: fontSize });
    page.drawText(`Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}`, { x: 50, y: height - 110, size: fontSize });
    page.drawText(`Cliente: ${invoice.order.user.name}`, { x: 50, y: height - 140, size: fontSize });

    page.drawText(`Total: €${invoice.order.total.toFixed(2)}`, { x: 50, y: height - 180, size: fontSize, color: rgb(1, 0, 0) });

    // 🔹 Generar el PDF
    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="factura-${invoice.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("❌ Error al generar la factura en PDF:", error);
    return NextResponse.json({ error: "Error al generar PDF" }, { status: 500 });
  }
}
