import { useFavoritos } from "../context/FavoritosContext";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const { products, loading } = useProducts();

  if (loading) return <div className="p-6">Cargando productos...</div>;

  const productosFavoritos = products.filter((p) =>
    favoritos.includes(p.id)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mis favoritos</h2>

      {productosFavoritos.length === 0 ? (
        <p className="text-gray-600">No tienes productos en favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFavoritos.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {producto.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {producto.descripcion}
              </p>
              <p className="text-red-600 font-bold mb-2">
                {producto.precio.toFixed(2)} €
              </p>
              <Link
                to={`/producto/${producto.slug}`}
                className="text-primary font-medium hover:underline"
              >
                Ver producto
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
