import { createContext, useContext, useEffect, useState } from "react";

const RecentlyViewedContext = createContext();
const STORAGE_KEY = "recently_viewed_movies";

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Save recently viewed movies
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Add movie to recent history
  const addRecentlyViewed = (movie) => {
    setRecentlyViewed((prev) => [
      movie,
      ...prev.filter((item) => item.id !== movie.id)
    ].slice(0, 6));
  };

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, addRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);