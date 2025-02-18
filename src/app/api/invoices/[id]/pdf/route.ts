// src/app/api/invoices/[id]/pdf/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const invoiceId = params.id;

    // ✅ Buscar la factura
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
    }

    // ✅ Crear un PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // 📝 Agregar contenido
    page.drawText(`Factura #${invoice.invoiceNumber}`, { x: 50, y: 700, size: 20, color: rgb(0, 0, 0) });
    page.drawText(`Cliente: ${invoice.clientName}`, { x: 50, y: 670 });
    page.drawText(`Email: ${invoice.clientEmail}`, { x: 50, y: 650 });
    page.drawText(`Total: €${invoice.total.toFixed(2)}`, { x: 50, y: 630 });

    // ✅ Generar el PDF
    const pdfBytes = await pdfDoc.save();

    // ✅ Responder con el PDF
    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="factura_${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("❌ Error al generar el PDF:", error);
    return NextResponse.json({ error: "Error al generar el PDF" }, { status: 500 });
  }
}
