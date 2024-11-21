import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PostEditor from "../src/components/createPost";

describe("Criando artigo com Rich Text Editor", () => {
  const mockCategories = [
    { id: "1", name: "Tecnologia" },
    { id: "2", name: "Saúde" },
  ];

  const mockUserId = "123";

  it("deve renderizar todos os campos do formulário", () => {
    render(<PostEditor userId={mockUserId} categories={mockCategories} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Adicione uma imagem ao artigo/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Conteúdo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Publicar Artigo/i }),
    ).toBeInTheDocument();
  });

  it("deve permitir inserir dados nos campos de texto", async () => {
    render(<PostEditor userId={mockUserId} categories={mockCategories} />);

    const titleInput = screen.getByLabelText(/Título/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);

    await userEvent.type(titleInput, "Meu Título");
    await userEvent.type(descriptionInput, "Esta é a descrição do artigo.");

    expect(titleInput).toHaveValue("Meu Título");
    expect(descriptionInput).toHaveValue("Esta é a descrição do artigo.");
  });

  it("deve permitir selecionar uma categoria", async () => {
    render(<PostEditor userId={mockUserId} categories={mockCategories} />);

    const categorySelect = screen.getByLabelText(/Categoria/i);

    expect(categorySelect).toHaveValue("1");
    await userEvent.selectOptions(categorySelect, "2");
    expect(categorySelect).toHaveValue("2");
  });

  it("deve chamar o evento de envio com os dados corretos", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<PostEditor userId={mockUserId} categories={mockCategories} />);

    const titleInput = screen.getByLabelText(/Título/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const categorySelect = screen.getByLabelText(/Categoria/i);
    const submitButton = screen.getByRole("button", {
      name: /Publicar Artigo/i,
    });

    await userEvent.type(titleInput, "Título de Teste");
    await userEvent.type(descriptionInput, "Descrição de Teste");
    await userEvent.selectOptions(categorySelect, "2");
    fireEvent.submit(screen.getByRole("form"));

    expect(consoleSpy).toHaveBeenCalledWith("Dados enviados ao backend:", {
      title: "Título de Teste",
      description: "Descrição de Teste",
      article: expect.any(Object),
      categoryId: "2",
      userId: mockUserId,
      image: null,
    });

    consoleSpy.mockRestore();
  });

  it("deve exibir o nome do arquivo ao fazer upload de imagem", async () => {
    render(<PostEditor userId={mockUserId} categories={mockCategories} />);

    const file = new File(["imagem"], "imagem-teste.png", {
      type: "image/png",
    });
    const imageInput = screen.getByLabelText(/Adicione uma imagem ao artigo/i);

    await userEvent.upload(imageInput, file);

    expect(screen.getByText(/Imagem selecionada:/i)).toHaveTextContent(
      "Imagem selecionada: imagem-teste.png",
    );
  });
});
