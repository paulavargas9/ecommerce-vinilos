import { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function useFavoritos() {
  return useContext(FavoritosContext);
}

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem("favoritos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorito = (id) => favoritos.includes(id);

  const clearFavoritos = () => setFavoritos([]);

  return (
    <FavoritosContext.Provider
      value={{ favoritos, toggleFavorito, isFavorito, clearFavoritos }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
