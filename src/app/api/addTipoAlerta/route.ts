
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { nomeAlerta, descricao} = body;

  try {
    const newTipoAlerta = await prisma.tipoAlerta.create({
      data: {
        nomeAlerta,
        descricao,
      },
    });

    return NextResponse.json(newTipoAlerta, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add tipo de alerta' }, { status: 500 });
  }
}
