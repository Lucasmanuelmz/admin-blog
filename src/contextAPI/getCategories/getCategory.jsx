import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const CategoryContext = createContext();

export function CategoryProvider({id, children}) {
  const [category, setCategory] = useState({});

  useEffect(() => {
    axios.get(`https://api.devlucas.icu/categories/${id}`)
    .then(response => {
      const category = response.data.category;
      setCategory(category)
    })

    .catch(error => {
      throw new Error(`Erro ao obter a categoria ${error.message}`)
    })
  },[id])

  return(
    <CategoryContext.Provider value={category}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if(!context) {
    throw new Error('Erro ao obter a sua categoria')
  }

  return context;
}