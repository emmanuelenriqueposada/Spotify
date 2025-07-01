import type { User } from "firebase/auth";
import { createContext } from "react";

// Tipo que tendrá el contexto
type ContexType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserLoggedIn: boolean;
  loading: boolean;
};

// Creamos el contexto con valor por defecto undefined
export const ItemContext = createContext<ContexType | undefined>(undefined);
