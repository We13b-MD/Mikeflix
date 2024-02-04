import { createContext, useContext, useState, useEffect } from "react";
const LocalStorageKey = "Bookmarkedmovies";

const SharedContext = createContext();

export const useSharecontext = () => useContext(SharedContext);
export const ShareProvider = ({ children }) => {
  const [bookmarkedmovies, setbookmarkMovies] = useState(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem(LocalStorageKey));
    return Array.isArray(storedBookmarks) ? storedBookmarks : [];
  });

  //load bookmarks from local Storage on componenet mount

  const addBookmark = (movie) => {
    setbookmarkMovies((prevBookmarks) => [...prevBookmarks, movie]);
  };

  useEffect(() => {
    try {
      const storedBookmarks = JSON.parse(localStorage.getItem(LocalStorageKey));
      if (Array.isArray(storedBookmarks)) {
        setbookmarkMovies(storedBookmarks);
      }
    } catch (err) {
      console.error("Error getting bookmarks", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(bookmarkedmovies));
  }, [bookmarkedmovies]);

  const clearBookmarks = () => {
    localStorage.removeItem(LocalStorageKey);
    setbookmarkMovies([]);
  };

  const removeBookmark = (movieSlug) => {
    setbookmarkMovies((prevBookmarks) =>
      prevBookmarks.filter((movie) => movie.slug !== movieSlug)
    );
  };

  return (
    <SharedContext.Provider
      value={{ bookmarkedmovies, addBookmark, removeBookmark, clearBookmarks }}
    >
      {children}
    </SharedContext.Provider>
  );
};
