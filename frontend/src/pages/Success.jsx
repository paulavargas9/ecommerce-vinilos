import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago completado!</h1>
      <p className="mb-6">Gracias por tu pedido. Pronto recibirás un correo de confirmación.</p>
      <Link to="/shop" className="text-primary font-semibold hover:underline">
        Volver a la tienda
      </Link>
    </div>
  );
}
