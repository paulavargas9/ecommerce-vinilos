import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const orderNumber = Math.floor(Math.random() * 1000000);

  // Si se entra directamente, redirigir después de X seg.
  useEffect(() => {
    const timer = setTimeout(() => {
      // Podrías redirigir o mostrar algo más
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-10 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4"> ¡Gracias por tu pedido!</h1>
      <p className="text-gray-600 mb-8">
        Tu pedido se ha realizado correctamente. Pronto recibirás un email con los detalles.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow text-left">
        <h2 className="text-lg font-semibold mb-2">Resumen del pedido</h2>
        <p><strong>Número de pedido:</strong> #{orderNumber}</p>
        <p><strong>Envío a:</strong> Calle Falsa 123, Madrid, Comunidad de Madrid</p>
        <p><strong>Productos:</strong> Producto 1 (x1), Producto 2 (x2)</p>
        <p><strong>Total:</strong> 39.98 €</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => alert("Seguimiento no disponible aún")}
        >
         Ver estado del pedido
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-white hover:text-primary border border-primary transition"
          onClick={() => navigate("/")}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
