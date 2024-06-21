import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleUser, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <img src="/i9_business_logo.jpg" alt="Home" className="home-image" />
        </Link>
        {/* Links */}
        <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>
        <Link href="/instalacoes" className="text-muted-foreground transition-colors hover:text-foreground">
          Instalações
        </Link>
        <Link href="/alertas" className="text-foreground transition-colors hover:text-foreground">
          Alertas
        </Link>
        <Link href="/notificacoes" className="text-muted-foreground transition-colors hover:text-foreground">
          Notificações
        </Link>
      </nav>
      {/* Mobile Menu */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* Toggle Menu Button */}
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
            <DropdownMenuItem>Editar Perfil</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
