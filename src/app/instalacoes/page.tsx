"use client";
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover2";
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import EditInstalacaoForm from '@/components/EditInstalacaoForm';
import EditSensorForm from '@/components/EditSensorForm';

const InstalacoesPage = () => {
  const [instalacoes, setInstalacoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  const [editingInstalacaoId, setEditingInstalacaoId] = useState<string | null>(null);
  const [editingSensorId, setEditingSensorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstalacoes = async () => {
      try {
        const response = await fetch('/api/instalacoes');
        const data = await response.json();
        setInstalacoes(data.instalacoes);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as instalações:', error);
      }
    };

    fetchInstalacoes();
  }, []);

  const totalPages = instalacoes.length > 0 ? Math.ceil(instalacoes.length / itemsPerPage) : 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = instalacoes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEditInstalacao = (instalacaoId) => {
    setEditingInstalacaoId(instalacaoId);
  };

  const handleEditSensor = (sensorId) => {
    setEditingSensorId(sensorId);
  };

  const handleUpdate = () => {
    setEditingInstalacaoId(null);
    setEditingSensorId(null);
    // Reload data
    setLoading(true);
    fetchInstalacoes();
  };

  return (
    <div className="w-full h-screen bg-white p-4">
      <Table className="w-full bg-white text-black">
        <TableCaption className="text-black">Lista das Instalações</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-black">Nome</TableHead>
            <TableHead className="text-black">Telefone</TableHead>
            <TableHead className="text-black">Email</TableHead>
            <TableHead className="text-black">Endereço</TableHead>
            <TableHead className="text-black">Editar</TableHead>
            <TableHead className="text-right text-black">Ver Sensores</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton className="w-full h-10" />
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((instalacao) => (
              <TableRow key={instalacao.id} className="text-black">
                <TableCell className="font-medium text-black">{instalacao.nome}</TableCell>
                <TableCell className="text-black">{instalacao.telefone}</TableCell>
                <TableCell className="text-black">{instalacao.email}</TableCell>
                <TableCell className="text-black">{instalacao.endereco}</TableCell>
                <TableCell className="text-black">
                  <Button onClick={() => handleEditInstalacao(instalacao.id)}>Editar</Button>
                </TableCell>
                <TableCell className="text-right text-black">
                  <Popover>
                    <PopoverTrigger className="text-black">Open</PopoverTrigger>
                    <PopoverContent className="text-black bg-white">
                      <div>
                        <p className='text-black'>Lista de Sensores</p>
                        <Table className="text-black bg-white">
                          <TableCaption className="text-black">Lista dos Sensores</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px] text-black">Nome</TableHead>
                              <TableHead className="text-black">Descrição</TableHead>
                              <TableHead className="text-black">Alertas Ativos</TableHead>
                              <TableHead className="text-black">Localização</TableHead>
                              <TableHead className="text-black">Editar</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {instalacao.sensores.map((sensor) => (
                              <TableRow key={sensor.id} className="text-black">
                                <TableCell className="font-medium text-black">{sensor.nome}</TableCell>
                                <TableCell className="text-black">{sensor.descricao}</TableCell>
                                <TableCell className="text-black">{sensor.alertas && sensor.alertas.length > 0 ? 'Sim' : 'Não'}</TableCell>
                                <TableCell className="text-black">{sensor.endereco}</TableCell>
                                <TableCell className="text-black">
                                  <Button onClick={() => handleEditSensor(sensor.id)}>Editar</Button>
                                </TableCell>
                                <TableCell className="text-right text-black">
                                  <Popover>
                                    <PopoverTrigger className="text-black">Ver Histórico</PopoverTrigger>
                                    <PopoverContent className="text-black bg-white">
                                      <Table className="text-black bg-white">
                                        <TableCaption className="text-black">Histórico do Sensor</TableCaption>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead className="text-black">Data</TableHead>
                                            <TableHead className="text-black">Valor Registrado</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {sensor.historicoSensores && sensor.historicoSensores.length > 0 ? (
                                            sensor.historicoSensores.map((historico) => (
                                              <TableRow key={historico.id} className="text-black">
                                                <TableCell className="text-black">{new Date(historico.data).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-black">{historico.valorRegistrado}</TableCell>
                                              </TableRow>
                                            ))
                                          ) : (
                                            <TableRow className="text-black">
                                              <TableCell className="text-black" colSpan={2}>Sem histórico</TableCell>
                                            </TableRow>
                                          )}
                                        </TableBody>
                                      </Table>
                                    </PopoverContent>
                                  </Popover>
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
        </TableBody>
      </Table>

      <Pagination className="mt-4 text-black">
        <PaginationContent className="text-black">
          <PaginationItem>
            <PaginationPrevious onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => paginate(i + 1)}>{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {editingInstalacaoId && (
        <EditInstalacaoForm
          instalacaoId={editingInstalacaoId}
          onClose={() => setEditingInstalacaoId(null)}
          onUpdated={handleUpdate}
        />
      )}

      {editingSensorId && (
        <EditSensorForm
          sensorId={editingSensorId}
          onClose={() => setEditingSensorId(null)}
          onUpdated={handleUpdate}
        />
      )}
    </div>
  );
}

export default InstalacoesPage;
