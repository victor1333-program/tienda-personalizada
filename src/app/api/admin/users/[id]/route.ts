import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de que Prisma esté configurado

// 📥 Obtener usuario por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
  }
}

// 📤 Actualizar usuario
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 });
  }
}
