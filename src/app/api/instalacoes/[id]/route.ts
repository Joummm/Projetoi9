import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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


// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (!id) {
//     return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
//   }

//   try {
//     const instalacao = await prisma.instalacao.findUnique({
//       where: { id },
//     });

//     if (!instalacao) {
//       return NextResponse.json({ error: 'Instalação não encontrada' }, { status: 404 });
//     }

//     return NextResponse.json(instalacao, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Erro ao buscar a instalação' }, { status: 500 });
//   }
// }

// export async function PUT(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (!id) {
//     return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
//   }

//   try {
//     const data = await request.json();
//     const { nome, telefone, email, endereco } = data;

//     const updatedInstalacao = await prisma.instalacao.update({
//       where: { id },
//       data: { nome, telefone, email, endereco },
//     });

//     return NextResponse.json(updatedInstalacao, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Erro ao atualizar a instalação' }, { status: 500 });
//   }
// }
