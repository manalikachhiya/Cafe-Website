import { createContext, useContext, useState } from "react";
import menuData from "../data/menu.json";
import { getWishlist, toggleWishlist } from "../utils/localStorage";
import { useToast } from "./ToastContext";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu] = useState(menuData);
  const [wishlist, setWishlist] = useState(getWishlist());
  const { showToast } = useToast() || {};

  const handleToggleWishlist = (itemId) => {
    const updated = toggleWishlist(itemId);
    setWishlist(updated);
    const inList = updated.includes(itemId);
    showToast?.(inList ? "Added to wishlist" : "Removed from wishlist", "info");
  };

  const getItemById = (id) => menu.find((m) => String(m.id) === String(id));

  return (
    <MenuContext.Provider value={{ menu, wishlist, handleToggleWishlist, getItemById }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
