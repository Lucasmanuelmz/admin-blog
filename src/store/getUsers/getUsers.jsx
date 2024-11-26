import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  useEffect(() => {
    axios
      .get("https://api.devlucas.icu/users")
      .then((response) => {
        
        if (response.status === 200 && Array.isArray(response.data.users)) {
          setUsers(response.data.users); 
        } else {
          setError("Dados de usuários inválidos recebidos"); 
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Erro ao obter usuários:", error);
        setError("Erro no servidor, tente mais tarde");
        setLoading(false);
      });
  }, []); 

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("Erro ao obter usuários");
  }
  return context;
}
