import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { Plus, Edit2, Trash2, Save, X, Lock, LogOut, Upload, Image as ImageIcon } from 'lucide-react';
import { uploadImageToImgBB } from '../utils/imageUpload';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'paes',
    imageUrl: '',
    featured: false
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        loadProducts();
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      if (error.code === 'auth/invalid-credential') {
        setLoginError('Email ou senha incorretos');
      } else if (error.code === 'auth/user-not-found') {
        setLoginError('Usuário não encontrado');
      } else if (error.code === 'auth/wrong-password') {
        setLoginError('Senha incorreta');
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('Email inválido');
      } else {
        setLoginError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout');
    }
  };

  const toggleForm = () => {
    if (!showForm) {
      resetForm();
    }
    setShowForm(prev => !prev);
  };

  const loadProducts = async () => {
    try {
      setProductsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      alert('Erro ao carregar produtos. Verifique a configuração do Firebase.');
    } finally {
      setProductsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 32 * 1024 * 1024) { // 32MB máximo do ImgBB
        alert('Imagem muito grande! Máximo 32MB.');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Se tem imagem nova, fazer upload
      if (imageFile) {
        setUploadingImage(true);
        const uploadResult = await uploadImageToImgBB(imageFile);

        if (!uploadResult.success) {
          alert('Erro ao fazer upload da imagem: ' + uploadResult.error);
          setLoading(false);
          setUploadingImage(false);
          return;
        }

        imageUrl = uploadResult.url;
        setUploadingImage(false);
      }

      const productData = {
        ...formData,
        imageUrl,
        price: parseFloat(formData.price)
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        alert('Produto atualizado com sucesso!');
      } else {
        await addDoc(collection(db, 'products'), productData);
        alert('Produto adicionado com sucesso!');
      }

      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Verifique a configuração do Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl || '',
      featured: product.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        alert('Produto excluído com sucesso!');
        loadProducts();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'paes',
      imageUrl: '',
      featured: false
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  // Tela de carregamento
  if (authLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Tela de Login
  if (!user) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
                <Lock size={40} className="text-primary-600" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900">Painel Administrativo</h2>
              <p className="text-gray-600 mt-2">Faça login para acessar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="admin@casadopao.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-2xl">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-primary py-3"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-sm text-gray-500 text-center mt-4 space-y-1">
                <p>Para criar um usuário admin:</p>
                <p className="text-xs">1. Acesse o Firebase Console</p>
                <p className="text-xs">2. Vá em Authentication {'>'} Users</p>
                <p className="text-xs">3. Clique em "Add user"</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Painel Admin
  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header com Logout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-display font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">
              Bem-vindo, <span className="font-medium text-primary-600">{user.email}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={toggleForm}
              className="btn-primary flex items-center space-x-2"
              type="button"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              <span>{showForm ? 'Cancelar' : 'Novo Produto'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="btn-outline flex items-center space-x-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-display font-bold mb-6">
              {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nome do Produto *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Ex: Pão Francês"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preço (R$) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Categoria *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="paes">Pães</option>
                    <option value="bolos">Bolos</option>
                    <option value="doces">Doces</option>
                    <option value="salgados">Salgados</option>
                    <option value="diversos">Diversos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Imagem do Produto *
                  </label>
                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary-300 rounded-2xl cursor-pointer hover:border-primary-500 transition-colors bg-primary-50 hover:bg-primary-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-primary-500 mb-2" />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Clique para fazer upload</span>
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG ou WEBP (MAX. 32MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>

                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-2xl"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}

                    {formData.imageUrl && !imagePreview && (
                      <div className="relative">
                        <img
                          src={formData.imageUrl}
                          alt="Imagem atual"
                          className="w-full h-48 object-cover rounded-2xl"
                        />
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          Imagem atual
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Descrição *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="input-field resize-none"
                  placeholder="Descreva o produto"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="featured" className="ml-2 text-gray-700 font-medium">
                  Produto em Destaque
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save size={20} />
                  <span>
                    {uploadingImage ? 'Fazendo upload da imagem...' : loading ? 'Salvando...' : 'Salvar Produto'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Produtos */}
        <div className="card p-6">
          <h2 className="text-2xl font-display font-bold mb-6">Produtos Cadastrados</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Nenhum produto cadastrado. Adicione o primeiro produto!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Imagem</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoria</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preço</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Destaque</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-amber-50">
                      <td className="px-4 py-3">
                        <img
                          src={product.imageUrl || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                      </td>
                      <td className="px-4 py-3 capitalize">{product.category}</td>
                      <td className="px-4 py-3">R$ {product.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        {product.featured && (
                          <span className="bg-secondary-400 text-gray-900 text-xs px-2 py-1 rounded-full">
                            Sim
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-primary-600 hover:text-primary-700 p-2 hover:bg-primary-50 rounded mr-2"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
