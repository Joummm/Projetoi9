// app/api/alertas-ativos/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const alertasAtivos = await prisma.alerta.count({
      where: {
            dataFim: null,
            horarioFim: null,
      },
    });
    return NextResponse.json({ alertasAtivos });
  } catch (error) {
    console.error("Erro ao buscar o número de alertas ativos:", error);
    return NextResponse.json({ error: "Erro ao buscar o número de alertas ativos" }, { status: 500 });
  }
}
