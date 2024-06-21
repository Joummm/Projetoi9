import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, sensorId } = req.body;
    
    try {
      const newConfiguracaoNotificacao = await prisma.configuracaoNotificacao.create({
        data: {
          nome,
          sensorId,
        },
      });
      res.status(201).json(newConfiguracaoNotificacao);
    } catch (error) {
      res.status(500).json({ error: 'Error adding configuracaoNotificacao' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
