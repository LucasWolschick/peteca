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
    "admin" BOOLEAN NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "imagem" VARCHAR NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserPermissoes" ADD CONSTRAINT "UserPermissoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissoes" ADD CONSTRAINT "UserPermissoes_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "Permissoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
