/*
  Warnings:

  - The primary key for the `ProductSupplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ProductSupplier` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ProductSupplier` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ProductSupplier" DROP CONSTRAINT "ProductSupplier_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD CONSTRAINT "ProductSupplier_pkey" PRIMARY KEY ("productId", "supplierId");

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "contact" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetTokenExpires";

-- DropTable
DROP TABLE "Cliente";
