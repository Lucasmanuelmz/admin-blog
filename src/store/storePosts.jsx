import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchArticles = () => {
      setLoading(true); 
      setError(null); 

      axios
        .get("https://api.devlucas.icu/articles")
        .then((response) => {
          console.log(response.data.articles)
          if (response) {
            setArticles(response.data.articles);
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

    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles deve ser usado dentro de um ArticlesProvider.");
  }
  return context;
}
