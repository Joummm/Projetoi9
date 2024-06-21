"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  AlarmSmoke
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from 'react';

function Dashboard() {
  const [alertas, setAlertas] = useState([]);
  const [totalAlertas, setTotalAlertas] = useState(0);
  const [alertasUltimaSemana, setAlertasUltimaSemana] = useState(0);
  const [totalSensores, setTotalSensores] = useState(0);
  const [alertasAtivos, setAlertasAtivos] = useState(0);
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await fetch("/api/alerta");
        const data = await response.json();
        setAlertas(data.alertas);
      } catch (error) {
        console.error("Erro ao buscar os alertas:", error);
      }
    };

    const fetchTotalAlertas = async () => {
      try {
        const response = await fetch("/api/total-alertas");
        const data = await response.json();
        setTotalAlertas(data.totalAlertas);
      } catch (error) {
        console.error("Erro ao buscar o número total de alertas:", error);
      }
    };

    const fetchAlertasUltimaSemana = async () => {
      try {
        const response = await fetch("/api/alertas-ultima-semana");
        const data = await response.json();
        setAlertasUltimaSemana(data.alertasUltimaSemana);
      } catch (error) {
        console.error("Erro ao buscar alertas da última semana:", error);
      }
    };

    const fetchTotalSensores = async () => {
      try {
        const response = await fetch("/api/total-sensores");
        const data = await response.json();
        setTotalSensores(data.totalSensores);
      } catch (error) {
        console.error("Erro ao buscar o número total de sensores:", error);
      }
    };

    const fetchAlertasAtivos = async () => {
      try {
        const response = await fetch("/api/alertas-ativos");
        const data = await response.json();
        setAlertasAtivos(data.alertasAtivos);
      } catch (error) {
        console.error("Erro ao buscar o número de alertas ativos:", error);
      }
    };

    const fetchSensores = async () => {
      try {
        const response = await fetch("/api/sensores");
        const data = await response.json();
        setSensores(data.sensorData);
      } catch (error) {
        console.error("Erro ao buscar os sensores:", error);
      }
    };
    

    fetchAlertas();
    fetchTotalAlertas();
    fetchAlertasUltimaSemana();
    fetchTotalSensores();
    fetchAlertasAtivos();
    fetchSensores();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Alertas
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAlertas}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nº Alertas na Última Semana
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertasUltimaSemana}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nº de Sensores</CardTitle>
              <AlarmSmoke className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSensores}</div>
            </CardContent>
          </Card>
          <Card className="bg-red-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Nº Alertas Ativos</CardTitle>
              <Activity className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">{alertasAtivos}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Alertas Ativos</CardTitle>
                <CardDescription>Lista dos Alertas Ativos neste momento.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/alertas">
                  Ver Todos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo de Alerta</TableHead>
                    <TableHead>Estado da Notificação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertas.length > 0 ? (
                    alertas.map(alerta => (
                      <TableRow key={alerta.id}>
                        <TableCell>{alerta.nome}</TableCell>
                        <TableCell>{alerta.tipoAlerta.nomeAlerta}</TableCell>
                        <TableCell>{alerta.estadoNotificacao ? "Enviada" : "Não Enviada"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <p className="text-center">Sem alertas ativos encontrados.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sensores</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Sensor</TableHead>
                    <TableHead>Localização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensores.length > 0 ? (
                    sensores.map(sensor => (
                      <TableRow key={(sensor as any).id}>
                        <TableCell>
                          <div className="font-medium">{(sensor as any).nome}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{(sensor as any).endereco}</div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <p className="text-center">Sem sensores encontrados.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
