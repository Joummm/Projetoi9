// import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';
// import prisma from '@/lib/prisma'; // Importação corrigida

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: NextRequest) {
//   try {
//     const { sensorId } = await request.json();

//     const sensor = await prisma.sensor.findUnique({
//       where: { id: sensorId },
//       include: {
//         instalacao: {
//           include: {
//             cliente: {
//               include: {
//                 user: true,
//               },
//             },
//           },
//         },
//         alertas: true,
//       },
//     });

//     if (!sensor || !sensor.instalacao || !sensor.instalacao.cliente || !sensor.instalacao.cliente.user) {
//       throw new Error('Sensor or associated user not found');
//     }

//     const user = sensor.instalacao.cliente.user;
//     const alerta = sensor.alertas;

//     const emailContent = `
//       <h1>Alerta Pendente no Sensor</h1>
//       <p>Olá ${user.username},</p>
//       <p>O sensor <strong>${sensor.nome}</strong> localizado em <strong>${sensor.endereco}</strong> registrou um alerta.</p>
//       <p>Detalhes do Alerta:</p>
//       <ul>
//         <li>Nome do Alerta: ${alerta.nome}</li>
//         <li>Data de Início: ${alerta.dataInicio}</li>
//       </ul>
//       <p>Por favor, verifique o sensor para mais detalhes.</p>
//     `;

//     const data = await resend.emails.send({
//       from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
//         //   to: [user.email],~
//         to: ['joaonunes.cpv@gmail.com'],
//       subject: 'Atenção: Problema com o Sensor',
//       html: emailContent,
//     });

//     return NextResponse.json({ data });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: err.message });
//   }
// }



import { NextResponse } from "next/server";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        

        const data = await resend.emails.send({
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
            to: ['joaonunes.cpv@gmail.com'],
            subject: "Atenção Problema com o Sensor",
            html: "Anomalia encontrada no sensor <strong>SENSOR 1</strong> a temperatura atual é de <strong>10ºC</strong> e o valor definido como normal é entre <strong>-5ºC</strong> e <strong>5ºC</strong>. <br>Por favor, verifique o sensor o mais rápido possível.",
        });
        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ err });
    }
}