import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    // Button is now disabled - no functionality
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative card p-4 flex gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group bg-gradient-to-br from-white to-warm-cream cursor-pointer"
    >
      {/* Badge decorativo se for destaque */}
      {product.featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-secondary-500 to-secondary-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full shadow-lg z-10">
          ⭐ Destaque
        </div>
      )}

      {/* Imagem - Quadrada e arredondada */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gradient-to-br from-warm-sand to-warm-toast rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
        <img
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      {/* Info do Produto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-lg text-gray-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">A partir de</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled
            className="relative bg-gradient-to-r from-gray-400 to-gray-500 text-white p-3.5 rounded-full shadow-lg opacity-60 cursor-not-allowed"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={20} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
