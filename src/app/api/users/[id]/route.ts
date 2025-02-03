import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 📥 Obtener un usuario por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
  }
}

// 📤 Actualizar usuario
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, role, isActive } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, role, isActive },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 });
  }
}
// 🚮 Eliminar usuario por ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await prisma.user.delete({
        where: { id: params.id },
      });
  
      return NextResponse.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 });
    }
  }

