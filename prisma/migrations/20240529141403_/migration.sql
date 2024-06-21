-- AlterTable
ALTER TABLE "Alerta" ALTER COLUMN "valorRegistado" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TipoAlerta" ALTER COLUMN "valorMaximo" DROP DEFAULT,
ALTER COLUMN "valorMinimo" DROP DEFAULT;
