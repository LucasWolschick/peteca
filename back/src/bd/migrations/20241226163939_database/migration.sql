/*
  Warnings:

  - You are about to drop the column `banco` on the `Conta` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Conta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoMovimentacaoConta" AS ENUM ('Criacao', 'Remocao', 'Edicao');

-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "banco",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "descricao" VARCHAR NOT NULL,
ADD COLUMN     "nome" VARCHAR NOT NULL;

-- CreateTable
CREATE TABLE "AlteracaoConta" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "antigoNome" VARCHAR,
    "antigaDescricao" VARCHAR,
    "novoNome" VARCHAR,
    "novaDescricao" VARCHAR,
    "tipo" "TipoMovimentacaoItem" NOT NULL,
    "contaId" INTEGER NOT NULL,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "AlteracaoConta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlteracaoConta" ADD CONSTRAINT "AlteracaoConta_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlteracaoConta" ADD CONSTRAINT "AlteracaoConta_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
