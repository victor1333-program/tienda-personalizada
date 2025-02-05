const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ejecutando seed de usuarios, pedidos y facturas de prueba...");

  // 🔹 1️⃣ Crear un usuario de prueba si no existe
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Usuario Prueba",
        email: "usuario@prueba.com",
        password: "hashedpassword", // Asegúrate de usar un hash real en producción
        role: "cliente",
        isActive: true,
      },
    });
    console.log("✅ Usuario de prueba creado.");
  } else {
    console.log("⚠️ Usuario de prueba ya existente.");
  }

  // 🔹 2️⃣ Crear pedidos de prueba usando el `user.id`
  const order1 = await prisma.order.create({
    data: {
      userId: user.id,
      total: 41.97,
      status: "completed",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user.id,
      total: 29.99,
      status: "pending",
    },
  });

  console.log("✅ Pedidos creados correctamente.");

  // 🔹 3️⃣ Crear facturas ficticias vinculadas a los pedidos
  const facturas = [
    {
      invoiceNumber: "20250001",
      orderId: order1.id, // Ahora usamos el ID generado
      clientName: "Juan Pérez",
      clientEmail: "juanperez@example.com",
      items: JSON.stringify([
        { product: "Camiseta personalizada", quantity: 2, price: 15.99 },
        { product: "Taza con foto", quantity: 1, price: 9.99 },
      ]),
      subtotal: 41.97,
      tax: 41.97 * 0.21,
      total: 41.97 + 41.97 * 0.21,
      status: "paid",
      createdAt: new Date("2025-02-01"),
    },
    {
      invoiceNumber: "20250002",
      orderId: order2.id, // Ahora usamos el ID generado
      clientName: "María Gómez",
      clientEmail: "mariagomez@example.com",
      items: JSON.stringify([{ product: "Sudadera con logo", quantity: 1, price: 29.99 }]),
      subtotal: 29.99,
      tax: 29.99 * 0.21,
      total: 29.99 + 29.99 * 0.21,
      status: "pending",
      createdAt: new Date("2025-02-05"),
    },
  ];

  for (const factura of facturas) {
    await prisma.invoice.create({ data: factura });
  }

  console.log("✅ Facturas de prueba insertadas correctamente.");
}

main()
  .catch((e) => console.error("❌ Error en el seed:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
