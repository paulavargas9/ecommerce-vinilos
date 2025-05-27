import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, email, mensaje } = formData;

    // Validaciones básicas
    if (!nombre || !email || !mensaje) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Validación de longitud del nombre
    if (nombre.length < 2 || nombre.length > 50) {
      setError("El nombre debe tener entre 2 y 50 caracteres.");
      return;
    }

    // Validación de caracteres del nombre
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
      setError("El nombre solo puede contener letras y espacios.");
      return;
    }

    // Simulación de envío
    setTimeout(() => {
      console.log("Formulario enviado:", formData);
      setSuccess(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
      setError("");
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Contáctanos</h2>

      {success && (
        <p className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="mensaje"
          placeholder="Tu mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 w-full"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}
