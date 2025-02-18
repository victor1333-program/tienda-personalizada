import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "Correo no registrado" }, { status: 404 });
  }

  const resetToken = Math.random().toString(36).substring(2, 15);
  await prisma.user.update({
    where: { email },
    data: { resetPasswordToken: resetToken },
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "🔑 Restablecer contraseña",
    text: `Usa este código para restablecer tu contraseña: ${resetToken}`,
  });

  return NextResponse.json({ message: "Correo enviado" });
}
