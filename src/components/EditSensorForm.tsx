import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const EditSensorForm = ({ sensorId, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    endereco: '',
    valorMinimo: '',
    valorMaximo: ''
  });

  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const response = await fetch(`/api/sensores?id=${sensorId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Erro ao buscar o sensor:', error);
      }
    };

    fetchSensor();
  }, [sensorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/sensores?id=${sensorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      onUpdated();
    } catch (error) {
      console.error('Erro ao atualizar o sensor:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-2xl mb-4 text-black">Editar Sensor</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-black">Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Valor Mínimo:</label>
          <input
            type="number"
            name="valorMinimo"
            value={formData.valorMinimo}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Valor Máximo:</label>
          <input
            type="number"
            name="valorMaximo"
            value={formData.valorMaximo}
            onChange={handleChange}
            className="block w-full mb-4"
          />
          <Button type="submit">Salvar</Button>
          <Button onClick={onClose} className="ml-2">Cancelar</Button>
        </form>
      </div>
    </div>
  );
};

export default EditSensorForm;
