-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidadeMedida" VARCHAR NOT NULL,
    "local" VARCHAR NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "numero" REAL,
    "data" DATE,
    "texto" TEXT,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Campos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Campos" ADD CONSTRAINT "Campos_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
