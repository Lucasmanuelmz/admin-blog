import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const CategoryContext = createContext();

export function CategoryProvider({ id, children }) {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCategory = () => {
      setLoading(true); 
      setError(null); 

      axios
        .get(`https://api.devlucas.icu/categories/${id}`)
        .then((response) => {
          setCategory(response.data.category);
        })
        .catch((error) => {
          setError(`Erro ao obter a categoria: ${error.message}`);
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    if (id) {
      fetchCategory();
    } else {
      setError("ID da categoria não foi fornecido.");
      setLoading(false);
    }
  }, [id]);

  return (
    <CategoryContext.Provider value={{ category, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory deve ser usado dentro de um CategoryProvider.");
  }
  return context;
}
