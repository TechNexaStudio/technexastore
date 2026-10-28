import React from 'react';
import { ShoppingBag, MessageCircle, Star, Eye } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart, onDirectWhatsApp }) {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col">
      
      {/* Image Container with Zoom Effect on Hover & Touch */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 active:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Floating Button on Hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-stone-900 p-2.5 rounded-full shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4 text-stone-700" />
        </button>

        {/* Category Pill on bottom left of image */}
        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-stone-700 uppercase tracking-widest">
          {product.category}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-stone-800 text-[11px]">{product.rating || '4.9'}</span>
            <span className="text-[10px] text-stone-400">({product.reviewsCount || 18})</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-amber-800 transition line-clamp-1 cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Available Sizes Pills */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-2 flex items-center gap-1 flex-wrap">
              <span className="text-[10px] text-stone-400 font-medium mr-1">Sizes:</span>
              {product.sizes.map((s, idx) => (
                <span 
                  key={idx} 
                  className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[9px] font-mono font-medium border border-stone-200"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-stone-950 font-sans">
              Rs. {Number(product.price).toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                Rs. {Number(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Dual Actions: Add to Bag & Direct WhatsApp */}
        <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
          
          {/* Add to Bag */}
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-900 text-stone-800 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          {/* WhatsApp Direct Order */}
          <button
            type="button"
            onClick={() => onDirectWhatsApp(product)}
            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl text-xs font-semibold transition duration-200 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

        </div>

      </div>

    </div>
  );
}
