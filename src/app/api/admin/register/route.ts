import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.adminUser.create({
      data: { name, email, password: hashedPassword, role: role || "admin" },
    });

    return NextResponse.json(admin);
  } catch (error) {
    console.error("Error al registrar admin:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
