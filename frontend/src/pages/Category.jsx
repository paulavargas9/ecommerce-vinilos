import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { mockData } from "../data/mockData";

export default function Category() {
  const { categoria } = useParams();
  const productos = mockData[categoria] || [];

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize mb-6">Género: {categoria}</h1>

      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles para esta categoría aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div key={producto.id} data-aos="fade-up">
              <Link
                to={`/producto/${producto.slug}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={producto.img}
                  alt={producto.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{producto.title}</h2>
                  <p className="text-primary font-bold text-xl">
                    {producto.price.toFixed(2)} €
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


