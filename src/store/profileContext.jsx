import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.devlucas.icu/profile")
      .then((response) => {
        setUser(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ProfileContext.Provider value={{ user, error, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfile deve ser usado dentro de um ProfileProvider."
    );
  }

  return context;
}
