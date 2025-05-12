import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockData } from "../data/mockData";

const allProducts = Object.values(mockData).flat();

export default function ProductDetail() {
    const { addToCart } = useCart();
    const { slug } = useParams();
    const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img src={product.img} alt={product.title} className="rounded-lg shadow-lg" />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg text-gray-600 mb-4">
          Este vinilo es una edición especial para verdaderos amantes del sonido clásico. Añádelo a tu colección
          y disfruta de la experiencia sonora como se debe.
        </p>
        <p className="text-2xl font-semibold mb-6">Precio: {product.price} €</p>


        <button
        onClick={() => addToCart(product)}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary border border-primary transition"
        >
        Añadir al carrito
        </button>

        </div>
    </div>
  );
}
