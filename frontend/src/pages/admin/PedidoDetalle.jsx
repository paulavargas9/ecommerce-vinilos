import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function PedidoDetalle() {
  const { id } = useParams(); 
  const { token } = useAuth();

  const [detalles, setDetalles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch(`http://localhost:8082/api/detalle-pedidos/pedido/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los detalles");
        return res.json();
      })
      .then((data) => setDetalles(data.data))
      .catch(() => setError("No se pudieron cargar los detalles del pedido"));
  }, [id, token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
      <Link
        to="/admin/pedidos"
        className="text-primary
         hover:underline hover:text-black transition"
        >
        ← Volver a pedidos
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Detalles del Pedido #{id}</h1>
      {error && <p className="text-red-600">{error}</p>}

      {detalles.length === 0 ? (
        <p>No hay detalles disponibles para este pedido.</p>
      ) : (
        <table className="w-full table-auto text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Precio Unitario</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 border">{item.nombreProducto}</td>
                <td className="p-2 border">{item.cantidad}</td>
                <td className="p-2 border">{item.precioUnitario.toFixed(2)} €</td>
                <td className="p-2 border">
                  {(item.cantidad * item.precioUnitario).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
