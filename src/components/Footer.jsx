import React from 'react';
import { MessageCircle, Phone, MapPin, Mail, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenAdmin }) {
  return (
    <footer className="bg-white border-t border-stone-200 mt-24">
      {/* Upper Promise Bar */}
      <div className="border-b border-stone-200 bg-stone-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">Nationwide Shipping</h4>
                <p className="text-[11px] text-stone-500">Delivered directly to your doorstep across Pakistan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">Cash on Delivery</h4>
                <p className="text-[11px] text-stone-500">Inspect parcel and pay cash at the time of delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-stone-200 text-stone-800 rounded-2xl shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">7 Days Size Exchange</h4>
                <p className="text-[11px] text-stone-500">Hassle-free size and article replacement</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">WhatsApp Support</h4>
                <p className="text-[11px] text-stone-500">Instant customer assistance at 03287205940</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="font-extrabold text-2xl tracking-[0.2em] text-stone-900">
              TECHNEXA<span className="text-amber-700">STORE</span>
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              Curating high-grade apparel, modern silhouettes, and festive collections designed for timeless sophistication and everyday ease.
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.me/923287205940"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline: 03287205940</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900 mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <button onClick={() => onSelectCategory('Mens')} className="hover:text-amber-800 transition">
                  Menswear & Sartorial Suiting
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Womens')} className="hover:text-amber-800 transition">
                  Womens Maxi & Daily Wear
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Kids')} className="hover:text-amber-800 transition">
                  Kids Tracksuits & Party Frocks
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-amber-800 transition">
                  Complete Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li><span>Cash on Delivery (COD) Nationwide</span></li>
              <li><span>Order Tracking via WhatsApp</span></li>
              <li><span>Size & Measurement Guide</span></li>
              <li><span>Exchange & Refund Policy</span></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900 mb-4">
              Contact Store
            </h4>
            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold text-stone-800">03287205940</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available Mon-Sat: 10:00 AM - 10:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Discreet Admin Link */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} <strong>TECHNEXASTORE</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            {/* Quick footer admin link as backup */}
            <button 
              onClick={onOpenAdmin} 
              className="text-stone-400 hover:text-stone-600 transition"
              title="Admin Portal"
            >
              Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
