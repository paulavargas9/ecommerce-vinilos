function ProductCard({ producto }) {
    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "10px",
        width: "250px"
      }}>
        <h3>{producto.nombre}</h3>
        <p>Precio: €{producto.precio}</p>
        <p>Stock: {producto.stock}</p>
      </div>
    );
  }
  
  export default ProductCard;
  