// middleware/protected-route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const protectedRoute = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const role = session.user.role;

  if (req.method === 'GET') {
    let data;

    if (role === 'Administrador') {
      data = await prisma.administrador.findUnique({
        where: { userId },
        include: { revendedores: true },
      });
    } else if (role === 'Revendedor') {
      data = await prisma.revendedor.findUnique({
        where: { userId },
        include: { clientes: true },
      });
    } else if (role === 'Cliente') {
      data = await prisma.cliente.findUnique({
        where: { userId },
        include: { instalacoes: true },
      });
    } else if (role === 'Instalacao') {
      data = await prisma.instalacao.findUnique({
        where: { userId },
        include: { agrupadores: true, sensores: true },
      });
    }

    return res.status(200).json(data);
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default protectedRoute;
