import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../src/components/login';

describe('Retornar o formulário de login de usuário', () => {
  it('Deve retornar o conteúdo dentro do formulário', () => {
   render(<LoginForm />)
   expect(screen.getByRole('form')).toBeInTheDocument();

   expect(screen.getByLabelText('Email')).toBeInTheDocument();
   expect(screen.getByLabelText('Senha')).toBeInTheDocument();

   expect(screen.getByRole('button', {name: 'Entrar na conta'})).toBeInTheDocument()
  })
})