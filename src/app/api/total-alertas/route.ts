// app/api/total-alertas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalAlertas = await prisma.alerta.count();
    return NextResponse.json({ totalAlertas });
  } catch (error) {
    console.error("Erro ao buscar o número total de alertas:", error);
    return NextResponse.json({ error: "Erro ao buscar o número total de alertas" }, { status: 500 });
  }
}
