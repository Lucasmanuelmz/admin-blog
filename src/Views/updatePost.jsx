import InputField from '../components/input';
import SubmitButton from '../components/button';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArticleProvider, useArticle } from '../store/getPost';
import RitchTextEditor from '../components/ritchText';

export function RenderingPost() {
  const { id } = useParams();
  return (
    <ArticleProvider id={id}>
      <UpdatePost />
    </ArticleProvider>
  );
}

export default function UpdatePost() {
  const { article, loading, error } = useArticle();
  const { id } = useParams();

  const [updatePost, setUpdatePost] = useState({
    title: '',
    description: '',
    article: '',
  });

  useEffect(() => {
    if (article) {
      setUpdatePost({
        title: article.title || '',
        description: article.description || '',
        article: article.article || '',
      });
    }
  }, [article]);

  function handleUpdate(e) {
    const { name, value } = e.target;
    setUpdatePost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  }

  function handleUpdatedSubmit(e) {
    e.preventDefault();

    if (!updatePost.title || !updatePost.description || !updatePost.article) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    axios
      .put(`https://api.devlucas.icu/articles/${id}`, updatePost)
      .then(() => {
        console.log('Artigo atualizado com sucesso!');
      })
      .catch((error) => {
        console.log('Erro ao atualizar artigo:', error.message);
      });
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados do artigo: {error.message}</p>;

  return (
    <form onSubmit={handleUpdatedSubmit} className="update-form">
      <legend className="form-title">Atualizar Artigo</legend>
      <InputField
        label="Título"
        type="text"
        name="title"
        id="title"
        value={updatePost.title}
        onChange={handleUpdate}
      />
      <InputField
        label="Descrição"
        type="text"
        name="description"
        id="description"
        value={updatePost.description}
        onChange={handleUpdate}
      />
      <RitchTextEditor
        label="Artigo"
        name="article"
        userId={"123"}
        initialContent={updatePost.article}
        onSubmit={(content) =>
          setUpdatePost((prev) => ({ ...prev, article: content }))
        }
      />
      <SubmitButton type="submit" text="Atualizar Artigo" />
    </form>
  );
}
