// pages/api/protected.ts
import { NextApiRequest, NextApiResponse } from 'next';
import protectedRoute from '../middleware/protected-route';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Lógica da rota protegida
  res.status(200).json({ message: 'You have access to this protected route.' });
};

export default protectedRoute(handler);
