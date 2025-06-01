import { Outlet, NavLink } from "react-router-dom";

export default function Admin() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-24 md:pt-0">
          
      <aside className="w-full md:w-64 bg-secondary text-white p-6 flex flex-col items-center md:items-start">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Admin Panel</h2>
        <nav className="space-y-3 text-center md:text-left">
          <NavLink to="/admin/dashboard" className="block hover:underline">Dashboard</NavLink>
          <NavLink to="/admin/productos" className="block hover:underline">Productos</NavLink>
          <NavLink to="/admin/pedidos" className="block hover:underline">Pedidos</NavLink>
          <NavLink to="/admin/usuarios" className="block hover:underline">Usuarios</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
