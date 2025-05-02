import { useEffect, useState } from "react";
import { getProductos } from "./api/productos";
import ProductCard from "./components/ProductCard";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then((data) => {
      setProductos(data.content); 
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mi tienda de vinilos 🎵</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default App;
