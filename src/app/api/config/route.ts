import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔹 Obtener configuración de facturación
export async function GET() {
  try {
    const config = await prisma.config.findFirst();
    if (!config) {
      return NextResponse.json(
        { error: "No se encontró la configuración" },
        { status: 404 }
      );
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("❌ Error al obtener configuración:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// 🔹 Actualizar configuración de facturación
export async function PUT(req: Request) {
  try {
    const { taxRate, invoiceEmail } = await req.json();

    const updatedConfig = await prisma.config.updateMany({
      data: { taxRate: parseFloat(taxRate), invoiceEmail },
    });

    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error("❌ Error al actualizar configuración:", error);
    return NextResponse.json(
      { error: "Error al actualizar configuración" },
      { status: 500 }
    );
  }
}
