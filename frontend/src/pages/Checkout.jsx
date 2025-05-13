import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "credit-card",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Simular pedido
    alert("✅ Pedido confirmado. Gracias por tu compra.");
    clearCart();
    navigate("/");
  };

  return (
    <div className="p-6 md:p-10 grid md:grid-cols-3 gap-12">
      {/* 🧾 Formulario */}
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Billing */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Información de facturación</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              required
              name="name"
              type="text"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              required
              name="phone"
              type="tel"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Dirección de envío</h2>
          <input
            required
            name="address"
            type="text"
            placeholder="Calle, ciudad y código postal"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          >
            <option value="credit-card">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transfer">Transferencia bancaria</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-white hover:text-primary border border-primary transition"
        >
          Confirmar pedido
        </button>
      </form>

      {/* 📋 Order summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
        <div className="space-y-4 text-sm">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.title} × {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}
