"use client";

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import 'chart.js/auto';
import { useParams } from 'next/navigation';

type HistoricoSensor = {
  id: string;
  data: string;
  hora: string;
  valorRegistado: number;
};

type Sensor = {
  id: string;
  nome: string;
  historicoSensores: HistoricoSensor[];
};

const fetchSensorData = async (id: string) => {
  try {
    const response = await fetch(`/api/sensor/${id}`);
    if (!response.ok) {
      console.error('Erro ao buscar sensor:', response.statusText);
      return null;
    }
    const data = await response.json();
    console.log('Dados do sensor:', data); // Adicionado para depuração
    return data;
  } catch (error) {
    console.error('Erro ao buscar sensor:', error);
    return null;
  }
};

const SensorPage = () => {
  const { id } = useParams();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchSensorData(id as string).then(sensorData => {
        if (sensorData) {
          setSelectedSensor({
            ...sensorData,
            historicoSensores: Array.isArray(sensorData.historicoSensores) ? sensorData.historicoSensores : [],
          });
        }
        setLoading(false);
      });
    }
  }, [id]);

  const exportData = () => {
    if (!selectedSensor) return;
    const csvData = selectedSensor.historicoSensores.map(h => ({
      data: h.data,
      hora: h.hora,
      valorRegistado: h.valorRegistado,
    }));
    const blob = new Blob([JSON.stringify(csvData)], { type: 'application/json' });
    saveAs(blob, `${selectedSensor.nome}-historico.json`);
  };

  if (loading) return <p>Carregando...</p>;
  if (!selectedSensor) return <p>Sensor não encontrado</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>{selectedSensor.nome}</h2>
      <div style={{ marginBottom: '20px' }}>
        {selectedSensor.historicoSensores.length > 0 ? (
          <Line
            data={{
              labels: selectedSensor.historicoSensores.map(h => new Date(h.data).toLocaleDateString()),
              datasets: [{
                label: 'Valor Registrado',
                data: selectedSensor.historicoSensores.map(h => h.valorRegistado),
                fill: false,
                borderColor: '#0070f3'
              }],
            }}
            options={{
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Data'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Valor Registrado'
                  }
                }
              }
            }}
          />
        ) : (
          <p>Nenhum dado de histórico disponível.</p>
        )}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Data</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hora</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Valor Registrado</th>
          </tr>
        </thead>
        <tbody>
          {selectedSensor.historicoSensores.length > 0 ? (
            selectedSensor.historicoSensores.map(h => (
              <tr key={h.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(h.data).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(h.hora).toLocaleTimeString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{h.valorRegistado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Nenhum dado de histórico disponível.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={exportData}
        style={{
          padding: '10px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Exportar Dados
      </button>
    </div>
  );
};

export default SensorPage;
