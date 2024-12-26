/*
  Warnings:

  - Changed the type of `tipo` on the `AlteracaoConta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoAlteracaoConta" AS ENUM ('CRIADA', 'REMOVIDA', 'EDITADA');

-- AlterTable
ALTER TABLE "AlteracaoConta" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoAlteracaoConta" NOT NULL;

-- DropEnum
DROP TYPE "TipoMovimentacaoConta";
