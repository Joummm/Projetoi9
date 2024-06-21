import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdicionarItems = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ textAlign: 'center', padding: '20px' }}>
        <CardHeader>
          <CardTitle>Adicionar</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button>
              <a href="/adicionar/sensor" style={{ textDecoration: 'none', color: 'inherit' }}>Criar Sensor</a>
            </Button>
            <Button>
              <a href="/adicionar/instalacao" style={{ textDecoration: 'none', color: 'inherit' }}>Criar Instalação</a>
            </Button>
            <Button>
              <a href="/adicionar/tipoAlerta" style={{ textDecoration: 'none', color: 'inherit' }}>Criar Tipo Alerta</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdicionarItems;
