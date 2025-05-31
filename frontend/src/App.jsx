import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useCart } from "./context/CartContext"; 
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import PrivateRoute from "./components/PrivateRoute"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";
import Favoritos from "./pages/Favoritos";
import Success from "./pages/Success";
import Admin from "./pages/Admin"; 


export default function App() {
  const { cart, addToCart } = useCart(); // PRUEBA RECUERDA QUITARLO
  console.log("Carrito actual:", cart);  // PRUEBA RECUERDA QUITARLO
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
      <Routes>
      <Route path="/admin" element={<Admin/>} />
      <Route path="/checkout/exito" element={<Success />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/checkout"element={<PrivateRoute><Checkout /></PrivateRoute> }/>
      <Route path="/login" element={<Login />} />
      <Route path="/producto/:slug" element={<ProductDetail />} />
      <Route path="/shop/:categoria" element={<Category />} />
      <Route path="/carrito" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
      </div>
  );
}


