import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart, Truck, CheckCircle2, MessageCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="my-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Big Highlighted About Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-[#faf8f5] to-[#f5efe6] border border-amber-200/80 shadow-xl p-8 sm:p-12 lg:p-16">
        
        {/* Decorative Watermark / Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>The TECHNEXASTORE Story</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 font-serif tracking-tight leading-tight">
            Crafting Timeless Elegance & <br className="hidden sm:inline" />
            <span className="italic font-normal text-amber-800">
              Uncompromising Fabric Quality
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl mx-auto">
            Welcome to <strong>TECHNEXASTORE</strong> — your premier destination for contemporary clothing, sartorial menswear, grace-infused womenswear, and energetic kids apparel. Born in the heart of Pakistan's rich textile heritage, we believe that true luxury lies in breathable comfort, precision cuts, and honest pricing.
          </p>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            From formal shirts and European blazers to hand-stitched crepe abayas and cozy fleece tracksuits, every piece in our catalogue undergoes rigorous 3-stage quality inspection before reaching your wardrobe.
          </p>

          {/* 4 Feature Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 text-left">
            
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">100% Pure Fabrics</h4>
              <p className="text-xs text-stone-500 mt-1 leading-normal">
                Combed long-staple cotton, genuine European linen, and skin-safe color dyes.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Cash on Delivery</h4>
              <p className="text-xs text-stone-500 mt-1 leading-normal">
                Open parcel inspection assurance with COD available in 200+ cities nationwide.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">48-Hour Dispatch</h4>
              <p className="text-xs text-stone-500 mt-1 leading-normal">
                Swift order processing with live parcel tracking shared right on WhatsApp.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">7-Day Size Exchange</h4>
              <p className="text-xs text-stone-500 mt-1 leading-normal">
                Fitting not quite right? Our courier will swap your size directly at your doorstep.
              </p>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-stone-950 font-serif">15,000+</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Parcels Delivered</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-stone-950 font-serif">100%</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Genuine Materials</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-stone-950 font-serif">4.9 / 5.0</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Customer Reviews</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-800 font-serif">24/7</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">WhatsApp Care</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a
              href="https://wa.me/923287205940?text=Assalam%20o%20Alaikum%20TECHNEXASTORE,%20I%20would%20like%20to%20know%20more%20about%20your%20brand%20and%20tailoring."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-950 hover:bg-stone-800 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Connect with Founder / Support (03287205940)</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
