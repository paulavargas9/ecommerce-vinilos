import { useEffect, useState } from "react";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      fetch("http://localhost:8082/api/productos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Ejemplo producto:", json.data?.[0]);  // 👀 aquí debe salir categoriaSlug

          
          setProducts(json.data || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    return { products, loading, error };
  }
  