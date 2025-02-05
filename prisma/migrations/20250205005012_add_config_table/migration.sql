-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "invoiceStart" INTEGER NOT NULL DEFAULT 1,
    "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 21.0,
    "orderEmail" TEXT NOT NULL DEFAULT 'pedidos@loviprint.es',
    "contactEmail" TEXT NOT NULL DEFAULT 'contacto@loviprint.es',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);
