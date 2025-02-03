import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔥 Obtener todas las categorías
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    return NextResponse.json({ error: "Error al obtener categorías" }, { status: 500 });
  }
}

// 🔥 Crear una nueva categoría
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });

    const category = await prisma.category.create({ data: { name } });
    return NextResponse.json(category);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    return NextResponse.json({ error: "Error al crear categoría" }, { status: 500 });
  }
}
