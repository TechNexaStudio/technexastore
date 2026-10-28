import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star, Check } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, onWhatsAppOrder }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Interactive Zoomable Image */}
          <div 
            className="relative bg-stone-100 overflow-hidden cursor-crosshair min-h-[360px] md:min-h-[500px]"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-cover object-center transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.badge && (
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-stone-950 text-white rounded-full">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-amber-600 text-white rounded-full">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-stone-700">
              Hover to Zoom Fabric
            </div>
          </div>

          {/* Right: Info, Selectors & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-widest font-semibold text-amber-800">
                  {product.category} Collection
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-stone-800">{product.rating || '4.9'}</span>
                  <span className="text-stone-400">({product.reviewsCount || 28} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-serif">
                {product.title}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-stone-950 font-sans">
                  Rs. {Number(product.price).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    Rs. {Number(product.originalPrice).toLocaleString()}
                  </span>
                )}
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  In Stock
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description || "Crafted with refined stitching, premium grade fabric, and long-lasting color retention. Tailored to perfection for unmatched style and daily comfort."}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Select Size: <span className="text-amber-800 font-bold">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-stone-400">True to size</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition ${
                          selectedSize === s
                            ? 'bg-stone-900 text-white shadow-sm ring-2 ring-stone-900'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                    Available Shades: <span className="text-amber-800 font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          selectedColor === c
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-950 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-stone-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-950 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3 pt-6 border-t border-stone-200">
              
              {/* Direct WhatsApp Order */}
              <button
                type="button"
                onClick={() => {
                  onWhatsAppOrder(product, selectedSize, selectedColor, quantity);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Instant Order on WhatsApp (03287205940)</span>
              </button>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => {
                  onAddToCart({
                    ...product,
                    selectedSize,
                    selectedColor,
                    quantity
                  });
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white py-3 px-6 rounded-2xl font-semibold text-sm transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Policy Badges */}
              <div className="pt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-500">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Nationwide Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-stone-600" />
                  <span>7 Days Return</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
