/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Permissoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permissoes_nome_key" ON "Permissoes"("nome");
