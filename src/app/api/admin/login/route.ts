import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin = await prisma.user.findUnique({
    where: { email, role: "admin" },
  });

  if (!admin || admin.password !== password) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  const response = NextResponse.json({ message: "Login exitoso", token });
  response.cookies.set("admin_token", token, { httpOnly: true, maxAge: 86400 });

  return response;
}
