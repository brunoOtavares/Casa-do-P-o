import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    generateWhatsAppMessage
  } = useCart();

  const handleWhatsAppOrder = () => {
    const whatsappUrl = generateWhatsAppMessage();
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center px-4">
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-display font-black mb-3 text-gray-900">
            Carrinho vazio
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Adicione produtos deliciosos!
          </p>
          <Link to="/produtos" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Ver Produtos</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="px-4 pb-8">
        {/* Header */}
        <div className="pt-6 pb-4">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-3 font-bold text-sm"
          >
            <ArrowLeft size={18} />
            <span>Continuar Comprando</span>
          </Link>
          <h1 className="text-3xl font-display font-black text-gray-900">Meu Carrinho</h1>
        </div>

        {/* Lista de Produtos - Mobile First */}
        <div className="space-y-4 mb-6">
          {cartItems.map(item => (
            <div key={item.id} className="card p-4">
              <div className="flex gap-3">
                {/* Imagem */}
                <div className="w-20 h-20 flex-shrink-0 bg-warm-sand rounded-3xl overflow-hidden">
                  <img
                    src={item.imageUrl || '/placeholder-product.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2">
                    R$ {item.price.toFixed(2)} cada
                  </p>

                  {/* Controles e Subtotal */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Quantidade */}
                    <div className="flex items-center bg-warm-sand rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-warm-toast rounded-full transition-colors active:scale-95"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-warm-toast rounded-full transition-colors active:scale-95"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="font-black text-lg text-primary-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Remover */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors active:scale-95"
                      title="Remover"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo Estático */}
        <div className="bg-white border-2 border-warm-sand rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-black text-primary-600">
              R$ {getCartTotal().toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-gray-900 font-black py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Finalizar no WhatsApp</span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Você será redirecionado para o WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
