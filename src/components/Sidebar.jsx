import React from 'react';
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1 text-lg font-semibold">
        <img src="/i9_business_logo.jpg" alt="Home" className="home-image" />
      </Link>
      {/* Links */}
      <Link href="/instalacoes" className="text-muted-foreground hover:text-foreground">
        Instalações
      </Link>
      <Link href="/alertas" className="text-muted-foreground hover:text-foreground">
        Alertas Ativos
      </Link>
      <Link href="/notificacoes" className="text-muted-foreground hover:text-foreground">
        Notificações
      </Link>
    </nav>
  );
}

export default Sidebar;
