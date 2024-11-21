import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({id, children}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`https://api.devlucas.icu/users/${id}`)
    .then(response => {
      const user = response.data.user;
      setUser(user);
    })

    .catch(error => {
      throw new Error(`Erro no servidor, nao conseguimos obter ${error.message}`)
    })
  },[id]);

  return(
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext);
  if(!context) {
    throw new Error('Erro ao obter usuario no servidor')
  }

  return context;
}