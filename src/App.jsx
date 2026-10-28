import React, { useState, useEffect, useMemo } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HeroVideo from './components/HeroVideo';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import FeaturedSpotlight from './components/FeaturedSpotlight';
import AboutSection from './components/AboutSection';
import StoreTimingsSection from './components/StoreTimingsSection';
import Footer from './components/Footer';
import { initialProducts } from './data/initialProducts';
import { isSupabaseConfigured, supabase } from './supabase';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  MessageCircle, 
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Flame,
  Award
} from 'lucide-react';

export default function App() {
  // Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('technexa_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialProducts;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('technexa_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('technexa_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Panels State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('technexa_products', JSON.stringify(products));
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('technexa_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem('technexa_orders', JSON.stringify(orders));
  }, [orders]);

  // If Supabase is configured, fetch live products
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped = data.map(item => ({
              ...item,
              originalPrice: item.original_price,
              reviewsCount: item.reviews_count,
              inStock: item.in_stock
            }));
            setProducts(mapped);
          }
        });
    }
  }, []);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = 
          activeCategory === 'all' || 
          p.category?.toLowerCase() === activeCategory.toLowerCase();

        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = 
          !query || 
          p.title?.toLowerCase().includes(query) || 
          p.category?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.badge?.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  // Search Results for instant Navbar popover
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.trim().toLowerCase();
    return products.filter((p) => 
      p.title?.toLowerCase().includes(query) || 
      p.category?.toLowerCase().includes(query) ||
      p.badge?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === (product.selectedSize || 'M')
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity = (copy[existingIndex].quantity || 1) + (product.quantity || 1);
        return copy;
      }
      return [...prev, { ...product, quantity: product.quantity || 1, selectedSize: product.selectedSize || 'M' }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index, newQty) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => setCart([]);

  // Direct WhatsApp Order from Card
  const handleDirectWhatsApp = (product) => {
    const size = product.sizes?.[0] || 'Standard';
    const message = 
`Assalam o Alaikum TECHNEXASTORE!
I want to order this article:

*Article:* ${product.title}
*Category:* ${product.category}
*Size:* ${size}
*Price:* Rs. ${Number(product.price).toLocaleString()}

Please confirm availability and dispatch details. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923287205940?text=${encoded}`, '_blank');
  };

  // WhatsApp Order from Detail Modal
  const handleModalWhatsAppOrder = (product, selectedSize, selectedColor, quantity) => {
    const total = Number(product.price) * quantity;
    const message = 
`Assalam o Alaikum TECHNEXASTORE!
I want to order:

*Article:* ${product.title}
*Category:* ${product.category}
*Size:* ${selectedSize}
*Shade/Color:* ${selectedColor}
*Quantity:* ${quantity}
*Total Amount:* Rs. ${total.toLocaleString()}
*Payment:* Cash on Delivery (COD)

Please confirm my order. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923287205940?text=${encoded}`, '_blank');
  };

  // Record Order Handler
  const handleRecordOrder = (orderData) => {
    const newOrder = {
      id: `ord_${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setOrders((prev) => [newOrder, ...prev]);

    if (isSupabaseConfigured && supabase) {
      supabase.from('orders').insert([
        {
          customer_name: orderData.customerName,
          customer_phone: orderData.customerPhone,
          customer_address: orderData.customerAddress,
          customer_city: orderData.customerCity,
          items: orderData.items,
          total_amount: orderData.totalAmount,
          status: 'pending'
        }
      ]).then(() => {});
    }
  };

  // Admin Product Handlers
  const handleAddProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').insert([newProd]).then(() => {});
    }
  };

  const handleUpdateProduct = (updatedProd) => {
    setProducts((prev) => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').update(updatedProd).eq('id', updatedProd.id).then(() => {});
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter(p => p.id !== productId));
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').delete().eq('id', productId).then(() => {});
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Split products for inserting the Big Highlighted Spotlight after the first 4 products
  const firstFourProducts = filteredProducts.slice(0, 4);
  const remainingProducts = filteredProducts.slice(4);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Navbar with 3-line Menu on extreme left, Search & Cart */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* 3. Hero Section with Background Video */}
      <HeroVideo onSelectCategory={setActiveCategory} />

      {/* 4. Category Showcase Cards (Mens, Womens, Kids) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Mens Card */}
          <div 
            onClick={() => {
              setActiveCategory('Mens');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-white"
          >
            <img 
              src="/products/05_beige_blazer.jpg" 
              alt="Menswear Collection" 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">Refined Cuts</span>
                <h3 className="text-xl font-bold font-serif">Mens Collection</h3>
                <p className="text-xs text-stone-300 mt-0.5">Blazers, Shirts & Chinos</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-stone-950 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Womens Card */}
          <div 
            onClick={() => {
              setActiveCategory('Womens');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-white"
          >
            <img 
              src="/products/02_floral_womens_dress.jpg" 
              alt="Womenswear Collection" 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">Timeless Grace</span>
                <h3 className="text-xl font-bold font-serif">Womens Collection</h3>
                <p className="text-xs text-stone-300 mt-0.5">Maxis, Abayas & Blouses</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-stone-950 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Kids Card */}
          <div 
            onClick={() => {
              setActiveCategory('Kids');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-white"
          >
            <img 
              src="/products/03_kids_green_tracksuit.jpg" 
              alt="Kids Collection" 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">Playful Comfort</span>
                <h3 className="text-xl font-bold font-serif">Kids Collection</h3>
                <p className="text-xs text-stone-300 mt-0.5">Tracksuits & Party Frocks</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-stone-950 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Main Shop Catalog Section */}
      <main id="shop-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Curated Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 font-serif">
              {activeCategory === 'all' ? 'All Collection' : `${activeCategory} Collection`}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Showing {filteredProducts.length} premium articles • Cash on delivery available
            </p>
          </div>

          {/* Interactive Filters (Category Pills & Sorting) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center bg-white p-1 rounded-2xl border border-stone-200 shadow-sm">
              {['all', 'Mens', 'Womens', 'Kids'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl border border-stone-200 shadow-sm text-xs text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid with Highlighted Spotlight Section inserted after 4 articles */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 mt-8">
            <p className="text-base font-bold text-stone-800">No products found</p>
            <p className="text-xs text-stone-500 mt-1">
              Try switching categories or clearing your search term.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            
            {/* First 4 Products */}
            {firstFourProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod) => handleAddToCart(prod)}
                onDirectWhatsApp={(prod) => handleDirectWhatsApp(prod)}
              />
            ))}

            {/* BIG HIGHLIGHTED SECTION INSERTED AFTER 4 ARTICLES (USER REQUIREMENT) */}
            {firstFourProducts.length > 0 && (
              <FeaturedSpotlight 
                onSelectCategory={setActiveCategory}
                onDirectWhatsApp={handleDirectWhatsApp}
              />
            )}

            {/* Remaining Products */}
            {remainingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod) => handleAddToCart(prod)}
                onDirectWhatsApp={(prod) => handleDirectWhatsApp(prod)}
              />
            ))}

          </div>
        )}

      </main>

      {/* 6. BIG HIGHLIGHTED SECTION: ALL ABOUT SHOP DETAILS (USER REQUIREMENT) */}
      <AboutSection />

      {/* 7. BIG HIGHLIGHTED SECTION: STORE PICTURE & SHOP TIMINGS (USER REQUIREMENT) */}
      <StoreTimingsSection />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/923287205940?text=Assalam%20o%20Alaikum%20TECHNEXASTORE,%20I%20have%20an%20order%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        title="Chat on WhatsApp (03287205940)"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs font-bold pl-1">
          Chat on WhatsApp
        </span>
      </a>

      {/* Product Detail Modal with Zoom */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onWhatsAppOrder={handleModalWhatsAppOrder}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onRecordOrder={handleRecordOrder}
      />

      {/* Secret Admin Panel (Accessed via 3-Line Menu -> Privacy -> Admin Panel) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        orders={orders}
      />

      {/* 8. High-End Footer */}
      <Footer 
        onSelectCategory={setActiveCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

    </div>
  );
}
