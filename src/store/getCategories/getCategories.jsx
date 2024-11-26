import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCategories = () => {
      setLoading(true); 
      setError(null); 

      axios
        .get("https://api.devlucas.icu/categories")
        .then((response) => {
          console.log(response.data.categories)
          if (response) {
            setCategories(response.data.categories);
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

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories deve ser usado dentro de um CategoriesProvider.");
  }
  return context;
}
