-- CreateTable
CREATE TABLE "Fatura" (
    "id" TEXT NOT NULL,
    "numeroCliente" INTEGER NOT NULL,
    "mesReferencia" TIMESTAMP(3) NOT NULL,
    "energiaEletrica" JSONB NOT NULL,
    "energiaScee" JSONB NOT NULL,
    "energiaCompensada" JSONB NOT NULL,
    "contribilum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
