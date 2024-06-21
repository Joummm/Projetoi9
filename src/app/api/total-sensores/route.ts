// app/api/total-sensores/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalSensores = await prisma.sensor.count();
    return NextResponse.json({ totalSensores });
  } catch (error) {
    console.error("Erro ao buscar o número total de sensores:", error);
    return NextResponse.json({ error: "Erro ao buscar o número total de sensores" }, { status: 500 });
  }
}
