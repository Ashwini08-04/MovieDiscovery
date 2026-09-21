import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("movie_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save wishlist to localStorage
  const updateWishlist = (movies) => {
    setWishlist(movies);
    localStorage.setItem("movie_wishlist", JSON.stringify(movies));
  };

  const toggleWishlist = (movie) => {
    const exists = wishlist.some((item) => item.id === movie.id);

    if (exists) {
      updateWishlist(wishlist.filter((item) => item.id !== movie.id));
    } else {
      updateWishlist([...wishlist, movie]);
    }
  };

  const isInWishlist = (id) =>
    wishlist.some((movie) => movie.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);