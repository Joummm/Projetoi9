
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Contar o número de alertas ativos (aqueles sem dataFim)
    const activeAlertCount = await prisma.alerta.count({
      where: {
        dataFim: null,  // Filtra alertas que não têm data de fim
      },
    });

    res.status(200).json({ activeAlertCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar alertas ativos" });
  }
}

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   // Define a data de início da semana passada
//   const lastWeekStart = new Date();
//   lastWeekStart.setDate(lastWeekStart.getDate() - 7);
//   lastWeekStart.setHours(0, 0, 0, 0);

//   // Define a data atual (fim do período)
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   try {
//     const alertCount = await prisma.alerta.count({
//       where: {
//         dataInicio: {
//           gte: lastWeekStart.toISOString(), // maior ou igual ao início da semana passada
//           lt: today.toISOString(),  // menor que a data atual
//         },
//       },
//     });

//     res.status(200).json({ alertCount });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erro ao buscar alertas" });
//   }
// }
