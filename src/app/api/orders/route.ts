import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todos los pedidos (GET)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({ include: { user: true } });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 });
  }
}

// Crear un nuevo pedido (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOrder = await prisma.order.create({ data: body });
    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear pedido" }, { status: 500 });
  }
}
