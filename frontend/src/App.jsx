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
import AdminRoute from "./routes/AdminRoute"; 
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminPedidos from "./pages/admin/AdminPedidos";
import PedidoDetalle from "./pages/admin/PedidoDetalle";
import Tendencias from "./pages/Tendencias";
import NuevasJoyas from "./pages/NuevasJoyas";




export default function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
      <Routes>
      <Route path="/admin" element={<AdminRoute />}>
      <Route element={<Admin />}>
        <Route path="pedidos/:id" element={<PedidoDetalle />} />
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="pedidos" element={<AdminPedidos />} />
      </Route>
    </Route>
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
        <Route path="/tendencias" element={<Tendencias />} />
        <Route path="/joyas" element={<NuevasJoyas />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
      </div>
  );
}


