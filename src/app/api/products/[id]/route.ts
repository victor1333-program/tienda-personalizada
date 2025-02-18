import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🛠️ Obtener un producto por ID
export async function GET(req: Request, context: { params?: Record<string, string> }) {
  try {
    const id = context.params?.id;
    if (!id) {
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        category: true,
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
