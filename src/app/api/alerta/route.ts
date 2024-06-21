import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, dataInicio, dataFim, horarioInicio, horarioFim, estadoNotificacao, valorRegistado, tipoAlertaId, sensorId } = req.body;
    
    try {
      const newAlerta = await prisma.alerta.create({
        data: {
          nome,
          dataInicio,
          dataFim,
          horarioInicio,
          horarioFim,
          estadoNotificacao,
          valorRegistado,
          tipoAlertaId,
          sensorId,
        },
      });
      res.status(201).json(newAlerta);
    } catch (error) {
      res.status(500).json({ error: 'Error adding alerta' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export async function GET(request: NextRequest) {
    try { 
        const alertasAtivos = await prisma.alerta.findMany({
            where: {
                dataFim: null, // DataFim é nulo
                horarioFim: null // HorarioFim é nulo
            },
            include: {
                tipoAlerta: true,
                sensor: true
            }
        });
        return NextResponse.json({ alertas: alertasAtivos });
    } catch (error) {
        console.error('Erro ao buscar os alertas:', error);
        return NextResponse.json(
            {
                message: "Erro ao buscar os alertas",
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
        const { nome, estadoNotificacao, tipoAlertaId, sensorId } = await request.json();
        const alerta = await prisma.alerta.create({ // Alterei para criar uma instalação, não um administrador
            data: {
                nome,
                estadoNotificacao,
                tipoAlertaId,
                sensorId
            },
        });
        return NextResponse.json({ message: "Alerta Criado", alerta }); // Alterei para NextResponse.json
    } catch (error) {
        console.error('Erro ao criar o Alerta:', error); // Alterei para console.error
        return NextResponse.json(
            {
                message: "Erro ao criar o Alerta",
                error,
            },
            {
                status: 500,
            }
        );
    }
}
// export async function GET(request: NextRequest) {
//     try { 
//         const alertas = await prisma.alerta.findMany(); // Alterei para buscar as instalações
//         return NextResponse.json({ alertas }); // Alterei para NextResponse.json
//     } catch (error) {
//         console.error('Erro ao buscar os alertas:', error); // Alterei para console.error
//         return NextResponse.json(
//             {
//                 message: "Erro ao buscar os alertas",
//                 error,
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }
