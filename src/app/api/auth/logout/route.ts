import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Cierre de sesión exitoso" });

  // 🔴 Eliminar la cookie del token de sesión del administrador
  response.cookies.set("admin_token", "", { httpOnly: true, expires: new Date(0) });

  return response;
}
