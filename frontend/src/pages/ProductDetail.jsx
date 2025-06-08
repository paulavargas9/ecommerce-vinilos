import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { FaHeart, FaShippingFast } from "react-icons/fa";
import { useFavoritos } from "../context/FavoritosContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";




export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorito, isFavorito } = useFavoritos();
  const { products, loading } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


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
      <div>
      <div className="flex justify-center">
      <img
    src={product.img || "/assets/default.jpg"}
    alt={product.nombre}
    className="w-[360px] h-[360px] object-contain bg-white p-3 rounded-lg shadow-md"
  />
      </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.nombre}</h1>

          <p className="text-3xl text-red-600 font-extrabold mb-4">
            {product.precio.toFixed(2)} €
          </p>
          <div className="mb-3">
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Cantidad
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

          <p className="text-sm mb-6 font-semibold">
            {product.stock === 0 ? (
              <span className="text-red-600">Producto agotado</span>
            ) : product.stock <= 10 ? (
              <span className="text-orange-500">Quedan pocas unidades</span>
            ) : (
              <span className="text-green-600">Stock disponible</span>
            )}
          </p>
          <div className="flex gap-4 mb-6">
          <button
          onClick={() => {
            if (!isAuthenticated) {
              alert("Debes iniciar sesión para añadir productos al carrito.");
              navigate("/login");
              return;
            }
            addToCart(product, quantity);
          }}
          className={`px-6 py-3 rounded-md font-semibold ${
            outOfStock
              ? "bg-primary text-white cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          disabled={outOfStock}
        >
          {outOfStock ? "Agotado" : "AÑADIR A LA CESTA"}
        </button>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              alert("Debes iniciar sesión para añadir a favoritos.");
              navigate("/login");
              return;
            }
            toggleFavorito(product.id);
          }}
          className={`border rounded-md p-3 ${
            isFavorito(product.id) ? "text-red-600" : "text-gray-400"
          } hover:bg-gray-100`}
          title={isFavorito(product.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <FaHeart />
        </button>

          </div>
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-6">
            <FaShippingFast /> Envíos a todo el mundo desde 2,99 €
          </p>

          <p className="text-gray-700 leading-relaxed text-sm mb-4">
            {product.descripcion}
          </p>
        </div>
      </div>
    </div>
  );
}
