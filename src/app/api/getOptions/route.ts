import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [tiposAlerta, agrupadores, instalacoes, clientes] = await Promise.all([
      prisma.tipoAlerta.findMany(),
      prisma.agrupador.findMany(),
        prisma.instalacao.findMany(),
      prisma.cliente.findMany(),
    ]);

    return NextResponse.json({ tiposAlerta, agrupadores, instalacoes, clientes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch options' }, { status: 500 });
  }
}
