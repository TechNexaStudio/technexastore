import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowDown, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function HeroVideo({ onSelectCategory }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const scrollToShop = (category = 'all') => {
    onSelectCategory(category);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-stone-100">
      
      {/* Background Video with AutoPlay, Muted, Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fresh Light Aesthetic Overlay (Soft Ivory & Warm Amber gradients) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-white/50 to-white/70 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-stone-900/10" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
        
        {/* Top Luxury Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-md border border-amber-200/80 mb-6 backdrop-blur-md animate-in fade-in slide-in-from-top duration-700">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-stone-800">
            TECHNEXASTORE • Autumn / Winter Edition 2026
          </span>
        </div>

        {/* Main Fashion Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-950 tracking-tight leading-[1.1] max-w-4xl font-serif">
          The Art of Fine Dressing, <br className="hidden sm:inline" />
          <span className="italic font-normal bg-gradient-to-r from-amber-800 via-stone-800 to-amber-900 bg-clip-text text-transparent">
            Crafted for Elegance.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg text-stone-700 max-w-2xl font-normal leading-relaxed">
          Explore impeccably tailored menswear, ethereal womenswear, and premium kids’ collections — all delivered with authentic Pakistani craftsmanship.
        </p>

        {/* 3 Section Quick CTAs (Mens, Womens, Kids) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToShop('Mens')}
            className="px-6 py-3.5 rounded-full bg-stone-950 text-white hover:bg-stone-800 font-semibold text-xs sm:text-sm tracking-wider uppercase transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Mens
          </button>

          <button
            onClick={() => scrollToShop('Womens')}
            className="px-6 py-3.5 rounded-full bg-white text-stone-900 border border-stone-300 hover:border-amber-600 hover:text-amber-800 font-semibold text-xs sm:text-sm tracking-wider uppercase transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Shop Womens
          </button>

          <button
            onClick={() => scrollToShop('Kids')}
            className="px-6 py-3.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Shop Kids
          </button>
        </div>

        {/* Floating Trust Pillars */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2.5 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 shadow-sm">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-semibold text-stone-800">Nationwide Fast Dispatch</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-stone-800">Cash on Delivery Available</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 shadow-sm">
            <RefreshCw className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-semibold text-stone-800">7-Day Hassle-Free Exchange</span>
          </div>
        </div>

      </div>

      {/* Video Audio Control Pill (Bottom Right) */}
      <button
        onClick={toggleSound}
        className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-white/90 hover:bg-white text-stone-800 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md border border-stone-200 backdrop-blur-md transition"
        title={isMuted ? "Unmute video sound" : "Mute video sound"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-700" />}
        <span className="text-[11px]">{isMuted ? "Unmute" : "Mute"}</span>
      </button>

      {/* Subtle Scroll Down Prompt */}
      <div 
        onClick={() => scrollToShop('all')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-stone-500 hover:text-stone-900 transition flex flex-col items-center animate-bounce hidden sm:flex"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold mb-1">Explore</span>
        <ArrowDown className="w-4 h-4" />
      </div>

    </section>
  );
}
