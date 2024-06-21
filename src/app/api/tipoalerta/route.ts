import { NextRequest, NextResponse } from "next/server";

// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nomeAlerta, descricao } = req.body;
    
    try {
      const newTipoAlerta = await prisma.tipoAlerta.create({
        data: {
          nomeAlerta,
          descricao,
        },
      });
      res.status(201).json(newTipoAlerta);
    } catch (error) {
      res.status(500).json({ error: 'Error adding tipoAlerta' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export async function GET(request: NextRequest) {
    try{ 
        const tipoalertas = await prisma.tipoAlerta.findMany();
        return Response.json({ tipoalertas });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao buscar o tipo de alerta",
                error,
            },
            {
                status: 500,
            });
    }
}

export async function POST(request: NextRequest) {
    const { nomeAlerta, descricao } = await request.json();
    try {
        const rev = await prisma.tipoAlerta.create({
            data: {
                nomeAlerta,
                descricao
            },
        });
        return Response.json({ message: "Tipo de Alerta Criado", rev });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao criar o tipo de alerta",
                error,
            },
            {
                status: 500,
            });
    }
    }