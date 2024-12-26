-- CreateEnum
CREATE TYPE "TipoMovimentacaoItem" AS ENUM ('CRIADO', 'ALTERADO', 'REMOVIDO');

-- CreateEnum
CREATE TYPE "TipoMovimentacaoTransacao" AS ENUM ('Receita', 'Despesa', 'Pendencia');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "ingresso" DATE NOT NULL,
    "nome" VARCHAR NOT NULL,
    "ra" VARCHAR,
    "matricula" VARCHAR,
    "email" VARCHAR NOT NULL,
    "verificado" BOOLEAN NOT NULL,
    "senha" VARCHAR NOT NULL,
    "senha_removida" BOOLEAN NOT NULL DEFAULT true,
    "data_nascimento" DATE NOT NULL,
    "imagem" VARCHAR NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissoes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,

    CONSTRAINT "Permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissoes" (
    "userId" INTEGER NOT NULL,
    "permissaoId" INTEGER NOT NULL,

    CONSTRAINT "UserPermissoes_pkey" PRIMARY KEY ("userId","permissaoId")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR NOT NULL,
    "userId" INTEGER NOT NULL,
    "data_expiracao" DATE NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidadeMedida" VARCHAR NOT NULL,
    "local" VARCHAR NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoItem" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "antigoNome" VARCHAR,
    "antigaQuantidade" INTEGER,
    "antigaUnidadeMedida" VARCHAR,
    "antigoLocal" VARCHAR,
    "novaQuantidade" INTEGER,
    "novaUnidadeMedida" VARCHAR,
    "novoLocal" VARCHAR,
    "novoNome" VARCHAR,
    "tipo" "TipoMovimentacaoItem" NOT NULL,
    "itemId" INTEGER NOT NULL,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "MovimentacaoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "banco" VARCHAR NOT NULL,
    "saldo" MONEY NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoTransacao" (
    "id" SERIAL NOT NULL,
    "valor" MONEY NOT NULL,
    "data" DATE NOT NULL,
    "tipo" "TipoMovimentacaoTransacao" NOT NULL,
    "contaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MovimentacaoTransacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatorioCaixinha" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "pathRelatorio" VARCHAR NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RelatorioCaixinha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Permissoes_nome_key" ON "Permissoes"("nome");

-- AddForeignKey
ALTER TABLE "UserPermissoes" ADD CONSTRAINT "UserPermissoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissoes" ADD CONSTRAINT "UserPermissoes_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "Permissoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoItem" ADD CONSTRAINT "MovimentacaoItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoItem" ADD CONSTRAINT "MovimentacaoItem_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoTransacao" ADD CONSTRAINT "MovimentacaoTransacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoTransacao" ADD CONSTRAINT "MovimentacaoTransacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatorioCaixinha" ADD CONSTRAINT "RelatorioCaixinha_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
