import { NextRequest, NextResponse } from "next/server";

// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, telefone, email, endereco, adminId } = req.body;
    
    try {
      const newRevendedor = await prisma.revendedor.create({
        data: {
          nome,
          telefone,
          email,
          endereco,
          adminId,
        },
      });
      res.status(201).json(newRevendedor);
    } catch (error) {
      res.status(500).json({ error: 'Error adding revendedor' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export async function GET(request: NextRequest) {
    try{ 
        const revendedores = await prisma.revendedor.findMany();
        return Response.json({ revendedores });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao buscar revendedores",
                error,
            },
            {
                status: 500,
            });
    }
}

export async function POST(request: NextRequest) {
    const { nome, telefone, email, endereco, adminId } = await request.json();
    try {
        const rev = await prisma.revendedor.create({
            data: {
                nome,
                telefone,
                email,
                endereco,
                adminId
            },
        });
        return Response.json({ message: "Revendedor Criado", rev });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao criar o Revendedor",
                error,
            },
            {
                status: 500,
            });
    }
    }