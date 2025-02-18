import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany();
    return NextResponse.json(images);
  } catch (error) {
    console.error("❌ Error al obtener imágenes:", error);
    return NextResponse.json({ error: "Error al cargar imágenes" }, { status: 500 });
  }
}
