import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => setPedidos(data.data))
      .catch(() => setError("No se pudieron cargar los pedidos"));
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Pedidos</h1>
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Usuario ID</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="text-sm border-t">
                <td className="p-2 border">{pedido.id}</td>
                <td className="p-2 border">{pedido.usuarioId ?? "—"}</td>
                <td className="p-2 border">{pedido.fecha?.slice(0, 10)}</td>
                <td className="p-2 border">{pedido.total.toFixed(2)} €</td>
                <td className="p-2 border">
                  <button
                    onClick={() => navigate(`/admin/pedidos/${pedido.id}`)}
                    className="bg-primary hover:bg-[#50191a] text-white px-3 py-1 rounded shadow-sm text-sm font-medium"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
