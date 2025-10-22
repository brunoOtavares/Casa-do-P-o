import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleBuy = () => {
    // Add product to cart with selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const handleCancel = () => {
    setQuantity(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative">
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors active:scale-95"
          >
            <X size={20} className="text-gray-700" />
          </button>
          
          {/* Product Image */}
          <div className="relative h-64 bg-gradient-to-br from-warm-sand to-warm-toast">
            <img
              src={product.imageUrl || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h2 className="text-2xl font-display font-black text-gray-900 mb-3">
            {product.name}
          </h2>
          
          <div className="mb-4">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-2">unidade</span>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Descrição</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || 'Produto artesanal feito com ingredientes selecionados e muito carinho pela Casa do Pão.'}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Quantidade</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-warm-sand hover:bg-warm-toast p-3 rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              
              <div className="bg-warm-sand px-6 py-3 rounded-full min-w-[80px] text-center">
                <span className="font-bold text-lg">{quantity}</span>
              </div>
              
              <button
                onClick={handleIncreaseQuantity}
                className="bg-warm-sand hover:bg-warm-toast p-3 rounded-full transition-colors active:scale-95"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 p-4 bg-warm-cream rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">Total:</span>
              <span className="text-2xl font-black text-primary-600">
                R$ {(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-full transition-colors active:scale-95"
            >
              Cancelar
            </button>
            
            <button
              onClick={handleBuy}
              className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-black py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>Comprar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;