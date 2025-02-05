import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      images = [],
      colors = [],
      sizes = [],
      material,
      weight,
      dimensions,
      isActive,
      isCustomizable,
      allowImageUpload,
      customTextFields = [],
      variants = [],
    } = body;

    // 🟢 Crear un nuevo producto con los mismos datos
    const duplicatedProduct


    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("❌ Error al duplicar producto:", error);
    return NextResponse.json({ error: "Error al duplicar producto" }, { status: 500 });
  }
}
