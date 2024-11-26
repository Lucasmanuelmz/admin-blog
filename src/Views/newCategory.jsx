import { useState } from "react";
import axios from "axios";
import InputField from "../components/input";
import SubmitButton from "../components/button";

export default function CategoryPost({ userId }) {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError("A categoria não pode estar vazia.");
      return;
    }

    try {
      setError("");
      const response = await axios.post("https://api.devlucas.icu/categories", {
        name: category,
        userId,
      });

      if (response.status === 201) {
        setSuccess("Categoria adicionada com sucesso!");
        setCategory("");
      }
    } catch (err) {
      setError("Erro ao adicionar categoria. Tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="category-form"
      style={{ 
        maxWidth: "400px", 
        margin: "auto", 
        marginTop: 100, 
        marginBottom:'30%'}}
       >
  
        <InputField
         label='Nova categoria'
          type="text"
          id="new-category"
          name="name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Digite o nome da categoria"
        />
       
      {error && <p className="errorMessage">{error}</p>}
      {success && (
        <p className="successMessage">{success}</p>
      )}

      <SubmitButton
        type="submit"
        text ='Adicionar nova categoria' />
    </form>
  );
}
