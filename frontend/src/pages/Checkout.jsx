import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const shippingCost = 2.99;
  const navigate = useNavigate();
  const [errorCheckout, setErrorCheckout] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    region: "Madrid",
    note: "",
    payment: "credit-card",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const confirmarPedido = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!token || !user) {
      setErrorCheckout("Debes iniciar sesión para realizar el pedido.");
      return;
    }
  
    const pedidoData = {
      direccion: formData.address,
      total: cartTotal + shippingCost,
      items: cart.map((item) => ({
        productoId: item.id,
        cantidad: item.quantity,
        precio: item.price,
      })),
    };
  
    try {
      const res = await fetch("http://localhost:8082/api/pedidos/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedidoData),
      });
  
      if (!res.ok) {
        const data = await res.json();
        setErrorCheckout(data.message || "Error al registrar el pedido.");
        return;
      }
  
      clearCart();
      setErrorCheckout(""); // limpiamos mensaje si fue exitoso
      navigate("/order-confirmation");
    } catch (err) {
      setErrorCheckout("Error de red o del servidor. Intenta más tarde.");
      console.error("❌ Error al crear pedido:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor completa todos los campos.");
      return;
    }

    confirmarPedido();
  };

  return (
    <div className="p-6 md:p-10 grid md:grid-cols-3 gap-12">
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div>
          <h2 className="text-lg font-semibold mb-4">Información de facturación</h2>
          <div className="grid grid-cols-1 gap-4">
            <input required name="name" type="text" placeholder="Nombre completo"
              value={formData.name} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input required name="email" type="email" placeholder="Correo electrónico"
              value={formData.email} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input required name="phone" type="tel" placeholder="Teléfono"
              value={formData.phone} onChange={handleChange} className="border px-4 py-2 rounded" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Dirección de envío</h2>
          <div className="grid grid-cols-1 gap-4">
            <input required name="address" type="text" placeholder="Dirección"
              value={formData.address} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input required name="city" type="text" placeholder="Ciudad"
              value={formData.city} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input required name="zip" type="text" placeholder="Código postal"
              value={formData.zip} onChange={handleChange} className="border px-4 py-2 rounded" />
            <select name="region" value={formData.region} onChange={handleChange}
              className="border px-4 py-2 rounded" required>
              <option value="">Selecciona tu comunidad autónoma</option>
              <option value="Andalucía">Andalucía</option>
              <option value="Aragón">Aragón</option>
              <option value="Asturias">Asturias</option>
              <option value="Islas Baleares">Islas Baleares</option>
              <option value="Canarias">Canarias</option>
              <option value="Cantabria">Cantabria</option>
              <option value="Castilla-La Mancha">Castilla-La Mancha</option>
              <option value="Castilla y León">Castilla y León</option>
              <option value="Cataluña">Cataluña</option>
              <option value="Extremadura">Extremadura</option>
              <option value="Galicia">Galicia</option>
              <option value="Madrid">Madrid</option>
              <option value="Murcia">Murcia</option>
              <option value="Navarra">Navarra</option>
              <option value="La Rioja">La Rioja</option>
              <option value="País Vasco">País Vasco</option>
              <option value="Valencia">Valencia</option>
            </select>
            <textarea name="note" value={formData.note} onChange={handleChange}
              rows={3} placeholder="Notas para el repartidor (opcional)"
              className="border px-4 py-2 rounded resize-none"></textarea>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
          <select name="payment" value={formData.payment} onChange={handleChange}
            className="border px-4 py-2 rounded">
            <option value="credit-card">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transfer">Transferencia bancaria</option>
          </select>
        </div>

        <button type="submit"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-white hover:text-primary border border-primary transition">
          Confirmar pedido
        </button>

        {errorCheckout && (
        <p className="text-red-600 mt-4 text-sm font-medium">
          {errorCheckout}
        </p>
      )}

      </form>
     
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
  <div className="space-y-4 text-sm">
    {cart.map((item) => (
      <div key={item.id} className="flex justify-between">
        <span>{item.nombre} × {item.quantity}</span>
        <span>{(item.precio * item.quantity).toFixed(2)} €</span>
      </div>
    ))}
    <hr />
    <div className="flex justify-between text-sm text-gray-700">
      <span>Envío</span>
      <span>{shippingCost.toFixed(2)} €</span>
    </div>
    <div className="flex justify-between font-bold text-base mt-2">
      <span>Total</span>
      <span>{(cartTotal + shippingCost).toFixed(2)} €</span>
    </div>
  </div>
</div>

    </div>
  );
}
