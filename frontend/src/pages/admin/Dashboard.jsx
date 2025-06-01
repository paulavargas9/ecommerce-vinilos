import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded">📦 Productos</div>
        <div className="p-4 bg-white shadow rounded">🧾 Pedidos</div>
        <div className="p-4 bg-white shadow rounded">👤 Usuarios</div>
      </div>
    </div>
  );
}
