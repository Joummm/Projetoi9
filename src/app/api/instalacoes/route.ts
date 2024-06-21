import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // Busca todas as instalações com seus sensores e histórico de sensores
        const instalacoes = await prisma.instalacao.findMany({
            include: {
                sensores: {
                    include: {
                        historicoSensores: true,
                        alertas: {
                            where: {
                                dataFim: null // Considerando que um alerta ativo é aquele que não tem uma data de fim
                            }
                        }
                    }
                }
            }
        });
        return NextResponse.json({ instalacoes });
    } catch (error) {
        console.error('Erro ao buscar as instalações:', error);
        return NextResponse.json(
            {
                message: "Erro ao buscar as instalações",
                error,
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(request: NextRequest) {
    const body = await request.text();
    try {
        const data = JSON.parse(body);
        const { id, nome, telefone, email, endereco } = data;
        const instalacao = await prisma.instalacao.update({
            where: { id: id }, // Aqui é onde definimos o id corretamente
            data: {
                nome,
                telefone: parseInt(telefone),
                email,
                endereco,
            },
        });
        return NextResponse.json({ instalacao });
    } catch (error) {
        console.error('Erro ao atualizar a instalação:', error);
        return NextResponse.json(
            {
                message: "Erro ao atualizar a instalação",
                error,
            },
            {
                status: 500,
            }
        );
    }
}





export async function DELETE(request: NextRequest) {
    const body = await request.text();
    try {
        const data = JSON.parse(body);
        const { id } = data;
        await prisma.instalacao.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Instalação excluída com sucesso" });
    } catch (error) {
        console.error('Erro ao excluir a instalação:', error);
        return NextResponse.json(
            {
                message: "Erro ao excluir a instalação",
                error,
            },
            {
                status: 500,
            }
        );
    }
}



// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//     try {
//         // Busca todas as instalações com seus sensores e histórico de sensores
//         const instalacoes = await prisma.instalacao.findMany({
//             include: {
//                 sensores: {
//                     include: {
//                         historicoSensores: true,
//                         alertas: {
//                             where: {
//                                 dataFim: null // Considerando que um alerta ativo é aquele que não tem uma data de fim
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         return NextResponse.json({ instalacoes });
//     } catch (error) {
//         console.error('Erro ao buscar as instalações:', error);
//         return NextResponse.json(
//             {
//                 message: "Erro ao buscar as instalações",
//                 error,
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }




// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//     try { 
//         // Busca todas as instalações com seus sensores e histórico de sensores
//         const instalacoes = await prisma.instalacao.findMany({
//             include: {
//                 sensores: {
//                     include: {
//                         historicoSensores: true
//                     }
//                 }
//             }
//         });
//         return NextResponse.json({ instalacoes });
//     } catch (error) {
//         console.error('Erro ao buscar as instalações:', error);
//         return NextResponse.json(
//             {
//                 message: "Erro ao buscar as instalações",
//                 error,
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }
