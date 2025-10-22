import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Componente para o carrinho sem footer
const CartWithNoFooter = () => {
  return (
    <div className="min-h-screen">
      <Cart />
    </div>
  );
};

// Componente para o footer que não aparece na página do carrinho
const FooterWithRoutes = () => {
  const location = useLocation();
  
  // Não mostrar footer na página do carrinho
  if (location.pathname === '/carrinho') {
    return null;
  }
  
  return <Footer />;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <FooterWithRoutes />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
