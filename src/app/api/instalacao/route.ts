import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, telefone, email, endereco, clienteId } = req.body;
    
    try {
      const newInstalacao = await prisma.instalacao.create({
        data: {
          nome,
          telefone,
          email,
          endereco,
          clienteId,
        },
      });
      res.status(201).json(newInstalacao);
    } catch (error) {
      res.status(500).json({ error: 'Error adding instalacao' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
