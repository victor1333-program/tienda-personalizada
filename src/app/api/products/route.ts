import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔥 Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, variants: true },
    });
    console.log("✅ Productos obtenidos:", products);
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

// 🔥 Agregar un nuevo producto
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Datos recibidos en API:", body);

    // Asegurar que los datos sean correctos antes de enviarlos a Prisma
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: Number(body.price),
        stock: Number(body.stock),
        categoryId: body.categoryId || null,
        images: body.images.length > 0 ? { set: body.images } : undefined,
        colors: body.colors.length > 0 ? { set: body.colors } : undefined,
        sizes: body.sizes.length > 0 ? { set: body.sizes } : undefined,
        material: body.material || null,
        weight: body.weight ? Number(body.weight) : null,
        dimensions: body.dimensions || null,
        isActive: body.isActive,
        isCustomizable: body.isCustomizable,
        allowImageUpload: body.allowImageUpload,
        customTextFields: body.customTextFields.some((field) => field !== "") ? { set: body.customTextFields } : undefined,
        variants: body.variants.length > 0 ? { create: body.variants } : undefined,
      },
    });

    console.log("✅ Producto agregado:", newProduct);
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json({ error: "Error al agregar producto" }, { status: 500 });
  }
}

// 🔥 Actualizar un producto por ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params?.id;
    if (!id) {
      console.error("❌ No se proporcionó un ID válido.");
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const body = await req.json();
    console.log("📥 Datos recibidos para actualizar:", body);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description || null,
        price: Number(body.price),
        stock: Number(body.stock),
        categoryId: body.categoryId || null,
        images: body.images.length > 0 ? { set: body.images } : undefined,
        colors: body.colors.length > 0 ? { set: body.colors } : undefined,
        sizes: body.sizes.length > 0 ? { set: body.sizes } : undefined,
        material: body.material || null,
        weight: body.weight ? Number(body.weight) : null,
        dimensions: body.dimensions || null,
        isActive: body.isActive,
        isCustomizable: body.isCustomizable,
        allowImageUpload: body.allowImageUpload,
        customTextFields: body.customTextFields.some((field) => field !== "") ? { set: body.customTextFields } : undefined,
        variants: body.variants.length > 0 ? { create: body.variants } : undefined,
      },
    });

    console.log("✅ Producto actualizado:", updatedProduct);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });
  }
}

// 🔥 Eliminar un producto por ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params?.id;
    if (!id) {
      console.error("❌ No se proporcionó un ID válido.");
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    // Eliminar el producto en la base de datos
    const deletedProduct = await prisma.product.delete({ where: { id } });

    console.log("✅ Producto eliminado:", deletedProduct);
    return NextResponse.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}
