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

import { Skeleton } from "@/components/ui/skeleton";

const AlertasAtivosPage = () => {
  const [alertas, setAlertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Defina o número de itens por página aqui
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await fetch('/api/alerta');
        const data = await response.json();
        setAlertas(data.alertas);
        setLoading(false); // Marca o carregamento como concluído quando os dados são obtidos
      } catch (error) {
        console.error('Erro ao buscar as instalações:', error);
      }
    };

    fetchAlertas();
  }, []);

  const totalPages = Math.ceil(alertas.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alertas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full h-screen bg-white p-4">
      <Table className="w-full bg-white text-black">
        <TableCaption className="text-black">Lista dos Alertas Ativos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Nome</TableHead>
            <TableHead className="text-black">Data</TableHead>
            <TableHead className="text-black">Sensor</TableHead>
            <TableHead className="text-black">Tipo do Alerta</TableHead>
            <TableHead className="text-black">Estado da Notificação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Renderiza os esqueletos enquanto os dados estão sendo carregados */}
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Skeleton className="w-full h-10" />
              </TableCell>
            </TableRow>
          ) : (
            // Renderiza os itens da tabela quando os dados estão disponíveis
            currentItems.map((alerta) => (
              <TableRow key={(alerta as any).id} className="text-black">
                <TableCell className="font-medium text-black">{(alerta as any).nome}</TableCell>
                <TableCell className="text-black">{(alerta as any).dataInicio}</TableCell>
                <TableCell className="text-black">{(alerta as any).sensor.nome}</TableCell>
                <TableCell className="text-black">{(alerta as any).tipoAlerta.nomeAlerta}</TableCell>
                <TableCell className="text-black">{(alerta as any).estadoNotificacao ? "Enviada" : "Não Enviada"}</TableCell>
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
              <PaginationLink onClick={() => paginate(i + 1)} className="text-black">{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default AlertasAtivosPage;
