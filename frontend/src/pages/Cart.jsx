import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.title} className="w-16 h-16 rounded-md" />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">Precio unitario: {item.price} €</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    <p className="text-sm text-gray-800 font-semibold">Total: {(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-xl font-bold mb-4">Total: {cartTotal.toFixed(2)} €</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={clearCart}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
              >
                Vaciar carrito
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-white hover:text-primary border border-primary transition"
              >
                Pagar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
