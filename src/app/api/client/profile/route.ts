// src/app/api/client/profile/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Token no proporcionado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const cliente = await prisma.cliente.findUnique({ where: { id: decoded.id } });
    if (!cliente) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("❌ Error al obtener el perfil:", error);
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 });
  }
}
