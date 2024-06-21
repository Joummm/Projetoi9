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

const NotificacoesPage = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Defina o número de itens por página aqui
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await fetch('/api/notificacao');
        const data = await response.json();
        setNotificacoes(data.notificacoes);
        setLoading(false); // Marca o carregamento como concluído quando os dados são obtidos
      } catch (error) {
        console.error('Erro ao buscar as notificações:', error);
      }
    };

    fetchNotificacoes();
  }, []);

  const totalPages = Math.ceil(notificacoes.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notificacoes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full h-screen bg-white p-4">
      <Table className="w-full bg-white text-black">
        <TableCaption className="text-black">Lista das Notificações</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-black">Info</TableHead>
            <TableHead className="text-black">Tipo</TableHead>
            <TableHead className="text-black">Cliente</TableHead>
            <TableHead className="text-black">Sensor</TableHead>
            <TableHead className="text-black">Alerta</TableHead>
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
            currentItems.map((notificacao) => (
              <TableRow key={(notificacao as any).id} className="text-black">
                <TableCell className="font-medium text-black">{(notificacao as any).info}</TableCell>
                <TableCell className="text-black">{(notificacao as any).tipo}</TableCell>
                <TableCell className="text-black">{(notificacao as any).cliente.nome}</TableCell>
                <TableCell className="text-black">{(notificacao as any).sensor.nome}</TableCell>
                <TableCell className="text-black">{(notificacao as any).alerta.nome}</TableCell>
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

export default NotificacoesPage;
