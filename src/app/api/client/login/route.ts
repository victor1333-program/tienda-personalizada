// src/app/api/client/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const cliente = await prisma.cliente.findUnique({ where: { email } });

    if (!cliente || !(await bcrypt.compare(password, cliente.password))) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const token = jwt.sign({ id: cliente.id, email: cliente.email }, process.env.JWT_SECRET!, { expiresIn: "2h" });
    const response = NextResponse.json({ message: "Inicio de sesión exitoso" });
    response.cookies.set("cliente_token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
  }
}
