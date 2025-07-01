import { useContext } from "react";
import { ItemContext } from "./ItemContext";

// Hook personalizado para acceder al contexto fácilmente
export const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItemContext must be use within ItemProvider");
  }

  return context;
};
