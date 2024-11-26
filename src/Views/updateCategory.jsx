import InputField from '../components/input';
import SubmitButton from '../components/button';
import { CategoryProvider, useCategory } from '../store/getCategories/getCategory';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function RenderingCategory() {
  const { id } = useParams();
  return (
    <CategoryProvider id={id}>
      <UpdateCategory />
    </CategoryProvider>
  );
}

export default function UpdateCategory() {
  const { category, loading, error } = useCategory();
  const { id } = useParams();

  const [updateCategory, setUpdateCategory] = useState({
    name: '',
  });

  useEffect(() => {
    if (category) {
      setUpdateCategory({
        name: category.name || '',
      });
    }
  }, [category]);

  function handleUpdate(e) {
    const { name, value } = e.target;
    setUpdateCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  function handleUpdatedSubmit(e) {
    e.preventDefault();

    if (!updateCategory.name) {
      alert("O nome da categoria é obrigatório!");
      return;
    }

    axios
      .put(`https://api.devlucas.icu/categories/${id}`, updateCategory)
      .then(() => {
        console.log('Categoria atualizada com sucesso!');
      })
      .catch((error) => {
        console.log('Erro ao atualizar categoria:', error.message);
      });
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados da categoria: {error.message}</p>;

  return (
    <form onSubmit={handleUpdatedSubmit} className="update-form">
      <legend className="form-title">Atualizar Categoria</legend>
      <InputField
        label="Nome"
        type="text"
        name="name"
        id="name"
        value={updateCategory.name}
        onChange={handleUpdate}
      />
      <SubmitButton type="submit" text="Atualizar Categoria" />
    </form>
  );
}
