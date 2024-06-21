import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, telefone, email, endereco, clienteId} = body;

  try {
    const newInstalacao = await prisma.instalacao.create({
      data: {
        nome,
        telefone: parseInt(telefone),
        email,
        endereco,
        clienteId,
      },
    });

    return NextResponse.json(newInstalacao, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add instalacao' }, { status: 500 });
  }
}
