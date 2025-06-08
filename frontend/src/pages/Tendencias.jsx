// src/pages/Tendencias.jsx
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export default function Tendencias() {
  const { products, loading } = useProducts();

  if (loading) return <div className="p-10">Cargando tendencias...</div>;


  const tendenciaIds = [2, 6, 8, 14, 25, 31]; 
  const productosTendencia = products.filter((p) => tendenciaIds.includes(p.id));

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Tendencias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosTendencia.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <Link to={`/producto/${product.slug}`}>
              <img
                src={product.img}
                alt={product.nombre}
                className="w-40 h-40 object-contain mb-4"
              />
              <h2 className="font-semibold mb-1">{product.nombre}</h2>
              <p className="text-red-600 font-bold">{product.precio.toFixed(2)} €</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

