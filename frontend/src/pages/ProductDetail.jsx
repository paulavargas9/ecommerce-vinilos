import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockData } from "../data/mockData";
import { useState } from "react";
import { FaHeart, FaShippingFast } from "react-icons/fa";

const allProducts = Object.values(mockData).flat();

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Imagen principal */}
      <div>
        <img
          src={product.img}
          alt={product.title}
          className="rounded-lg w-full object-cover shadow-md"
        />
      </div>

      {/* Detalles del producto */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <p className="text-3xl text-red-600 font-extrabold mb-4">
            {product.price.toFixed(2)} €
          </p>

          {/* Selector de cantidad */}
          <div className="mb-3">
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border rounded-md px-2 py-1"
            />
          </div>

          {/* Texto de disponibilidad */}
          <p className="text-green-600 text-sm mb-6">
            Disponible a partir del <strong>09/05/2025</strong>
          </p>

          {/* Botones */}
          <div className="flex gap-4 mb-6">
          <button
            onClick={() => addToCart(product, quantity)}
            className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:opacity-80"
          >
            AÑADIR A LA CESTA
          </button>
            <button className="border border-gray-400 rounded-md p-3 text-gray-700 hover:bg-gray-100">
              <FaHeart />
            </button>
          </div>

          {/* Envío */}
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-6">
            <FaShippingFast /> Envíos a todo el mundo desde 2,99 €
          </p>

          {/* Descripción simulada */}
          <p className="text-gray-700 leading-relaxed text-sm">
            Este vinilo es una edición extendida del último álbum del artista.
            Incluye canciones inéditas y una presentación exclusiva en formato coleccionista.
          </p>

          {/* Simulación de tracklist */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">TRACKLIST:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>1. WAKE ME UP</li>
              <li>2. CRY FOR ME</li>
              <li>3. OPEN HEARTS</li>
              <li>4. TIMLESS (feat. Playboi Carti)</li>
              <li>5. SAO PAULO (feat. Anitta)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
