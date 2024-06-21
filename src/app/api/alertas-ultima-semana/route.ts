// app/api/alertas-ultima-semana/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const oneWeekAgo = subDays(new Date(), 7);
    const alertasUltimaSemana = await prisma.alerta.count({
      where: {
        dataInicio: {
          gte: oneWeekAgo,
        },
      },
    });
    return NextResponse.json({ alertasUltimaSemana });
  } catch (error) {
    console.error("Erro ao buscar alertas da última semana:", error);
    return NextResponse.json({ error: "Erro ao buscar alertas da última semana" }, { status: 500 });
  }
}
