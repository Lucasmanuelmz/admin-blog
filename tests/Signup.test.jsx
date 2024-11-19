import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from '../src/components/signup';

describe('Retornar o componente SignupForm', () => {
  it('Deve renderizar o formulário', () => {
    render(<SignupForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('Deve renderizar os inputs do formulário', () => {
    render(<SignupForm />);
    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0); 
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Tel')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar senha')).toBeInTheDocument();
  });

  describe('Retornar select e opções', () => {
    it('Deve renderizar o select', () => {
      render(<SignupForm />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByLabelText('Selecione seu cargo')).toBeInTheDocument();
    });

    it('Deve renderizar as opções', () => {
      render(<SignupForm />);
      expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
      expect(screen.getByRole('option', { name: 'Usuário' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Administrador' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Autor' })).toBeInTheDocument();
    });
  });

  it('Deve renderizar o botão e verificar seu texto', () => {
    render(<SignupForm />);
    expect(screen.getByRole('button', { name: 'Enviar formulário' })).toBeInTheDocument();
  });
});
