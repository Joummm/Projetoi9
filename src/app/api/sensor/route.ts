import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, endereco, descricao, valorMinimo, valorMaximo, tipoAlertaId, agrupadorId, instalacaoId } = req.body;
    
    try {
      const newSensor = await prisma.sensor.create({
        data: {
          nome,
          endereco,
          descricao,
          valorMinimo,
          valorMaximo,
          tipoAlertaId,
          agrupadorId,
          instalacaoId,
        },
      });
      res.status(201).json(newSensor);
    } catch (error) {
      res.status(500).json({ error: 'Error adding sensor' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export async function GET(request: NextRequest) {
  try {
    const instalacaoId = request.nextUrl.searchParams.get("instalacaoId");
    if (!instalacaoId) {
      return NextResponse.json(
        { error: "instalacaoId is required" },
        { status: 400 }
      );
    }

    const sensores = await prisma.sensor.findMany({
      include: {
        instalacao: true,
        tipoAlerta: true,
        agrupador: true,
      },
      where: {
        instalacaoId: instalacaoId,
      },
    });

    return NextResponse.json({ sensores });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao buscar os sensores",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nome, endereco, descricao, tipoAlertaId, agrupadorId, instalacaoId } = await request.json();
    const sensor = await prisma.sensor.create({
      data: {
        nome,
        endereco,
        descricao,
        tipoAlertaId,
        agrupadorId,
        instalacaoId
      },
    });
    return NextResponse.json({ message: "Sensor Criado", sensor });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao criar o sensor",
        error,
      },
      {
        status: 500,
      });
  }
}
