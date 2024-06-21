import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const EditInstalacaoForm = ({ instalacaoId, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  useEffect(() => {
    const fetchInstalacao = async () => {
      try {
        const response = await fetch(`/api/instalacoes?id=${instalacaoId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Erro ao buscar a instalação:', error);
      }
    };

    fetchInstalacao();
  }, [instalacaoId]);

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
      await fetch(`/api/instalacoes?id=${instalacaoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      onUpdated();
    } catch (error) {
      console.error('Erro ao atualizar a instalação:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-2xl mb-4 text-black">Editar Instalação</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-black">Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full mb-2"
          />
          <label className="text-black">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
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

export default EditInstalacaoForm;
