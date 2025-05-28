import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaypalButton from "../components/PaypalButton";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shippingCost = 2.99;
  const stripePromise = loadStripe("pk_test_51RTVkzPYeHeuEMmuYjkwKK3If2Ebarp3GdXhPdtQSFl1Mlk1S6FfrkF4msaKCt9XcWHkOWjAMNrP0mTjoBCeSE9V00Ojgvzwd4");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", zip: "",
    region: "Madrid", note: "",
    payment: "credit-card",
  });

  const [formErrors, setFormErrors] = useState({});
  const [errorCheckout, setErrorCheckout] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
  };

  const validarFormulario = () => {
    const errores = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errores.name = "El nombre debe tener al menos 2 letras.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errores.email = "Introduce un correo válido.";
    }

    const phoneRegex = /^[0-9]{9,15}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errores.phone = "El teléfono debe contener entre 9 y 15 dígitos.";
    }

    return errores;
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
        precio: item.precio,
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
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        setErrorCheckout(data.message || "Error al registrar el pedido.");
        return;
      }

      clearCart();
      navigate("/checkout/exito");
    } catch (err) {
      setErrorCheckout("Error al registrar el pedido.");
      console.error("❌", err);
    }
  };

  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;
    const totalEnCentimos = Math.round((cartTotal + shippingCost) * 100);

    const response = await fetch("http://localhost:8082/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalEnCentimos }),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (data.id) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert("Error con Stripe");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errores = validarFormulario();
    setFormErrors(errores);

    if (Object.keys(errores).length > 0) return;

    if (formData.payment === "credit-card") {
      handleStripeCheckout();
    }
  };

  return (
    <div className="p-6 md:p-10 grid md:grid-cols-3 gap-12">
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div>
          <h2 className="text-lg font-semibold mb-4">Información</h2>
          <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-1" />
          {formErrors.name && <p className="text-red-600 text-sm mb-2">{formErrors.name}</p>}

          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-1" />
          {formErrors.email && <p className="text-red-600 text-sm mb-2">{formErrors.email}</p>}

          <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-1" />
          {formErrors.phone && <p className="text-red-600 text-sm mb-2">{formErrors.phone}</p>}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Dirección</h2>
          <input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-2" />
          <input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-2" />
          <input name="zip" placeholder="Código postal" value={formData.zip} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-2" />
          <select name="region" value={formData.region} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-2">
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
            <option value="Ceuta">Ceuta</option>
            <option value="Extremadura">Extremadura</option>
            <option value="Galicia">Galicia</option>
            <option value="Madrid">Madrid</option>
            <option value="Melilla">Melilla</option>
            <option value="Murcia">Murcia</option>
            <option value="Navarra">Navarra</option>
            <option value="La Rioja">La Rioja</option>
            <option value="País Vasco">País Vasco</option>
            <option value="Valencia">Valencia</option>
          </select>
          <textarea name="note" placeholder="Notas" value={formData.note} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-2" />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
          <select name="payment" value={formData.payment} onChange={handleChange} className="border px-4 py-2 rounded w-full mb-4">
            <option value="credit-card">Tarjeta (Stripe)</option>
            <option value="paypal">PayPal</option>
          </select>

          {formData.payment === "credit-card" && (
            <button type="submit" className="bg-primary text-white px-6 py-3 rounded hover:bg-white hover:text-primary border border-primary transition">
              Pagar con tarjeta
            </button>
          )}

          {formData.payment === "paypal" && (
            <PaypalButton
              total={cartTotal + shippingCost}
              onSuccess={async () => {
                await confirmarPedido();
                clearCart();
                navigate("/checkout/exito");
              }}
            />
          )}
        </div>

        {errorCheckout && <p className="text-red-600 text-sm">{errorCheckout}</p>}
      </form>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-1">
            <span>{item.nombre} × {item.quantity}</span>
            <span>{(item.precio * item.quantity).toFixed(2)} €</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>{shippingCost.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between font-bold text-base mt-2">
          <span>Total</span>
          <span>{(cartTotal + shippingCost).toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}
