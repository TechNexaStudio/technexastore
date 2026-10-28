import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  ChevronRight, 
  Shield, 
  Lock, 
  Sparkles,
  Phone,
  Layers,
  Heart,
  Clock,
  Info,
  Star,
  Home,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenAdmin,
  activeCategory, 
  onSelectCategory,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectProduct
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { id: 'all', label: 'All Collection' },
    { id: 'Mens', label: 'Mens' },
    { id: 'Womens', label: 'Womens' },
    { id: 'Kids', label: 'Kids' },
  ];

  const handleNavClick = (action) => {
    setIsMobileMenuOpen(false);
    if (typeof action === 'function') {
      action();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
        {/* Full width container with extreme left button placement */}
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            
            {/* Extreme Left: 3-line hamburger menu button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-3 rounded-2xl bg-stone-100 hover:bg-stone-900 text-stone-800 hover:text-white transition-all shadow-sm border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-stone-400 group"
                aria-label="Open Navigation Menu"
                title="Navigation Menu"
              >
                <Menu className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
              </button>

              {/* Logo / Brand Name */}
              <div 
                onClick={() => {
                  onSelectCategory('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group flex flex-col"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-[0.2em] text-stone-900 group-hover:text-amber-800 transition">
                    TECHNEXA<span className="text-amber-700 font-light">STORE</span>
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-medium -mt-1 hidden sm:block">
                  Couture & Everyday Luxury
                </span>
              </div>
            </div>

            {/* Center: Desktop Category Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100 p-1.5 rounded-full border border-stone-200/80">
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.getElementById('shop-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                      isActive 
                        ? 'bg-stone-900 text-white shadow-sm' 
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Search, WhatsApp & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Bar with live popup */}
              <div className="relative">
                <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 w-32 sm:w-52 lg:w-64 focus-within:w-44 sm:focus-within:w-64 lg:focus-within:w-72 focus-within:border-stone-900 focus-within:bg-white transition-all">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                    placeholder="Search suits, shirts..."
                    className="w-full text-xs bg-transparent text-stone-800 placeholder-stone-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => onSearchChange('')} 
                      className="text-stone-400 hover:text-stone-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Instant Search Results Dropdown */}
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs text-stone-500 font-medium">
                      <span>Matching Articles ({searchResults.length})</span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">Live Results</span>
                    </div>

                    {searchResults.length === 0 ? (
                      <div className="py-6 text-center text-xs text-stone-500">
                        No articles found matching "{searchQuery}". Try "Mens", "Womens", or "Kids".
                      </div>
                    ) : (
                      <div className="max-h-72 overflow-y-auto space-y-2">
                        {searchResults.slice(0, 5).map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              onSelectProduct(prod);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition border border-transparent hover:border-stone-200"
                          >
                            <img 
                              src={prod.image} 
                              alt={prod.title} 
                              className="w-12 h-14 object-cover rounded-lg shrink-0 border border-stone-100" 
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-stone-900 truncate">{prod.title}</h4>
                              <p className="text-[11px] text-stone-500 capitalize">{prod.category} • In Stock</p>
                              <div className="text-xs font-bold text-amber-800 mt-0.5">
                                Rs. {Number(prod.price).toLocaleString()}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* WhatsApp direct button */}
              <a
                href="https://wa.me/923287205940?text=Assalam%20o%20Alaikum%20TECHNEXASTORE,%20I%20am%20interested%20in%20your%20clothing%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold transition"
                title="Direct WhatsApp Helpline"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>03287205940</span>
              </a>

              {/* Shopping Bag / Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition shadow-sm flex items-center justify-center focus:ring-2 focus:ring-stone-400"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3-Line Hamburger Slide-Over Drawer with Expanded Options */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <span className="font-extrabold text-xl tracking-wider text-stone-900">
                  TECHNEXA<span className="text-amber-700">STORE</span>
                </span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">Full Store Menu</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links (Added 5+ requested options!) */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {/* Option 1: Home */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Explore</p>
                <button
                  onClick={() => {
                    handleNavClick();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-stone-600" />
                    <span>Home & Hero Video</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              {/* Option 2, 3, 4, 5: Collections (All, Mens, Womens, Kids) */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Shop Categories</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        handleNavClick();
                        const el = document.getElementById('shop-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                        activeCategory.toLowerCase() === cat.id.toLowerCase()
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 opacity-70" />
                        {cat.label}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 6: About Our Brand & Heritage */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Store Highlights</p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleNavClick();
                      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Info className="w-4 h-4 text-amber-700" />
                      <span>About TECHNEXASTORE</span>
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Heritage</span>
                  </button>

                  {/* Option 7: Store Timings & Showroom */}
                  <button
                    onClick={() => {
                      handleNavClick();
                      document.getElementById('timings-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-stone-600" />
                      <span>Showroom Timings & Hours</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>

                  {/* Option 8: Customer Reviews */}
                  <button
                    onClick={() => {
                      handleNavClick();
                      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>4.9★ Customer Satisfaction</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>

              {/* Direct WhatsApp Contact Card */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Helpline</span>
                </div>
                <p className="text-[11px] text-emerald-800/80 mt-1">Direct inquiries, size consultation & custom orders.</p>
                <a
                  href="https://wa.me/923287205940?text=Assalam%20o%20Alaikum%20TECHNEXASTORE%20Support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition shadow-sm"
                >
                  💬 Chat: 03287205940
                </a>
              </div>

              {/* PRIVACY SECTION (With Admin Panel inside it as requested) */}
              <div className="border-t border-stone-200 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Security & Settings</p>
                
                {/* Privacy Accordion Item */}
                <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/60">
                  <button
                    type="button"
                    onClick={() => setIsPrivacyExpanded(!isPrivacyExpanded)}
                    className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-stone-800 hover:bg-stone-100 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-amber-700" />
                      <span>Privacy</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${isPrivacyExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Inside Privacy: Sub-options including the Admin Panel */}
                  {isPrivacyExpanded && (
                    <div className="p-2 space-y-1 bg-white border-t border-stone-200">
                      <div className="px-3 py-2 text-[11px] text-stone-500 leading-relaxed border-b border-stone-100">
                        Customer data, phone numbers, and addresses are strictly encrypted and never shared with third parties.
                      </div>

                      {/* THE ADMIN PANEL LINK */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100 transition border border-amber-200"
                      >
                        <span className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Admin Panel</span>
                        </span>
                        <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-mono font-semibold">
                          Login
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Footer info in drawer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
              <p className="text-[11px] text-stone-500">
                TECHNEXASTORE © 2026 • 03287205940
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
