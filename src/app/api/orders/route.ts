// ✅ Marcar un pedido como "Completado" y generar factura
export async function PATCH(req: Request) {
  try {
    const { orderId } = await req.json();

    // Actualizamos el estado del pedido
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "completed" },
      include: { user: true, items: true },
    });

    // 📌 Generamos la factura automáticamente
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: updatedOrder.id,
        clientName: updatedOrder.user.name,
        clientEmail: updatedOrder.user.email,
        items: updatedOrder.items,
        subtotal: updatedOrder.total,
        tax: updatedOrder.total * 0.21, // 21% de IVA
        total: updatedOrder.total * 1.21,
      }),
    });

    return NextResponse.json({ message: "Pedido completado y factura generada" });
  } catch (error) {
    console.error("❌ Error al actualizar pedido:", error);
    return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 });
  }
}
