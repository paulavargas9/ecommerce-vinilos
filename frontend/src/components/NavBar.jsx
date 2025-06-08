import { navbarLinks } from "../data/data";
import { CiSearch, CiHeart } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useFavoritos } from "../context/FavoritosContext";
import { useState } from "react";
import ResponsiveMenu from './ResponsiveMenu';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom"; 



const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { favoritos } = useFavoritos();
  const { query, setQuery } = useSearch();
  const { products } = useProducts();  
  const navigate = useNavigate();   
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { clearCart } = useCart();
  const { clearFavoritos } = useFavoritos();

const toggleMenu = () => setMenuOpen(!menuOpen);
const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="relative z-50">
        <div className="container flex justify-between items-center py-8">
          
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <img src="../img/logo.webp" alt="Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold">LAMEDISCOS</span>
          </div>

          
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {navbarLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="inline-block py-1 px-3 hover:text-primary font-semibold"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar discos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const encontrado = products.find((p) =>
                    p.nombre.toLowerCase().includes(query.toLowerCase())
                  );
                  if (encontrado) {
                    navigate(`/producto/${encontrado.slug}`);
                    setQuery(""); 
                  }
                }
              }}
              className="hidden md:block border px-3 py-1 rounded-md text-sm w-40 md:w-64"
            />

            <button
              className="block md:hidden text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch />
            </button>

            
            <Link to="/carrito" className="relative">
              <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                <PiShoppingCartSimpleThin />
              </button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            
            <Link to="/favoritos" className="relative">
              <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                <CiHeart />
              </button>
              {favoritos.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {favoritos.length}
                </span>
              )}
            </Link>

            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4 relative">
                <button
                  onClick={toggleMenu}
                  className="text-sm font-medium text-gray-700 hover:underline"
                >
                  {user?.name}
                </button>

                {menuOpen && (
                  <div className="absolute top-8 right-0 bg-white border rounded shadow-md p-2 min-w-max z-50">
                    {user?.rol === "ADMIN" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Panel de Administración
                      </Link>
                    )}

                  <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Mi perfil
                      </Link>
                    <button
                    onClick={() => {
                      clearCart(); 
                      clearFavoritos();
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/"; 

                    }}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Cerrar sesión
                  </button>


                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-primary px-6 py-2 duration-200 hidden md:block"
              >
                INICIAR SESIÓN
              </Link>
            )}
          </div>

   
          <div className="md:hidden">
            <MdMenu onClick={() => setOpen(!open)} className="text-4xl" />
          </div>
        </div>
      </nav>

 
      {showSearch && (
        <div className="fixed top-0 left-0 right-0 bg-white p-4 z-50 shadow-md border-b">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar discos..."
              className="flex-grow border px-3 py-2 rounded-md text-sm"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="text-red-600 font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

     
      <ResponsiveMenu open={open} navbarLinks={navbarLinks} />
    </>
  );
};

export default NavBar;
