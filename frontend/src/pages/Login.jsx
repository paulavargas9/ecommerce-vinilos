import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
const registered = location.state?.registered;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error en el login");
      }

      const data = await res.json();
      setToken(data.token);
      setUser({ name: data.name, email: data.email });
      // ✅ Guardar en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));

      // ✅ Redirigir
      navigate("/perfil");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

      {registered && (
      <p className="text-green-600 text-sm mb-4">
        Cuenta creada correctamente. ¡Inicia sesión!
      </p>
    )}


      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
        >
          Iniciar sesión
        </button>

        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?
          <Link to="/register" className="text-primary hover:underline ml-1">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

