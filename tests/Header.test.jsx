import { describe, it, expect } from "vitest";
import {render, screen} from '@testing-library/react';
import Header from "../src/components/header";

describe('Retornar o componente header', () => {
  it('Deve retornar todos os elementos do componente',() => {
   render(<Header />)
   expect(screen.getByRole('banner'))
   expect(screen.getAllByRole('link').length).toBeGreaterThan(0)

   expect(screen.getByRole('link',{name: 'Site público'}))
   expect(screen.getByRole('link',{name: 'Assinantes'}))
  })
})