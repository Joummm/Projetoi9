import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, descricao, instalacaoId } = req.body;
    
    try {
      const newAgrupador = await prisma.agrupador.create({
        data: {
          nome,
          descricao,
          instalacaoId,
        },
      });
      res.status(201).json(newAgrupador);
    } catch (error) {
      res.status(500).json({ error: 'Error adding agrupador' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export async function GET(request: NextRequest) {
    try { 
        const agrupadores = await prisma.agrupador.findMany(); // Alterei para buscar as instalações
        return NextResponse.json({ agrupadores }); // Alterei para NextResponse.json
    } catch (error) {
        console.error('Erro ao buscar os agrupadores:', error); // Alterei para console.error
        return NextResponse.json(
            {
                message: "Erro ao buscar os agrupadores",
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
        const { nome, descricao, instalacaoId } = await request.json();
        const instalacao = await prisma.agrupador.create({ // Alterei para criar uma instalação, não um administrador
            data: {
                nome,
                descricao,
                instalacaoId
            },
        });
        return NextResponse.json({ message: "Agrupador Criado", instalacao }); // Alterei para NextResponse.json
    } catch (error) {
        console.error('Erro ao criar o Agrupador:', error); // Alterei para console.error
        return NextResponse.json(
            {
                message: "Erro ao criar o agrupador",
                error,
            },
            {
                status: 500,
            }
        );
    }
}
