import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔹 Obtener la configuración de facturación
export async function GET() {
  try {
    const config = await prisma.config.findFirst();
    if (!config) {
      return NextResponse.json({ error: "Configuración no encontrada" }, { status: 404 });
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("❌ Error al obtener configuración:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// 🔹 Actualizar la configuración de facturación
export async function PUT(req: Request) {
  try {
    const { taxRate, invoiceEmail } = await req.json();

    // Validar datos
    if (!taxRate || !invoiceEmail) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Actualizar en la base de datos
    const updatedConfig = await prisma.config.update({
      where: { id: "config_id" }, // Reemplaza con el ID real si es necesario
      data: { taxRate, invoiceEmail },
    });

    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error("❌ Error al actualizar configuración:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
