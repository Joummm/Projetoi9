import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret';

async function registerUser(username: string, password: string, role: UserRole) {
  const hashedPassword = await bcrypt.hash(password, 10);

  let user;

  if (role === 'Administrador') {
    user = await prisma.administrador.create({
      data: {
        nome: username,
        telefone: 0, // Define o telefone conforme necessário
        email: '', // Define o email conforme necessário
        endereco: '', // Define o endereço conforme necessário
        user: {
          create: {
            username,
            password: hashedPassword,
            role,
          },
        },
      },
    });
  } else if (role === 'Revendedor') {
    user = await prisma.revendedor.create({
      data: {
        nome: username,
        telefone: 0, // Define o telefone conforme necessário
        email: '', // Define o email conforme necessário
        endereco: '', // Define o endereço conforme necessário
        user: {
          create: {
            username,
            password: hashedPassword,
            role,
          },
        },
      },
    });
  } else if (role === 'Cliente') {
    user = await prisma.cliente.create({
      data: {
        nome: username,
        telefone: 0, // Define o telefone conforme necessário
        email: '', // Define o email conforme necessário
        endereco: '', // Define o endereço conforme necessário
        user: {
          create: {
            username,
            password: hashedPassword,
            role,
          },
        },
      },
    });
  } else if (role === 'Instalacao') {
    user = await prisma.instalacao.create({
      data: {
        nome: username,
        telefone: 0, // Define o telefone conforme necessário
        email: '', // Define o email conforme necessário
        endereco: '', // Define o endereço conforme necessário
        user: {
          create: {
            username,
            password: hashedPassword,
            role,
          },
        },
      },
    });
  } else {
    throw new Error('Tipo de usuário inválido');
  }

  return user;
}

async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      Administrador: true,
      Revendedor: true,
      Cliente: true,
      Instalacao: true,
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const userDetails = user.Administrador || user.Revendedor || user.Cliente || user.Instalacao;

  if (!userDetails) {
    throw new Error('Detalhes do usuário não encontrados');
  }

  const passwordMatch = await bcrypt.compare(password, userDetails.user.password);
  if (!passwordMatch) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign({ userId: userDetails.id, role: userDetails.user.role }, JWT_SECRET, { expiresIn: '1h' });

  return token;
}

function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export { registerUser, authenticateUser, verifyToken };
