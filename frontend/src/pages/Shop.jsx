import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../context/SearchContext";

const genres = [
  { name: "Rock", slug: "rock" },
  { name: "Jazz", slug: "jazz" },
  { name: "Pop", slug: "pop" },
  { name: "Electrónica", slug: "electronica" },
  { name: "Hip-Hop / Rap", slug: "hiphop-rap" },
  { name: "Soul / R&B", slug: "soul-rb" },
  { name: "Salsa", slug: "salsa" },
  { name: "Flamenco", slug: "flamenco" },
  { name: "Indie / Alternativo", slug: "indie-alternativo" }
];

export default function Shop() {
  const { products, loading, error } = useProducts();
  const { query } = useSearch();

  useEffect(() => {
    AOS.init({ duration: 600, offset: 100 });
  }, []);

  const productosFiltrados = products.filter(
    (p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(query.toLowerCase())
  );

  const mostrarGeneros = query.trim() === "";

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {mostrarGeneros ? "Explora por Géneros" : "Resultados de búsqueda"}
      </h1>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : mostrarGeneros ? (
        // ✅ Mostrar GÉNEROS si no hay texto en el buscador
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.slug}
              to={`/shop/${genre.slug}`}
              className="border border-gray-300 p-6 rounded-xl text-center hover:bg-primary hover:text-white transition font-semibold text-lg"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      ) : productosFiltrados.length === 0 ? (
        <p>No hay resultados para tu búsqueda.</p>
      ) : (
        // ✅ Mostrar productos si hay texto de búsqueda
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <Link
              to={`/producto/${producto.slug}`}
              key={producto.id}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition"
              data-aos="fade-up"
            >
              <img
                src="/assets/default.jpg"
                alt={producto.nombre}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{producto.nombre}</h2>
                <p className="text-primary font-bold text-xl">
                  {producto.precio.toFixed(2)} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
