import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@tienda.com";

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    console.log("⚠️ Usuario administrador ya existente.");
    return;
  }

  // Crear un nuevo usuario administrador
  const hashedPassword = await bcrypt.hash("Admin1234!", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    },
  });

  console.log("✅ Usuario administrador creado: admin@tienda.com / Admin1234!");
}

main()
  .catch((e) => {
    console.error("❌ Error al crear usuario:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
