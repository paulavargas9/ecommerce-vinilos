import Hero from "../components/Hero";
import Items from "../components/ItemsHome";

import Services from "../components/Service";
import { useSearch } from "../context/SearchContext";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { query } = useSearch();
  const { products, loading, error } = useProducts();

  useEffect(() => {
    console.log(" Productos en Home:", products);
    console.log(" Query:", query);
    console.log(" Filtrados:", products.filter((p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    ));
  }, [products, query]);

  const productosFiltrados = products.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-10 ">
      {query.trim() === "" ? (
        <>
          <Hero />
          <Items />      
          <Services />
        </>
      ) : loading ? (
        <p className="text-gray-600">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-gray-500">
          No hay resultados para <span className="font-semibold">"{query}"</span>
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Resultados para: <span className="text-primary">"{query}"</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <Link
                to={`/producto/${producto.slug}`}
                key={producto.id}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img
                  src="/assets/default.jpg"
                  alt={producto.nombre}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{producto.nombre}</h3>
                  <p className="text-primary font-bold">{producto.precio.toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
