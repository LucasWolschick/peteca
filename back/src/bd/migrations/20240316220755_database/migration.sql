-- CreateTable
CREATE TABLE "MovimentacaoItem" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "antigaQuantidade" INTEGER,
    "antigaUnidadeMedida" VARCHAR,
    "antigoLocal" VARCHAR,
    "novoQuantidade" INTEGER,
    "novoUnidadeMedida" VARCHAR,
    "novoLocal" VARCHAR,
    "itemId" INTEGER NOT NULL,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "MovimentacaoItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovimentacaoItem" ADD CONSTRAINT "MovimentacaoItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoItem" ADD CONSTRAINT "MovimentacaoItem_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
