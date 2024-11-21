import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const UsersContext = createContext();

export function UsersProvider({children}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://api.devlucas.icu/users')
    .then(response => {
      const users = response.data.users;
      setUsers(users);
    })

    .catch(error => {
      throw new Error(`Houve erros no servidor ${error.message}`)
    })
  },[])

  return(
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext);
  if(!context) {
    throw new Error('Erro ao obter usuarios')
  }
  return context;
}