import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const ArticleContext = createContext();

export function ArticleProvider({id, children }) {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchArticle = () => {
      setLoading(true); 
      setError(null); 

      axios
        .get(`https://api.devlucas.icu/articles/${id}`)
        .then((response) => {
          console.log(response.data.article)
          if (response) {
            setArticle(response.data.article);
          } else {
            setError(`Erro inesperado: ${response.statusText}`);
          }
        })
        .catch((error) => {
          setError(`Erro ao carregar categorias: ${error.message}`);
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    fetchArticle();
  }, [id]);

  return (
    <ArticleContext.Provider value={{ article, loading, error }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticle() {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticles deve ser usado dentro de um ArticlesProvider.");
  }
  return context;
}
