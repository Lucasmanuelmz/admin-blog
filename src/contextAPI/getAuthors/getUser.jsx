import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthorContext = createContext();

export function AuthorProvider({children, id}) {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    axios.get(`https://api.devlucas.icu/authors/${id}`)
    .then(response => {
      const author = response.data.author;
      setAuthor(author);
    })

    .catch(error => {
      throw new Error(`Erro ao obter autor no servidor ${error.message}`)
    })
  },[id]);

  return(
    <AuthorContext.Provider value={author}>
      {children}
    </AuthorContext.Provider>
  )
} 

export function useAuthor() {
  const context = useContext(AuthorContext);
  if(!context) {
    throw new Error('Erro ao obter autor no servidor')
  }

  return context;
} 