import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.devlucas.icu/categories")
      .then((response) => {
        const categories = response.data.categories;
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("Erro ao obter categorias");
  }
  return context;
}
