import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ id, children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios.get(`https://api.devlucas.icu/users/${id}`)
      .then((response) => {
        setUser(response.data.user);
        setError(null); 
      })
      .catch((err) => {
        setError(`Erro ao carregar o usuário: ${err.message}`);
        setUser(null); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider.");
  }

  return context;
}
