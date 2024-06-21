import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, endereco, descricao, valorMinimo, valorMaximo, tipoAlertaId, agrupadorId, instalacaoId } = body;

  try {
    const newSensor = await prisma.sensor.create({
      data: {
        nome,
        endereco,
        descricao,
        valorMinimo: parseFloat(valorMinimo),
        valorMaximo: parseFloat(valorMaximo),
        tipoAlertaId,
        agrupadorId,
        instalacaoId,
      },
    });

    return NextResponse.json(newSensor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add sensor' }, { status: 500 });
  }
}
