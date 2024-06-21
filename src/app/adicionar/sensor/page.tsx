"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AddSensorPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    descricao: '',
    valorMinimo: 0,
    valorMaximo: 0,
    tipoAlertaId: '',
    agrupadorId: '',
    instalacaoId: '',
  });

  const [options, setOptions] = useState({
    tiposAlerta: [],
    agrupadores: [],
    instalacoes: [],
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
      const response = await fetch('/api/addSensor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sensor added:', result);
        // Reset form or redirect as needed
      } else {
        console.error('Failed to add sensor');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Adicionar Sensor</Title>
        <form onSubmit={handleSubmit}>
          <InputsGrid>
            <InputWrapper>
              <Label>Nome:</Label>
              <Input type="text" name="nome" value={formData.nome} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label>Endereço:</Label>
              <Input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label>Descrição:</Label>
              <Input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label>Valor Mínimo:</Label>
              <Input type="number" name="valorMinimo" value={formData.valorMinimo} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label>Valor Máximo:</Label>
              <Input type="number" name="valorMaximo" value={formData.valorMaximo} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label>Tipo Alerta ID:</Label>
              <Select name="tipoAlertaId" value={formData.tipoAlertaId} onChange={handleChange}>
                <option value="">Selecione</option>
                {options.tiposAlerta.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nomeAlerta}</option>
                ))}
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>Agrupador ID:</Label>
              <Select name="agrupadorId" value={formData.agrupadorId} onChange={handleChange}>
                <option value="">Selecione</option>
                {options.agrupadores.map((agrupador) => (
                  <option key={agrupador.id} value={agrupador.id}>{agrupador.nome}</option>
                ))}
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>Instalação ID:</Label>
              <Select name="instalacaoId" value={formData.instalacaoId} onChange={handleChange}>
                <option value="">Selecione</option>
                {options.instalacoes.map((instalacao) => (
                  <option key={instalacao.id} value={instalacao.id}>{instalacao.nome}</option>
                ))}
              </Select>
            </InputWrapper>
          </InputsGrid>
          <ButtonWrapper>
            <Button type="submit">Adicionar Sensor</Button>
          </ButtonWrapper>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default AddSensorPage;

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

const InputsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const InputWrapper = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 200px;
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
