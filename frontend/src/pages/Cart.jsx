import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShippingFast } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, cartTotal, incrementItem, decrementItem } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-6 md:p-10 grid md:grid-cols-3 gap-10">
      {/* PRODUCTOS */}
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => {
              const precio = item.precio ?? 0; // fallback si no viene definido
              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b pb-4 gap-6"
                >
                  {/* Imagen + nombre */}
                  <div className="flex items-center gap-4 w-full md:w-[40%]">
                    <img src={item.img} alt={item.nombre} className="w-16 h-16 rounded-md" />
                    <div>
                      <h2 className="font-semibold">{item.nombre}</h2>
                      <p className="text-sm text-gray-600">
                        {precio.toFixed(2)} € / unidad
                      </p>
                    </div>
                  </div>

                  {/* Cantidad */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementItem(item.id)}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => incrementItem(item.id)}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-sm font-medium">
                    Subtotal: {(precio * item.quantity).toFixed(2)} €
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}

            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:text-red-600 mt-4"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>

      {/* RESUMEN */}
      {cart.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resumen</h2>

          <p className="mb-2">
            <strong>Artículos:</strong> {totalItems}
          </p>

          <p className="mb-2 text-sm flex items-center gap-2 text-gray-600">
            <FaShippingFast />
            Envío: 2,99 € (estimado)
          </p>

          <hr className="my-4" />

          <p className="text-lg font-bold mb-4">
            Total: {((cartTotal || 0) + 2.99).toFixed(2)} €
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primary text-white py-2 rounded hover:bg-white hover:text-primary border border-primary transition"
          >
            Proceder al pago
          </button>
        </div>
      )}
    </div>
  );
}
