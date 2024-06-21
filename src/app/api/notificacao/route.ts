import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { info, tipo, clienteId, sensorId, alertaId } = req.body;
    
    try {
      const newNotificacao = await prisma.notificacao.create({
        data: {
          info,
          tipo,
          clienteId,
          sensorId,
          alertaId,
        },
      });
      res.status(201).json(newNotificacao);
    } catch (error) {
      res.status(500).json({ error: 'Error adding notificacao' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export async function GET(request: NextRequest) {
    try { 
        const notificacoes = await prisma.notificacao.findMany({
            include: {
                cliente: true, // Inclui os dados do cliente associado a cada notificação
                sensor: true, // Inclui os dados do sensor associado a cada notificação
                alerta: true,
            }
        });
        return NextResponse.json({ notificacoes });
    } catch (error) {
        console.error('Erro ao buscar as notificacoes:', error);
        return NextResponse.json(
            {
                message: "Erro ao buscar as notificacoes",
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
        const { info, tipo, sensorId, alertaId, clienteId } = await request.json();
        const notificacao = await prisma.notificacao.create({ // Alterei para criar uma instalação, não um administrador
            data: {
                info,
                tipo,
                sensorId,
                alertaId,
                clienteId
            },
        });
        return NextResponse.json({ message: "Notificacao Criada", notificacao }); // Alterei para NextResponse.json
    } catch (error) {
        console.error('Erro ao criar a notificacao:', error); // Alterei para console.error
        return NextResponse.json(
            {
                message: "Erro ao criar a notificacao",
                error,
            },
            {
                status: 500,
            }
        );
    }
}
