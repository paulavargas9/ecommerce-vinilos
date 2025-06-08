import React from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export default function NuevasJoyas() {
  const { products, loading } = useProducts();


  const joyasIds = [24, 49, 33, 40, 44, 51]; 

  const joyas = products.filter((p) => joyasIds.includes(p.id));

  if (loading) return <div className="p-10">Cargando productos...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Nuevas Joyas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {joyas.map((product) => (
          <Link
            to={`/producto/${product.slug}`}
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={product.img}
              alt={product.nombre}
              className="w-full h-60 object-contain mb-4 bg-white"
            />
            <h2 className="text-lg font-semibold">{product.nombre}</h2>
            <p className="text-red-600 font-bold">{product.precio.toFixed(2)} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
