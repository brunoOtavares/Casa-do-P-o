import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card p-4 flex gap-4 hover:scale-[1.01] active:scale-[0.99]">
      {/* Imagem - Quadrada e arredondada */}
      <div className="w-24 h-24 flex-shrink-0 bg-warm-sand rounded-3xl overflow-hidden">
        <img
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info do Produto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-lg text-gray-900 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="text-2xl font-black text-primary-600">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
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
