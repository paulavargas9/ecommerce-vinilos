import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminProductos from "../components/AdminProductos";


export default function AdminPanel() {
  const { user } = useAuth();
  const [section, setSection] = useState("productos");

  
  if (!user || user.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

    
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSection("productos")}
          className={`px-4 py-2 rounded ${section === "productos" ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          Productos
        </button>
        <button
          onClick={() => setSection("pedidos")}
          className={`px-4 py-2 rounded ${section === "pedidos" ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          Pedidos
        </button>
      </div>

      {/* Secciones */}
      {section === "productos" && <AdminProductos />}
      {section === "pedidos" && <p>📑 Aquí irá la gestión de pedidos...</p>}
    </div>
  );
}
