import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data, hora, valorRegistado, sensorId } = req.body;
    
    try {
      const newHistoricoSensor = await prisma.historicoSensor.create({
        data: {
          data,
          hora,
          valorRegistado,
          sensorId,
        },
      });
      res.status(201).json(newHistoricoSensor);
    } catch (error) {
      res.status(500).json({ error: 'Error adding historicoSensor' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
