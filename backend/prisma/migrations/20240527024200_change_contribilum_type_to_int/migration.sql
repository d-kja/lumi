/*
  Warnings:

  - Changed the type of `contribilum` on the `Fatura` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Fatura" DROP COLUMN "contribilum",
ADD COLUMN     "contribilum" INTEGER NOT NULL;
