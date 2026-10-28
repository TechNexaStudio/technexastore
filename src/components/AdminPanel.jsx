import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  KeyRound, 
  Plus, 
  Trash2, 
  Edit3, 
  Package, 
  ShoppingBag, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff, 
  Save, 
  ShieldAlert, 
  Database, 
  Check, 
  Copy,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../supabase';

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  orders = [],
  onUpdateOrderStatus 
}) {
  // Password State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Admin Tab: 'products' | 'add_product' | 'orders' | 'security' | 'supabase'
  const [activeTab, setActiveTab] = useState('products');

  // Stored password (default: technexa1122)
  const [currentAdminPassword, setCurrentAdminPassword] = useState(() => {
    return localStorage.getItem('technexa_admin_pwd') || 'technexa1122';
  });

  // Change Password Form State
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMessage, setPwdMessage] = useState({ text: '', type: '' });

  // Add / Edit Product Form State
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Mens',
    price: '',
    originalPrice: '',
    sizes: 'S, M, L, XL',
    colors: 'Standard',
    image: '',
    badge: 'New Arrival',
    inStock: true,
    description: ''
  });
  const [formSuccess, setFormSuccess] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === currentAdminPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect Password. Please enter the valid admin password.');
    }
  };

  // Handle Password Change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (oldPwd !== currentAdminPassword) {
      setPwdMessage({ text: 'Current password does not match!', type: 'error' });
      return;
    }
    if (newPwd.length < 6) {
      setPwdMessage({ text: 'New password must be at least 6 characters long.', type: 'error' });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMessage({ text: 'New passwords do not match!', type: 'error' });
      return;
    }

    // Save locally
    localStorage.setItem('technexa_admin_pwd', newPwd);
    setCurrentAdminPassword(newPwd);

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      supabase.from('admin_settings')
        .upsert({ id: 'config', admin_password: newPwd, updated_at: new Date() })
        .then(() => {});
    }

    setPwdMessage({ text: 'Password successfully updated!', type: 'success' });
    setOldPwd('');
    setNewPwd('');
    setConfirmPwd('');
  };

  // Reset or Start Editing
  const startEdit = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title,
      category: prod.category || 'Mens',
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      sizes: Array.isArray(prod.sizes) ? prod.sizes.join(', ') : prod.sizes || 'S, M, L, XL',
      colors: Array.isArray(prod.colors) ? prod.colors.join(', ') : prod.colors || 'Standard',
      image: prod.image,
      badge: prod.badge || '',
      inStock: prod.inStock ?? true,
      description: prod.description || ''
    });
    setActiveTab('add_product');
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price || !productForm.image) {
      alert('Please fill in title, price, and image URL!');
      return;
    }

    const sizesArray = productForm.sizes
      ? productForm.sizes.split(',').map(s => s.trim()).filter(Boolean)
      : ['S', 'M', 'L', 'XL'];

    const colorsArray = productForm.colors
      ? productForm.colors.split(',').map(c => c.trim()).filter(Boolean)
      : ['Standard'];

    const payload = {
      id: editingProductId || `prod_${Date.now()}`,
      title: productForm.title,
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      sizes: sizesArray,
      colors: colorsArray,
      image: productForm.image,
      badge: productForm.badge,
      inStock: productForm.inStock,
      description: productForm.description,
      rating: 4.9,
      reviewsCount: 15
    };

    if (editingProductId) {
      onUpdateProduct(payload);
      setFormSuccess('Product updated successfully!');
    } else {
      onAddProduct(payload);
      setFormSuccess('New product added to store catalog!');
    }

    setTimeout(() => {
      setFormSuccess('');
      setEditingProductId(null);
      setProductForm({
        title: '',
        category: 'Mens',
        price: '',
        originalPrice: '',
        sizes: 'S, M, L, XL',
        colors: 'Standard',
        image: '',
        badge: 'New Arrival',
        inStock: true,
        description: ''
      });
      setActiveTab('products');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-md" 
      />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 z-10 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-wider uppercase">
                  TECHNEXASTORE <span className="text-amber-400 font-normal">Admin Portal</span>
                </h3>
                <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                  v2.6 Secure
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Manage clothing catalog, stock, WhatsApp orders, and security settings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#fafaf9]">

          {/* 1. PASSWORD AUTHENTICATION SCREEN */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-sm">
                <KeyRound className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-stone-900">Protected Administrator Area</h2>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Please enter your administrator password to manage store products and customer orders.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm bg-white pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    {authError}
                  </p>
                )}

                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 text-left">
                  💡 <strong>Default Password:</strong> <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">technexa1122</code> (Aap ise andar ja kar kisi bhi waqt change kar sakte hain).
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-md"
                >
                  Unlock Admin Panel
                </button>
              </form>
            </div>
          ) : (
            /* 2. AUTHENTICATED DASHBOARD */
            <div>
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4 mb-6">
                <button
                  onClick={() => { setActiveTab('products'); setEditingProductId(null); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'products'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>All Products ({products.length})</span>
                </button>

                <button
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm({
                      title: '',
                      category: 'Mens',
                      price: '',
                      originalPrice: '',
                      sizes: 'S, M, L, XL',
                      colors: 'Standard',
                      image: '',
                      badge: 'New Arrival',
                      inStock: true,
                      description: ''
                    });
                    setActiveTab('add_product');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'add_product'
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingProductId ? 'Edit Product' : 'Add New Product'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'orders'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Orders Log ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'security'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Change Password</span>
                </button>

                <button
                  onClick={() => setActiveTab('supabase')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'supabase'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Supabase Sync</span>
                </button>
              </div>

              {/* TAB 1: ALL PRODUCTS LIST */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-base text-stone-900">Current Clothing Catalog</h4>
                      <p className="text-xs text-stone-500">Live products displayed on TECHNEXASTORE</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('add_product')}
                      className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Article</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm flex gap-3 hover:border-stone-400 transition"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.title} 
                          className="w-20 h-24 object-cover rounded-xl border border-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                                {prod.category}
                              </span>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${prod.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {prod.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                            <h5 className="font-bold text-xs text-stone-900 mt-1 truncate">{prod.title}</h5>
                            <p className="text-xs font-bold text-stone-950 mt-0.5">
                              Rs. {Number(prod.price).toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                            <button
                              onClick={() => startEdit(prod)}
                              className="flex items-center gap-1 text-[11px] font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${prod.title}" from store?`)) {
                                  onDeleteProduct(prod.id);
                                }
                              }}
                              className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: ADD / EDIT PRODUCT */}
              {activeTab === 'add_product' && (
                <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm mx-auto">
                  <h4 className="font-bold text-lg text-stone-900 mb-1">
                    {editingProductId ? 'Edit Product Details' : 'Add New Clothing Article'}
                  </h4>
                  <p className="text-xs text-stone-500 mb-6">
                    Enter the product information to update the store catalog.
                  </p>

                  {formSuccess && (
                    <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{formSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.title}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        placeholder="e.g. Royal Embroidered Kurta"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Category *
                        </label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50 font-medium"
                        >
                          <option value="Mens">Mens</option>
                          <option value="Womens">Womens</option>
                          <option value="Kids">Kids</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Badge (Optional)
                        </label>
                        <input
                          type="text"
                          value={productForm.badge}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          placeholder="e.g. Best Seller / Trending / Sale"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Selling Price (PKR) *
                        </label>
                        <input
                          type="number"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          placeholder="e.g. 3500"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50 font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Original Price (For Discount)
                        </label>
                        <input
                          type="number"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                          placeholder="e.g. 4500"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Available Sizes (comma separated)
                        </label>
                        <input
                          type="text"
                          value={productForm.sizes}
                          onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                          placeholder="S, M, L, XL"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Colors (comma separated)
                        </label>
                        <input
                          type="text"
                          value={productForm.colors}
                          onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                          placeholder="Blue, Black, White"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Image URL / File Path *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        placeholder="e.g. /products/01_mens_blue_shirt.jpg or https://..."
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">
                        Tip: You can use existing images in `/products/...` or paste any web / Supabase image URL.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Product Description
                      </label>
                      <textarea
                        rows={3}
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        placeholder="Fabric composition, cut, wash instructions..."
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="inStockCheck"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-700 focus:ring-stone-900"
                      />
                      <label htmlFor="inStockCheck" className="text-xs font-semibold text-stone-800">
                        Product is In Stock & Available for Order
                      </label>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                      >
                        {editingProductId ? 'Update Product' : 'Save & Publish Product'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('products')}
                        className="px-5 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: ORDERS LOG */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-base text-stone-900">Orders Log & Inquiries</h4>
                    <p className="text-xs text-stone-500">Orders initiated through website checkout and WhatsApp</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center">
                      <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                      <h5 className="font-bold text-sm text-stone-800">No Orders Placed Yet</h5>
                      <p className="text-xs text-stone-500 mt-1">
                        When customers checkout via WhatsApp, the order details will be logged here for tracking.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord, idx) => (
                        <div key={ord.id || idx} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-stone-900">{ord.customerName}</span>
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                                  {ord.status || 'Pending'}
                                </span>
                              </div>
                              <p className="text-xs text-stone-500 mt-0.5">
                                📞 {ord.customerPhone} • 📍 {ord.customerAddress}, {ord.customerCity}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-amber-900">
                                Rs. {Number(ord.totalAmount).toLocaleString()}
                              </span>
                              <p className="text-[10px] text-stone-400">Cash on Delivery</p>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-stone-600">
                            <span className="font-semibold text-stone-800">Items: </span>
                            {ord.items?.map((it, i) => (
                              <span key={i} className="inline-block bg-stone-100 px-2 py-0.5 rounded mr-2 mb-1">
                                {it.title} ({it.selectedSize || 'Standard'}) x {it.quantity || 1}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CHANGE PASSWORD (USER REQUIREMENT) */}
              {activeTab === 'security' && (
                <div className="max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-stone-900">Change Admin Password</h4>
                      <p className="text-xs text-stone-500">Update the password required to open this panel</p>
                    </div>
                  </div>

                  {pwdMessage.text && (
                    <div className={`p-3 rounded-xl text-xs font-semibold mb-4 border ${
                      pwdMessage.type === 'success' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {pwdMessage.text}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={oldPwd}
                        onChange={(e) => setOldPwd(e.target.value)}
                        placeholder="Current password (default: technexa1122)"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder="Enter new strong password"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        placeholder="Re-type new password"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: SUPABASE INTEGRATION STATUS */}
              {activeTab === 'supabase' && (
                <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm mx-auto space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
                        <Database className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-stone-900">Supabase Cloud Database</h4>
                        <p className="text-xs text-stone-500">Live PostgreSQL Database & Storage</p>
                      </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isSupabaseConfigured 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-600 animate-ping' : 'bg-amber-600'}`} />
                      <span>{isSupabaseConfigured ? 'Connected to Supabase' : 'Offline Mode (Local Storage)'}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2">
                    <p>
                      <strong>Project URL:</strong> <code className="bg-white px-2 py-0.5 rounded border border-stone-200">https://xkfpmlocctcrbrczmwdr.supabase.co</code>
                    </p>
                    <p>
                      Website filhaal <strong>Local Fallback Mode</strong> mein smoothly chal rahi hai. Jaise hi aap apni <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">.env.local</code> file banayenge, Supabase se auto-sync shuru ho jayega!
                    </p>
                  </div>

                  {/* Ready SQL Instructions */}
                  <div className="border-t border-stone-200 pt-4">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-1">
                      Quick Setup (Database Tables):
                    </h5>
                    <p className="text-xs text-stone-500 mb-3">
                      Supabase dashboard par ja kar left sidebar mein <strong>SQL Editor (`&gt;_`)</strong> kholein aur project root ki file <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono">supabase-setup.sql</code> ka code run karein.
                    </p>

                    <div className="bg-stone-900 text-stone-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                      -- Tables include: products, orders, admin_settings, storage bucket
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
