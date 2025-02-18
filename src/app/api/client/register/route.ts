import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, address } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const cliente = await prisma.cliente.create({
      data: { name, email, password: hashedPassword, phone, address },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
