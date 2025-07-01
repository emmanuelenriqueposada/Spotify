import { useContext } from "react";
import { ItemContext } from "./ItemContext";

export const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItemContext must be use within ItemProvider");
  }

  return context;
};
