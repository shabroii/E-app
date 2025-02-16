import { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast'


export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  function toggleWishlist(product) {
    let updatedWishlist = [...wishlist];

    if (wishlist.some(item => item.id === product.id)) {
          updatedWishlist = wishlist.filter(item => item.id !== product.id)
          toast.error("Removed from Wishlist", { duration: 2000, position: 'bottom-left' })
        } else {
          updatedWishlist.push(product)
          toast.success("Added to Wishlist", { duration: 2000, position: 'bottom-left' })
        }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
