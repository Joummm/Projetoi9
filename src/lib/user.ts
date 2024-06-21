// lib/user.ts
import bcrypt from 'bcryptjs';
import prisma from './prisma';

export async function createUser(username: string, password: string, email: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
      role: 'Cliente', // ou qualquer outro papel padrão
    },
  });

  return user;
}
