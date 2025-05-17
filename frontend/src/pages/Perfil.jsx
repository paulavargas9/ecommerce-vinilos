import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Mi perfil</h2>

        <p className="mb-2">
          <strong>Nombre:</strong> {user.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        <button
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-80"
          onClick={() => alert("Funcionalidad futura")}
        >
          Ver mis pedidos
        </button>
      </div>
    </div>
  );
}
