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
      <header className="bg-gradient-to-r from-white via-warm-cream to-white sticky top-0 z-50 shadow-xl border-b-2 border-warm-sand backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img
                src={logo}
                alt="Casa do Pão"
                className="h-12 w-auto group-hover:scale-110 transition-transform"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary-500/20 blur-xl group-hover:bg-primary-500/30 transition-all rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                Casa do Pão
              </span>
              <span className="text-[10px] text-gray-500 font-bold -mt-1">Artesanal</span>
            </div>
          </Link>

          {/* Icons Right */}
          <div className="flex items-center gap-2">
            <Link
              to="/carrinho"
              className="relative p-3 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 rounded-full hover:from-primary-100 hover:to-primary-200 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <ShoppingCart size={20} className="stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-secondary-500 to-secondary-400 text-gray-900 text-xs font-black rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 rounded-full hover:from-primary-100 hover:to-primary-200 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-b from-white via-warm-cream to-warm-sand p-6 shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Menu */}
            <div className="mt-8 mb-8 text-center">
              <div className="text-4xl mb-2">🍞</div>
              <h3 className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">Menu</h3>
              <p className="text-xs text-gray-600 mt-1">Navegue pelo site</p>
            </div>

            <nav className="space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-warm-cream rounded-3xl hover:from-primary-50 hover:to-primary-100 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Home size={20} />
                </div>
                <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Início</span>
              </Link>

              <Link
                to="/produtos"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-warm-cream rounded-3xl hover:from-primary-50 hover:to-primary-100 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Package size={20} />
                </div>
                <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Produtos</span>
              </Link>

              <Link
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-warm-cream rounded-3xl hover:from-primary-50 hover:to-primary-100 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Contato</span>
              </Link>
            </nav>

            {/* Footer do Menu */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-3xl text-center shadow-xl">
                <p className="text-sm font-bold">Casa do Pão</p>
                <p className="text-xs opacity-90">Pães artesanais fresquinhos</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
