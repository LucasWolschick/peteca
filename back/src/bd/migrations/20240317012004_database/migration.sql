/*
  Warnings:

  - You are about to drop the `Campos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campos" DROP CONSTRAINT "Campos_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Campos";
