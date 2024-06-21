// "use client";
// // pages/sensor/[id].tsx
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { Line } from 'react-chartjs-2';
// import prisma from '../../lib/prisma';
// import { useState, useEffect } from 'react';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
// } from '@mui/material';

// type SensorData = {
//   id: string;
//   data: string;
//   hora: string;
//   valorRegistado: number;
// };

// type SensorPageProps = {
//   sensorId: string;
//   initialData: SensorData[];
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params;

//   const sensorData = await prisma.historicoSensor.findMany({
//     where: { sensorId: String(id) },
//     orderBy: { data: 'asc' },
//   });

//   return {
//     props: {
//       sensorId: String(id),
//       initialData: JSON.parse(JSON.stringify(sensorData)),
//     },
//   };
// };

// const SensorPage = ({ sensorId, initialData }: SensorPageProps) => {
//   const [sensorData, setSensorData] = useState<SensorData[]>(initialData);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`/api/sensors/${sensorId}`);
//       const data = await res.json();
//       setSensorData(data);
//     };

//     if (!initialData.length) {
//       fetchData();
//     }
//   }, [sensorId, initialData]);

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(sensorData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sensor Data');
//     const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([buffer], { type: 'application/octet-stream' });
//     saveAs(blob, 'sensor_data.xlsx');
//   };

//   const data = {
//     labels: sensorData.map((entry) => entry.data),
//     datasets: [
//       {
//         label: 'Valor Registado',
//         data: sensorData.map((entry) => entry.valorRegistado),
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Sensor Data
//       </Typography>
//       <Line data={data} />
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Data</TableCell>
//             <TableCell>Hora</TableCell>
//             <TableCell>Valor Registado</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {sensorData.map((entry) => (
//             <TableRow key={entry.id}>
//               <TableCell>{entry.data}</TableCell>
//               <TableCell>{entry.hora}</TableCell>
//               <TableCell>{entry.valorRegistado}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Button variant="contained" color="primary" onClick={exportToExcel}>
//         Export to Excel
//       </Button>
//     </Container>
//   );
// };

// export default SensorPage;
