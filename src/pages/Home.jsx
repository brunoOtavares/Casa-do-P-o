import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Search, X } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'paes', name: 'Pães' },
    { id: 'bolos', name: 'Bolos' },
    { id: 'doces', name: 'Doces' },
    { id: 'salgados', name: 'Salgados' },
    { id: 'diversos', name: 'Diversos' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filtrar por busca
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Mobile-First */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white px-4 py-12 text-center rounded-b-[3rem] shadow-2xl">
        <h1 className="text-4xl font-display font-black mb-3 tracking-tight">
          Casa do Pão
        </h1>
        <p className="text-lg font-medium opacity-95 max-w-xs mx-auto">
          Pães artesanais fresquinhos 🍞
        </p>
      </section>

      {/* Filtros e Busca */}
      <section className="px-4 pt-6">
        {/* Barra de Busca */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-warm-sand rounded-full focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none transition-all text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 active:scale-95"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Filtros de Categoria - Scroll Horizontal */}
        <div className="-mx-4 px-4 overflow-x-auto mb-6">
          <div className="flex gap-2 pb-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg active:scale-95'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos - Layout Mobile */}
      <section className="px-4 pb-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-400 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-sm">Carregando...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="text-6xl mb-4">🥖</div>
            <p className="text-gray-600 text-lg font-medium mb-2">
              {searchTerm || selectedCategory !== 'all'
                ? 'Nenhum produto encontrado'
                : 'Nenhum produto ainda'}
            </p>
            <p className="text-gray-500 text-sm">
              {searchTerm || selectedCategory !== 'all'
                ? 'Tente outra busca ou categoria'
                : 'Aguarde novidades em breve!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
