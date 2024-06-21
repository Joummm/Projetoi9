"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Table = ({ alertas }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Price</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Total Sales</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Created at</th>
          <th scope="col" className="relative px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {alertas.map(alerta => (
          <tr key={alerta.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alerta.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Badge variant={alerta.status === 'Active' ? 'outline' : 'secondary'}>{alerta.status}</Badge>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{alerta.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{alerta.totalSales}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{alerta.createdAt}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-indigo-600 hover:text-indigo-900"><MoreHorizontal className="h-5 w-5" /></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
