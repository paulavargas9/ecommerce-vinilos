import { useEffect, useState } from "react";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const fetchProductos = async () => {
    const res = await fetch("http://localhost:8082/api/productos");
    const data = await res.json();
    setProductos(data.data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    await fetch(`http://localhost:8082/api/productos/${id}`, {
      method: "DELETE",
    });

    fetchProductos();
  };

  const iniciarEdicion = (producto) => {
    setEditando(producto.id);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });
  };

  const guardarCambios = async () => {
    await fetch(`http://localhost:8082/api/productos/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditando(null);
    fetchProductos();
  };

  const cancelarEdicion = () => {
    setEditando(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de productos</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-t">
              <td className="p-2">
                {editando === producto.id ? (
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  producto.nombre
                )}
              </td>
              <td className="p-2">
                {editando === producto.id ? (
                  <input
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    className="border px-2 py-1"
                    type="number"
                  />
                ) : (
                  producto.precio.toFixed(2) + " €"
                )}
              </td>
              <td className="p-2 space-x-2">
                {editando === producto.id ? (
                  <>
                    <button
                      onClick={guardarCambios}
                      className="text-green-600 hover:underline"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelarEdicion}
                      className="text-gray-600 hover:underline"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => iniciarEdicion(producto)}
                      className="text-gray-800 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
