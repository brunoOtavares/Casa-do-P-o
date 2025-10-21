import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Home, Package, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import logo from '../logo/Gemini_Generated_Image_sdt1p6sdt1p6sdt1.png';

const Header = () => {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <>
      {/* Header Mobile-First */}
      <header className="bg-white sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Casa do Pão"
              className="h-10 w-auto"
            />
            <span className="font-display font-black text-lg text-primary-600">
              Casa do Pão
            </span>
          </Link>

          {/* Icons Right */}
          <div className="flex items-center gap-2">
            <Link
              to="/carrinho"
              className="relative p-3 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
            >
              <ShoppingCart size={20} className="stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="mt-16 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-4 bg-warm-sand rounded-3xl hover:bg-warm-toast transition-colors"
              >
                <Home size={22} className="text-primary-600" />
                <span className="font-bold text-gray-900">Início</span>
              </Link>

              <Link
                to="/produtos"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-4 bg-warm-sand rounded-3xl hover:bg-warm-toast transition-colors"
              >
                <Package size={22} className="text-primary-600" />
                <span className="font-bold text-gray-900">Produtos</span>
              </Link>

              <Link
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-4 bg-warm-sand rounded-3xl hover:bg-warm-toast transition-colors"
              >
                <Phone size={22} className="text-primary-600" />
                <span className="font-bold text-gray-900">Contato</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
