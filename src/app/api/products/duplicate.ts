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
      isActive = true,
      isCustomizable = false,
      allowImageUpload = false,
      customTextFields = [],
      variants = [],
    } = body;

    // 🟢 Crear un nuevo producto duplicado
    const duplicatedProduct = await prisma.product.create({
      data: {
        name: `${name} (Copia)`,
        description,
        price,
        stock,
        categoryId,
        images,
        colors,
        sizes,
        material,
        weight,
        dimensions,
        isActive,
        isCustomizable,
        allowImageUpload,
        customTextFields,
        variants: {
          create: variants.map((variant: { color: string; size: string; stock: number; price?: number }) => ({
            color: variant.color,
            size: variant.size,
            stock: variant.stock,
            price: variant.price,
          })),
        },
      },
    });

    return NextResponse.json(duplicatedProduct);
  } catch (error) {
    console.error("❌ Error al duplicar producto:", error);
    return NextResponse.json(
      { error: "Error al duplicar producto" },
      { status: 500 }
    );
  }
}
