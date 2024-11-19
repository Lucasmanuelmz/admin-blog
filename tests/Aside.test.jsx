import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Aside from '../src/components/aside';

describe('Testado o aside do dashboard', () => {
  it('Deve retornar o componente aside e o conteudo dele', () => {
    render(<Aside />)
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('Deve retornar figure no componente', () => {
    render(<Aside />)
    expect(screen.getByRole('figure')).toBeInTheDocument()
  })

  it('Deve renderizar divs no componente', () => {
    render(<Aside />)
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
  })

  it('Deve retornar o navbar do dashboard dentro do aside', () => {
    render(<Aside />)
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
  });

  it('Deve renderizar um icones', () => {
    render(<Aside />)
    expect(screen.getAllByTestId('icon').length).toBeGreaterThan(0)
  });

  it('Deve retornar os links dentro de navegacao', () => {
    render(<Aside />)
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', {name: 'Home'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Posts'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Criar novo post'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Editar o post'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Categorias'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Criar nova categoria'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Editar categoria'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Autores'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Adicionar autor'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Editar autor'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Usuarios'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Editar usuario'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Adicionar usuario'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Administradores'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Perfil'})).toBeInTheDocument();
  })

  it('Deve retornar listas nao ordenandas', ()=> {
    render(<Aside />)
    expect(screen.getAllByRole('list').length).toBeGreaterThan(0);
  })

  it('Deve retornar listas de cada item', () => {
    render(<Aside />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  })
})