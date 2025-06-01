import React from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { PiReceiptThin } from "react-icons/pi";
import { MdInventory2 } from "react-icons/md";

export default function Dashboard() {
  const navigate = useNavigate();

  const secciones = [
    {
      nombre: "Productos",
      ruta: "/admin/productos",
      icono: <MdInventory2 size={32} className="text-primary" />,
    },
    {
      nombre: "Pedidos",
      ruta: "/admin/pedidos",
      icono: <PiReceiptThin size={32} className="text-primary" />,
    },
    {
      nombre: "Usuarios",
      ruta: "/admin/usuarios",
      icono: <CiUser size={32} className="text-primary" />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Bienvenido al Panel de Administración
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {secciones.map((item) => (
          <div
            key={item.ruta}
            onClick={() => navigate(item.ruta)}
            className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary shadow hover:shadow-md transition duration-200 cursor-pointer text-center"
          >
            {item.icono}
            <h2 className="text-base font-medium">{item.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
