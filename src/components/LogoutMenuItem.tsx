"use client";
import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function LogoutMenuItem() {
  const handleLogout = async () => {
    try {
      // Realizar a chamada à API para fazer logout
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "same-origin",
      });

      if (response.ok) {
        // Se o logout for bem-sucedido, redirecionar para a página de login
        window.location.href = "/login";
      } else {
        // Lidar com erros, se necessário
        console.error("Erro ao realizar o logout:", response.statusText);
      }
    } catch (error) {
      // Lidar com erros de rede ou outros erros
      console.error("Erro ao realizar o logout:", error);
    }
  };

  return (
    <DropdownMenuItem>
      <a href="/login" onClick={handleLogout}>
        Logout
      </a>
    </DropdownMenuItem>
  );
}
