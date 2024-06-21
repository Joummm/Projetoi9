import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const sensor = await prisma.sensor.findUnique({
      where: { id: id },
      include: {
        historicoSensores: true,
      },
    });

    if (!sensor) {
      return NextResponse.json({ error: 'Sensor não encontrado' }, { status: 404 });
    }

    return NextResponse.json(sensor, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar sensor:', error);
    return NextResponse.json({ error: 'Erro ao buscar sensor' }, { status: 500 });
  }
}
