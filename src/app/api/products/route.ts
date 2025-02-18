// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// ✅ Método GET: Obtener lista de productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        suppliers: true,
        variants: true,
      },
    });

    if (!Array.isArray(products)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

// ✅ Método POST: Crear un nuevo producto
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      price,
      categoryId,
      images,
      stock,
      minStock,
      suppliers,
      sku,
    } = body;

    // ✅ Validación de campos obligatorios
    if (!name || !price || !categoryId || stock === undefined) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // ✅ Generar SKU si no se proporciona
    const generatedSku = sku || `SKU-${uuidv4().slice(0, 8)}`;

    // ✅ Crear el producto en la base de datos
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        images,
        stock,
        minStock,
        sku: generatedSku,
        suppliers: {
          create: suppliers?.map((supplier: { id: string; cost: number }) => ({
            supplierId: supplier.id,
            cost: supplier.cost,
          })) || [],
        },
      },
      include: { suppliers: true },
    });

    // ✅ Registrar la entrada de stock en el historial
    await prisma.inventoryHistory.create({
      data: {
        productId: product.id,
        type: "entrada",
        quantity: stock,
        userId: "admin", // TODO: Reemplazar con ID del usuario autenticado
        description: "Stock inicial",
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear el producto:", error);
    return NextResponse.json({ error: "Error al crear el producto" }, { status: 500 });
  }
}
