import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("📝 Insertando facturas de prueba...");

  await prisma.invoice.createMany({
    data: [
      {
        orderId: "123e4567-e89b-12d3-a456-426614174000",
        invoiceNumber: "20250001",
        clientName: "Juan Pérez",
        clientEmail: "juan.perez@email.com",
        items: JSON.stringify([
          { name: "Camiseta personalizada", quantity: 2, price: 15 },
          { name: "Taza con logo", quantity: 1, price: 10 },
        ]),
        subtotal: 40.0,
        tax: 8.4, // 21% de IVA
        total: 48.4,
        status: "paid",
        createdAt: new Date("2025-02-01"),
      },
      {
        orderId: "223e4567-e89b-12d3-a456-426614174001",
        invoiceNumber: "20250002",
        clientName: "María López",
        clientEmail: "maria.lopez@email.com",
        items: JSON.stringify([
          { name: "Sudadera con bordado", quantity: 1, price: 35 },
          { name: "Gorra estampada", quantity: 2, price: 12 },
        ]),
        subtotal: 59.0,
        tax: 12.39,
        total: 71.39,
        status: "pending",
        createdAt: new Date("2025-02-02"),
      },
      {
        orderId: "323e4567-e89b-12d3-a456-426614174002",
        invoiceNumber: "20250003",
        clientName: "Carlos Sánchez",
        clientEmail: "carlos.sanchez@email.com",
        items: JSON.stringify([
          { name: "Bolsa ecológica", quantity: 3, price: 5 },
        ]),
        subtotal: 15.0,
        tax: 3.15,
        total: 18.15,
        status: "paid",
        createdAt: new Date("2025-02-03"),
      },
      {
        orderId: "423e4567-e89b-12d3-a456-426614174003",
        invoiceNumber: "20250004",
        clientName: "Laura Fernández",
        clientEmail: "laura.fernandez@email.com",
        items: JSON.stringify([
          { name: "Llavero grabado", quantity: 5, price: 3 },
        ]),
        subtotal: 15.0,
        tax: 3.15,
        total: 18.15,
        status: "pending",
        createdAt: new Date("2025-02-04"),
      },
    ],
  });

  console.log("✅ Facturas de prueba insertadas correctamente.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
