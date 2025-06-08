import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../context/SearchContext";

export default function Category() {
  const { categoria } = useParams(); 
  const { products, loading, error } = useProducts();
  const { query } = useSearch();


  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);


  const productosFiltrados = products.filter((p) => {
    const coincideCategoria =
      p.categoriaSlug?.toLowerCase().trim() === categoria.toLowerCase().trim();
  
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(query.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(query.toLowerCase());
  
    return coincideCategoria && coincideBusqueda;
  });
  

  
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize mb-6">Género: {categoria}</h1>

      {loading ? (
        <p className="text-gray-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles para esta categoría aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} data-aos="fade-up">
              <Link
                to={`/producto/${producto.slug}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
               <img
                  src={producto.img || "/assets/default.jpg"}
                  alt={producto.nombre}
                  className="w-full h-64 object-contain bg-white"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{producto.nombre}</h2>
                  <p className="text-primary font-bold text-xl">
                    {producto.precio.toFixed(2)} €
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
