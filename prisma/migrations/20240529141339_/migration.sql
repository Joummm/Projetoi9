-- AlterTable
ALTER TABLE "Alerta" ADD COLUMN     "valorRegistado" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TipoAlerta" ADD COLUMN     "valorMaximo" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "valorMinimo" DOUBLE PRECISION NOT NULL DEFAULT 0;
