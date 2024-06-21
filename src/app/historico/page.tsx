"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Sensor = {
  id: string;
  nome: string;
};

const fetchSensors = async () => {
  const response = await fetch('/api/sensors');
  if (!response.ok) {
    console.error('Erro ao buscar sensores:', response.statusText);
    return [];
  }
  return await response.json();
};

const HomePage = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSensors().then(setSensors);
  }, []);

  const handleSensorClick = (id: string) => {
    router.push(`/historico/${id}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sensores</h1>
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {sensors.map(sensor => (
          <button
            key={sensor.id}
            onClick={() => handleSensorClick(sensor.id)}
            style={{
              padding: '10px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              minWidth: '150px',
            }}
          >
            {sensor.nome}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
