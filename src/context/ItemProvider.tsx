import { useEffect, useState, type ReactNode } from "react";
import { ItemContext } from "./ItemContext";
import { onAthStateChange } from "../utils/auth"; // función que escucha cambios en sesión
import type { User } from "firebase/auth";

// Este componente envolverá toda la app para proveer el contexto
export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchamos los cambios de autenticación (login/logout)
    const unsubscribe = onAthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    // Limpiamos el listener al desmontar
    return unsubscribe;
  }, []);

  const isUserLoggedIn = user !== null;

  return (
    <ItemContext.Provider value={{ user, setUser, isUserLoggedIn, loading }}>
      {children}
    </ItemContext.Provider>
  );
};
