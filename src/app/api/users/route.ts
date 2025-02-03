import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ✅ Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log("✅ Usuarios obtenidos:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}
// ✅ Crear un usuario nuevo
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Datos recibidos en API:", body); // 📌 Ver qué datos llegan

    const { name, email, password, role, isActive } = body;

    // 🔹 Validar que los datos obligatorios no estén vacíos
    if (!name || !email || !password) {
      console.error("❌ Datos faltantes:", { name, email, password });
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // 🔹 Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Guardar usuario en la BD con Prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        isActive: isActive ?? true, // Activo por defecto
      },
    });

    console.log("✅ Usuario creado:", newUser);
    return NextResponse.json(newUser);
  } catch (error) {
    console.error("❌ Error en API de usuarios:", error);
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
  }
}
