import { NextRequest, NextResponse } from "next/server";

// import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, telefone, email, endereco, revendedorId } = req.body;
    
    try {
      const newCliente = await prisma.cliente.create({
        data: {
          nome,
          telefone,
          email,
          endereco,
          revendedorId,
        },
      });
      res.status(201).json(newCliente);
    } catch (error) {
      res.status(500).json({ error: 'Error adding cliente' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


export async function GET(request: NextRequest) {
    try{ 
        const clientes = await prisma.cliente.findMany();
        return Response.json({ clientes });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao buscar os clientes",
                error,
            },
            {
                status: 500,
            });
    }
}

export async function POST(request: NextRequest) {
    const { nome, telefone, email, endereco, revendedorId } = await request.json();
    try {
        const rev = await prisma.cliente.create({
            data: {
                nome,
                telefone,
                email,
                endereco,
                revendedorId
            },
        });
        return Response.json({ message: "Cliente Criado", rev });
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao criar o cliente",
                error,
            },
            {
                status: 500,
            });
    }
    }