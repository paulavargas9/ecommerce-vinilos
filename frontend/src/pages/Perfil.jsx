import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Perfil() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:8080/api/pedidos/mis-pedidos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error al cargar pedidos");
        }

        const data = await res.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Mi perfil</h2>

        <p className="mb-2">
          <strong>Nombre:</strong> {user.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Mis pedidos</h3>

        {loading && <p>Cargando pedidos...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {pedidos.length === 0 && !loading ? (
          <p>No tienes pedidos todavía.</p>
        ) : (
          <ul className="space-y-4">
            {pedidos.map((pedido, index) => (
              <li key={index} className="border-b pb-2">
                <p><strong>Fecha:</strong> {pedido.fecha}</p>
                <p><strong>Total:</strong> {pedido.total.toFixed(2)} €</p>
                <p><strong>Estado:</strong> {pedido.estado}</p>
                <div className="mt-1">
                  <strong>Productos:</strong>
                  <ul className="list-disc list-inside text-sm ml-2">
                    {pedido.items.map((item, i) => (
                      <li key={i}>
                        {item.nombreProducto} × {item.cantidad}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
