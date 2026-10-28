import React from 'react';
import { Truck, MessageCircle, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>FREE Nationwide Delivery Across Pakistan on Orders Over Rs. 3,000</span>
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] text-stone-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cash on Delivery (COD)</span>
          </div>
          <span className="text-stone-600">|</span>
          <a 
            href="https://wa.me/923287205940?text=Hi%20TECHNEXASTORE,%20I%20have%20an%20inquiry%20about%20your%20collection." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: 03287205940</span>
          </a>
        </div>
      </div>
    </div>
  );
}
