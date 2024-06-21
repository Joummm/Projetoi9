"use client";

import React, { useState } from 'react';
import styled from 'styled-components';

const AddTipoAlertaPage = () => {
  const [formData, setFormData] = useState({
    nomeAlerta: '',
    descricao: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addTipoAlerta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Tipo Alerta added:', result);
        // Reset form or redirect as needed
      } else {
        console.error('Failed to add tipo alerta');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Adicionar Tipo de Alerta</Title>
        <form onSubmit={handleSubmit}>
          <InputsGrid>
            <InputWrapper>
              <Label>Nome Tipo de Alerta:</Label>
              <Input type="text" name="nomeAlerta" value={formData.nomeAlerta} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label>Descrição:</Label>
              <Input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
            </InputWrapper>
          </InputsGrid>
          <ButtonWrapper>
            <Button type="submit">Adicionar Tipo de Alerta</Button>
          </ButtonWrapper>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default AddTipoAlertaPage;

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
