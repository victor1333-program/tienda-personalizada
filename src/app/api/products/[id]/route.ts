import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔥 Obtener un producto por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params?.id;
    if (!id) {
      console.error("❌ No se proporcionó un ID válido.");
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        category: true, // Incluye la categoría
        variants: true  // Incluye las variantes
      },
    });

    if (!product) {
      console.error("❌ Producto no encontrado.");
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    console.log("✅ Producto encontrado:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
  }
}
