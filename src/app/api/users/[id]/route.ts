import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔹 Tipado de datos esperados en `PUT`
interface UserUpdateRequest {
  name?: string;
  role?: "admin" | "user"; // Solo estos roles permitidos
  isActive?: boolean;
}

// 📥 Obtener un usuario por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: `Error al obtener usuario: ${errorMessage}` }, { status: 500 });
  }
}

// 📤 Actualizar usuario
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const body: UserUpdateRequest = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: `Error al actualizar usuario: ${errorMessage}` }, { status: 500 });
  }
}

// 🚮 Eliminar usuario por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: `Error al eliminar usuario: ${errorMessage}` }, { status: 500 });
  }
}
