import axios from "axios";
import { useState, useContext, useEffect, createContext } from "react";

const AuthorsContext = createContext();

export function AuthorsProvider({children}) {
  const [authors, setAutors] = useState([]);

  useEffect(() => {
    axios.get('https://api.devlucas.icu/authors')
    .then(response => {
      setAutors(response.data.authors);
    })
    .catch(error => {
      throw new Error('Erro ao obter autores no servidor')
    })
  },[])

return(
  <AuthorsContext.Provider value={authors}>
    {children}
  </AuthorsContext.Provider>
)
} 

export function useAuthors() {
 const context = useContext(AuthorsContext);
 if(!context) {
  throw new Error('Erro ao obter autores no servidor')
 }
 return context;
}