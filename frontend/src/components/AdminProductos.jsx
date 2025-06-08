import { useEffect, useState } from "react";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setProductos(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = e.target;
  
    const nuevo = {
      nombre: form.nombre.value,
      slug: form.slug.value,
      precio: parseFloat(form.precio.value),
      stock: parseInt(form.stock.value),
      descripcion: form.descripcion.value,
      categoriaId: parseInt(form.categoriaId.value),
    };
  
    try {
      const res = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevo),
      });
  
      if (!res.ok) throw new Error("Error al crear producto");
  
      const creado = await res.json();
      setProductos((prev) => [...prev, creado]); 
      setShowForm(false); 
    } catch (err) {
      alert("Error creando producto");
      console.error(err);
    }
  };
  

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Lista de productos ({productos.length})</h2>
      <button
        onClick={() => setShowForm(true)}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 mb-4"
        >
        + Nuevo producto
        </button>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id} className="border-t">
              <td className="p-2">{prod.nombre}</td>
              <td className="p-2">{prod.precio.toFixed(2)} €</td>
              <td className="p-2">{prod.stock}</td>
              <td className="p-2">{prod.categoria?.nombre || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <form
            onSubmit={handleCreate}
            className="border p-4 rounded bg-gray-50 space-y-4 mt-6"
        >
            <h3 className="text-lg font-semibold">Crear nuevo producto</h3>

            <input name="nombre" placeholder="Nombre" required className="border p-2 w-full" />
            <input name="slug" placeholder="Slug" required className="border p-2 w-full" />
            <input name="precio" type="number" placeholder="Precio" required className="border p-2 w-full" />
            <input name="stock" type="number" placeholder="Stock" required className="border p-2 w-full" />
            <input name="categoriaId" placeholder="ID categoría" required className="border p-2 w-full" />
            <textarea name="descripcion" placeholder="Descripción" rows={3} className="border p-2 w-full" />

            <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
            Guardar
            </button>
        </form>
        )}





    </div>

    
  );
}
