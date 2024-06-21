/*
  Warnings:

  - You are about to drop the column `valorMaximo` on the `TipoAlerta` table. All the data in the column will be lost.
  - You are about to drop the column `valorMinimo` on the `TipoAlerta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TipoAlerta" DROP COLUMN "valorMaximo",
DROP COLUMN "valorMinimo";
