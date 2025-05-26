import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { FaHeart, FaShippingFast } from "react-icons/fa";
import { useFavoritos } from "../context/FavoritosContext";



export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorito, isFavorito } = useFavoritos();
  const { products, loading } = useProducts();

  const [quantity, setQuantity] = useState(1);

  if (loading) return <div className="p-10">Cargando producto...</div>;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  const outOfStock = product.stock === 0;

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Imagen */}
      <div>
        <img
          src="/assets/default.jpg"
          alt={product.nombre}
          className="rounded-lg w-full object-cover shadow-md"
        />
      </div>

      {/* Detalles */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.nombre}</h1>

          <p className="text-3xl text-red-600 font-extrabold mb-4">
            {product.precio.toFixed(2)} €
          </p>

          {/* Selector de cantidad */}
          <div className="mb-3">
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Cantidad (Stock disponible: {product.stock})
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.min(parseInt(e.target.value), product.stock))
              }
              className="w-20 border rounded-md px-2 py-1"
              disabled={outOfStock}
            />
          </div>

          {/* Texto de disponibilidad */}
          {outOfStock ? (
            <p className="text-red-600 text-sm mb-6 font-semibold">
              ⛔ Sin stock disponible
            </p>
          ) : (
            <p className="text-green-600 text-sm mb-6">
              Disponible a partir del <strong>09/05/2025</strong>
            </p>
          )}

          {/* Botones */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => addToCart(product, quantity)}
              className={`px-6 py-3 rounded-md font-semibold ${
                outOfStock
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:opacity-80"
              }`}
              disabled={outOfStock}
            >
              {outOfStock ? "Agotado" : "AÑADIR A LA CESTA"}
            </button>
            <button
            onClick={() => toggleFavorito(product.id)}
            className={`border rounded-md p-3 ${
              isFavorito(product.id) ? "text-red-600" : "text-gray-400"
            } hover:bg-gray-100`}
            title={isFavorito(product.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <FaHeart />
          </button>
          </div>

          {/* Envío */}
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-6">
            <FaShippingFast /> Envíos a todo el mundo desde 2,99 €
          </p>

          {/* Descripción del producto */}
          <p className="text-gray-700 leading-relaxed text-sm mb-4">
            {product.descripcion}
          </p>

          {/* Simulación de tracklist */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">TRACKLIST:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>1. WAKE ME UP</li>
              <li>2. CRY FOR ME</li>
              <li>3. OPEN HEARTS</li>
              <li>4. TIMELESS (feat. Playboi Carti)</li>
              <li>5. SAO PAULO (feat. Anitta)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
