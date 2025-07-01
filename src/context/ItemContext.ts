import type { User } from "firebase/auth";
import { createContext } from "react";

type ContexType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserLoggedIn: boolean
  loading: boolean
};

export const ItemContext = createContext<ContexType | undefined>(undefined);
