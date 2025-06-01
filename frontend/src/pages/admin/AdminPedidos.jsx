import React, { useEffect, useState } from "react";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => setError("No se pudieron cargar los pedidos"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Pedidos</h1>
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="text-sm border-t">
                <td className="p-2 border">{pedido.id}</td>
                <td className="p-2 border">{pedido.usuario?.nombre || "Sin asignar"}</td>
                <td className="p-2 border">{pedido.fecha?.slice(0, 10)}</td>
                <td className="p-2 border">{pedido.total.toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
