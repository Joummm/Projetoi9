import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createUser = async (username: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email
    }
  });
  console.log(`User ${username} created`);
};

createUser('admin', 'adminpassword', 'admin@example.com')
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
