import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.galleryImage.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error al eliminar imagen:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
