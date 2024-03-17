/*
  Warnings:

  - You are about to drop the column `novoQuantidade` on the `MovimentacaoItem` table. All the data in the column will be lost.
  - You are about to drop the column `novoUnidadeMedida` on the `MovimentacaoItem` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `MovimentacaoItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoMovimentacaoItem" AS ENUM ('CRIADO', 'ALTERADO', 'REMOVIDO');

-- AlterTable
ALTER TABLE "MovimentacaoItem" DROP COLUMN "novoQuantidade",
DROP COLUMN "novoUnidadeMedida",
ADD COLUMN     "antigoNome" VARCHAR,
ADD COLUMN     "novaQuantidade" INTEGER,
ADD COLUMN     "novaUnidadeMedida" VARCHAR,
ADD COLUMN     "novoNome" VARCHAR,
ADD COLUMN     "tipo" "TipoMovimentacaoItem" NOT NULL;
