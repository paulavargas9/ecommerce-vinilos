
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.mensaje) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Correo electrónico no válido.");
      return;
    }

    console.log("📨 Mensaje enviado:", form);
    setEnviado(true);
    setError("");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <>
      

      <section className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>

        {enviado && (
          <p className="text-green-600 mb-4 font-semibold">
            ✅ Tu mensaje ha sido enviado correctamente.
          </p>
        )}

        {error && (
          <p className="text-red-600 mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            rows="5"
            value={form.mensaje}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white font-semibold px-6 py-2 rounded hover:opacity-90"
          >
            Enviar mensaje
          </button>
        </form>
      </section>
    </>
  );
}
