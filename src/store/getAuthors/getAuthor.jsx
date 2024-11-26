import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthorContext = createContext();

export function AuthorProvider({ children, id }) {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAuthor = () => {
      setLoading(true); 
      setError(null); 

      axios
        .get(`https://api.devlucas.icu/authors/${id}`)
        .then((response) => {
          setAuthor(response.data.author);
        })
        .catch((error) => {
          setError(`Erro ao obter o autor: ${error.message}`);
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    if (id) {
      fetchAuthor();
    } else {
      setError("ID do autor não foi fornecido.");
      setLoading(false);
    }
  }, [id]);

  return (
    <AuthorContext.Provider value={{ author, loading, error }}>
      {children}
    </AuthorContext.Provider>
  );
}

export function useAuthor() {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error("useAuthor deve ser usado dentro de um AuthorProvider.");
  }
  return context;
}
