"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AddInstalacaoPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    clientId: '',
  });

  const [options, setOptions] = useState({
    clientes: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/getOptions');
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addInstalacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Instalacao added:', result);
        // Reset form or redirect as needed
      } else {
        console.error('Failed to add instalacao');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Adicionar Instalação</Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>Nome:</Label>
            <Input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper>
            <Label>Telefone:</Label>
            <Input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper>
            <Label>Email:</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper>
            <Label>Endereço:</Label>
            <Input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper>
            <Label>Cliente ID:</Label>
            <Select name="clienteId" value={formData.clientId} onChange={handleChange}>
              <option value="">Selecione</option>
              {options.clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </Select>
          </InputWrapper>
          <Button type="submit">Adicionar Instalação</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default AddInstalacaoPage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0e0e0;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
`;

const Button = styled.button`
  width: 100%;
  background: #007bff;
  color: #fff;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
