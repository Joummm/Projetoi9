import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';
// import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
    try{ 
        const administradores = await prisma.administrador.findMany();
        return Response.json({ administradores });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao buscar administradores",
                error,
            },
            {
                status: 500,
            });
    }
}

export async function POST(request: NextRequest) {
    const { nome, telefone, email, endereco } = await request.json();
    try {
        const admin = await prisma.administrador.create({
            data: {
                nome,
                telefone,
                email,
                endereco
            },
        });
        return Response.json({ message: "Admin Criado", admin });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao criar Admin",
                error,
            },
            {
                status: 500,
            });
    }
}
    


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, telefone, email, endereco } = req.body;
    
    try {
      const newAdministrador = await prisma.administrador.create({
        data: {
          nome,
          telefone,
          email,
          endereco,
        },
      });
      res.status(201).json(newAdministrador);
    } catch (error) {
      res.status(500).json({ error: 'Error adding administrator' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
