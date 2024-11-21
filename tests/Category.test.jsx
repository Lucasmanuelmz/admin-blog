import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryPost from "../src/components/category";

describe("Retornar o componente de criação de categorias", () => {
  it("Deve retornar o formulário", () => {
    render(<CategoryPost />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Deve retornar os elementos do formulário", () => {
    render(<CategoryPost />);
    expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Nova categoria"));
    expect(screen.getByRole("button", { name: "Adicionar nova categoria" }));
  });
});
