"use client";

import React, { useState, useEffect } from 'react';
import { fetchInstalacoes } from '@/app/api/instalacoes/route'; // Suponha que exista um módulo de API separado

import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover2';
import { Popover3, PopoverContent3, PopoverTrigger3 } from '@/components/ui/popover3';

const TabelaInstalacoes = () => {
  const [instalacoes, setInstalacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInstalacoes(); // Suponha que esta função retorna os dados das instalações
        setInstalacoes(data.instalacoes);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar as instalações:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <TableRow>
          <TableCell colSpan={5}>
            <Skeleton className="w-full h-10" />
          </TableCell>
        </TableRow>
      ) : (
        instalacoes.map(instalacao => (
          <TableRow key={instalacao.id}>
            <TableCell className="font-medium">{instalacao.nome}</TableCell>
            <TableCell>{instalacao.telefone}</TableCell>
            <TableCell>{instalacao.email}</TableCell>
            <TableCell>{instalacao.endereco}</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                  <div>
                    {/* Renderização da tabela de sensores */}
                    <Table>
                      <TableCaption>Lista dos Sensores</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Nome</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Alertas Ativos</TableHead>
                          <TableHead>Endereço</TableHead>
                          <TableHead className="text-right">Ver Histórico</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {instalacao.sensores.map(sensor => (
                          <TableRow key={sensor.id}>
                            <TableCell className="font-medium">{sensor.nome}</TableCell>
                            <TableCell>{sensor.descricao}</TableCell>
                            <TableCell>{sensor.email}</TableCell>
                            <TableCell>{sensor.endereco}</TableCell>
                            <TableCell className="text-right">
                              <Popover3>
                                <PopoverTrigger3>Open</PopoverTrigger3>
                                <PopoverContent3>
                                  {/* Conteúdo do histórico de sensores */}
                                </PopoverContent3>
                              </Popover3>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))
      )}
    </div>
  );
};

export default TabelaInstalacoes;
