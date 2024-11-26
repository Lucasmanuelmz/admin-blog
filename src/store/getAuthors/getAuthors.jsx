import axios from "axios";
import { useState, useContext, useEffect, createContext } from "react";

const AuthorsContext = createContext();

export function AuthorsProvider({ children }) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAuthors = () => {
      setLoading(true); 
      setError(null); 
      axios
        .get("https://api.devlucas.icu/authors")
        .then((response) => {
          setAuthors(response.data.authors);
        })
        .catch((error) => {
          setError(`Erro ao obter autores: ${error.message}`);
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    fetchAuthors();
  }, []);

  return (
    <AuthorsContext.Provider value={{ authors, loading, error }}>
      {children}
    </AuthorsContext.Provider>
  );
}

export function useAuthors() {
  const context = useContext(AuthorsContext);
  if (!context) {
    throw new Error("useAuthors deve ser usado dentro de um AuthorsProvider.");
  }
  return context;
}
