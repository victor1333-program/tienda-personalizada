/*
  Warnings:

  - You are about to drop the column `isActive` on the `Cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "isActive",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT;
