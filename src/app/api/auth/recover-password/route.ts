import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  // Validar que se reciba el correo
  if (!email) {
    return NextResponse.json({ error: "El correo es obligatorio" }, { status: 400 });
  }

  // Simular respuesta exitosa
  console.log(`📧 Instrucciones enviadas al correo: ${email}`);
  return NextResponse.json({ message: "Instrucciones enviadas al correo" });
}
