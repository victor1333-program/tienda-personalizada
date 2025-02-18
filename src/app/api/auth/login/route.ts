import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  const response = NextResponse.json({ message: "Login exitoso" });
  response.cookies.set("admin_token", token, { httpOnly: true });
  return response;
}
