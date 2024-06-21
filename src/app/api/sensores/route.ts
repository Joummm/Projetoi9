// app/api/sensores-alertas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sensores = await prisma.sensor.findMany({
      include: {
        alertas: {
          where: {
            dataFim: {
              not: null // Verifica se a dataFim não é nula
            },
          },
          select: {
            id: true,
          },
        },
      },
    });

    const sensorData = sensores.map(sensor => ({
      id: sensor.id,
      nome: sensor.nome,
      endereco: sensor.endereco,
      hasActiveAlerts: sensor.alertas && sensor.alertas.length > 0,
    }));

    return NextResponse.json({ sensorData });
  } catch (error) {
    console.error("Erro ao buscar sensores e estado de alertas:", error);
    return NextResponse.json({ error: "Erro ao buscar sensores e estado de alertas" }, { status: 500 });
  }
}
