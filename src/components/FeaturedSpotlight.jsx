import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function FeaturedSpotlight({ onSelectCategory, onDirectWhatsApp }) {
  const featuredItem = {
    title: "European Tailored Linen Blazer",
    category: "Mens",
    price: 8990,
    originalPrice: 11490,
    image: "/products/05_beige_blazer.jpg"
  };

  return (
    <div className="col-span-full my-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white shadow-2xl border border-amber-900/40">
        
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          
          {/* Left Text & Offers */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mid-Season Luxury Spotlight</span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-[1.15]">
              Master Sartorial Linen <br />
              <span className="italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                The Heritage Cut 2026
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Tailored from imported European linen-cotton blend with breathable lining and custom horn-style buttons. Engineered for summer galas, formal meetings, and evening occasions.
            </p>

            {/* Special Highlights Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold block">Fabric</span>
                <span className="text-xs font-bold text-white">100% Breathable Linen</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold block">Craft</span>
                <span className="text-xs font-bold text-white">Hand-Stitched Lapels</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold block">Delivery</span>
                <span className="text-xs font-bold text-emerald-400">FREE Nationwide</span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="bg-stone-800/90 px-4 py-2 rounded-2xl border border-stone-700">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Special Offer Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-amber-400">Rs. 8,990</span>
                  <span className="text-xs text-stone-400 line-through">Rs. 11,490</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDirectWhatsApp(featuredItem)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm tracking-wider uppercase transition shadow-lg shadow-emerald-700/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectCategory('Mens');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-stone-950 font-semibold px-5 py-3.5 rounded-2xl text-xs tracking-wider uppercase transition border border-white/20"
              >
                <span>View Menswear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Large Image with Zoom & Floating Pill */}
          <div className="lg:col-span-5 relative group cursor-pointer overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-amber-500/30 shadow-2xl">
              <img
                src="/products/05_beige_blazer.jpg"
                alt="European Linen Blazer Spotlight"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
              
              {/* Floating Sale Tag */}
              <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>FLAT 22% OFF</span>
              </div>

              {/* Bottom pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md p-3 rounded-xl border border-stone-700 text-center">
                <span className="text-[11px] text-stone-300 font-medium">Touch / Hover picture to inspect fabric texture</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
