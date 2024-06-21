// src/app/api/sensors/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sensors = await prisma.sensor.findMany();
    return NextResponse.json(sensors, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar sensores:', error);
    return NextResponse.json({ error: 'Erro ao buscar sensores' }, { status: 500 });
  }
}
