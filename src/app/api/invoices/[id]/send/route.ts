import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendInvoiceEmail } from "@/lib/email";
import { generateInvoicePDF } from "@/lib/pdfGenerator";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const invoiceId = params.id;
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { order: { include: { user: true } } },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
    }

    const pdfBuffer = await generateInvoicePDF(invoice);
    await sendInvoiceEmail(invoice.order.user.email, "Tu Factura", "Adjunta tu factura.", pdfBuffer);

    return NextResponse.json({ message: "Factura enviada con éxito" });
  } catch (error) {
    console.error("❌ Error al enviar la factura:", error);
    return NextResponse.json({ error: "Error al enviar la factura" }, { status: 500 });
  }
}
