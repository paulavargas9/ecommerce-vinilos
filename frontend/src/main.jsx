import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import { FavoritosProvider } from './context/FavoritosContext';
import { SearchProvider } from "./context/SearchContext";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <SearchProvider>
  <AuthProvider>
    <CartProvider>
      <FavoritosProvider>
        <App />
      </FavoritosProvider>
    </CartProvider>
  </AuthProvider>
</SearchProvider>
  </BrowserRouter>
</React.StrictMode>

);
