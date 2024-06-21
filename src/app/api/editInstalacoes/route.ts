import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma'; // ou onde quer que esteja o arquivo prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const instalacao = await prisma.instalacao.findUnique({
          where: { id: parseInt(query.id as string) },
        });
        res.status(200).json(instalacao);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a instalação' });
      }
      break;

    case 'PUT':
      try {
        const updatedInstalacao = await prisma.instalacao.update({
          where: { id: parseInt(query.id as string) },
          data: body,
        });
        res.status(200).json(updatedInstalacao);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a instalação' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
