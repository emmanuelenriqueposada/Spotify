import { useEffect, useState, type ReactNode } from "react";
import { ItemContext } from "./ItemContext";
import { onAthStateChange } from "../utils/auth";
import type { User } from "firebase/auth";

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isUserLoggedIn = user !== null;

  return (
    <ItemContext.Provider value={{ user, setUser, isUserLoggedIn, loading }}>
      {children}
    </ItemContext.Provider>
  );
};
