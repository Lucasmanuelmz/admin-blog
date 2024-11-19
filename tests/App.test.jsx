import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Testando o componente App', () => {
  it('Deve retornar o conteúdo completo renderizado', () => {
    render(<App />);
    expect(screen.getByRole('heading').textContent).toMatch(/Texto para teste do componente/i);
  });
});

