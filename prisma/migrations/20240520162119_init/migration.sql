-- CreateTable
CREATE TABLE "Administrador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revendedor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Revendedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "revendedorId" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instalacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "Instalacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agrupador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "instalacaoId" TEXT NOT NULL,

    CONSTRAINT "Agrupador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "horarioInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horarioFim" TIMESTAMP(3),
    "estadoNotificacao" BOOLEAN NOT NULL DEFAULT false,
    "tipoAlertaId" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "alertaId" TEXT NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoSensor" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorRegistado" INTEGER NOT NULL,
    "sensorId" TEXT NOT NULL,

    CONSTRAINT "HistoricoSensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipoAlertaId" TEXT NOT NULL,
    "agrupadorId" TEXT NOT NULL,
    "instalacaoId" TEXT NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoAlerta" (
    "id" TEXT NOT NULL,
    "nomeAlerta" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "TipoAlerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracaoNotificacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,

    CONSTRAINT "ConfiguracaoNotificacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alerta_sensorId_key" ON "Alerta"("sensorId");

-- CreateIndex
CREATE UNIQUE INDEX "Notificacao_alertaId_key" ON "Notificacao"("alertaId");

-- CreateIndex
CREATE UNIQUE INDEX "HistoricoSensor_sensorId_key" ON "HistoricoSensor"("sensorId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoNotificacao_sensorId_key" ON "ConfiguracaoNotificacao"("sensorId");

-- AddForeignKey
ALTER TABLE "Revendedor" ADD CONSTRAINT "Revendedor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Administrador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_revendedorId_fkey" FOREIGN KEY ("revendedorId") REFERENCES "Revendedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instalacao" ADD CONSTRAINT "Instalacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agrupador" ADD CONSTRAINT "Agrupador_instalacaoId_fkey" FOREIGN KEY ("instalacaoId") REFERENCES "Instalacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_tipoAlertaId_fkey" FOREIGN KEY ("tipoAlertaId") REFERENCES "TipoAlerta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_alertaId_fkey" FOREIGN KEY ("alertaId") REFERENCES "Alerta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoSensor" ADD CONSTRAINT "HistoricoSensor_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_tipoAlertaId_fkey" FOREIGN KEY ("tipoAlertaId") REFERENCES "TipoAlerta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_agrupadorId_fkey" FOREIGN KEY ("agrupadorId") REFERENCES "Agrupador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_instalacaoId_fkey" FOREIGN KEY ("instalacaoId") REFERENCES "Instalacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguracaoNotificacao" ADD CONSTRAINT "ConfiguracaoNotificacao_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
