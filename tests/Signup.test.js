import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';

describe('Retornar o componente signup', ()=> {
  it('Deve retornar o formulário', ()=> {
    render(<SignupForm />)
    expect(screen.getByRole('form')).toBeInTheDocument()
  })
})