import React from 'react';
import { Clock, MapPin, Phone, MessageCircle, Calendar, Sparkles, Navigation } from 'lucide-react';

export default function StoreTimingsSection() {
  const timings = [
    { days: "Monday – Thursday", hours: "11:00 AM – 10:30 PM", status: "Open" },
    { days: "Friday", hours: "02:30 PM – 11:00 PM", status: "Jummah Break (1:00 - 2:30 PM)" },
    { days: "Saturday & Sunday", hours: "12:00 PM – 11:30 PM", status: "Weekend Rush" },
    { days: "Online WhatsApp Store", hours: "24 Hours / 7 Days", status: "Always Active" },
  ];

  return (
    <section id="timings-section" className="my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Highlighted Store & Timings Box */}
      <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Big Store Visual with Touch Zoom */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[520px] bg-stone-100 overflow-hidden group">
            <img
              src="/products/01_mens_blue_shirt.jpg"
              alt="TECHNEXASTORE Showroom Display"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            
            {/* Showroom Badge */}
            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-900 shadow-sm flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Flagship Showroom & Studio</span>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">
                In-Store Trials & In-Person Fitting
              </span>
              <h3 className="text-2xl font-bold font-serif">
                Experience Fabric Quality First-Hand
              </h3>
              <p className="text-xs text-stone-300">
                Touch our pure Egyptian cotton, premium abaya crepe, and linen suits. Alteration master available on-site.
              </p>
            </div>
          </div>

          {/* Right Column: Store Timings & Visiting Guide */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#fafaf9]">
            
            <div>
              {/* Header */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Store Schedule & Operating Hours</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-serif">
                Store Timings & Customer Care
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                We warmly welcome you to visit our boutique showroom or place your order conveniently online with Cash on Delivery across Pakistan.
              </p>

              {/* Timings Schedule Table / Cards */}
              <div className="mt-6 space-y-3">
                {timings.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-sm gap-1 hover:border-amber-300 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-amber-600" />
                      <span className="font-bold text-xs text-stone-900">{t.days}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-right">
                      <span className="font-semibold text-stone-800 font-mono">{t.hours}</span>
                      <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Location Card */}
              <div className="mt-6 p-4 rounded-2xl bg-white border border-stone-200 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-stone-900">Showroom Address:</h5>
                  <p className="text-stone-600 mt-0.5">
                    Main Boulevard, Gulberg III / MM Alam Road, Lahore, Punjab, Pakistan.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-200 mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/923287205940?text=Assalam%20o%20Alaikum%20TECHNEXASTORE,%20please%20share%20your%20exact%20store%20location%20pin."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl text-xs transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Location Pin on WhatsApp</span>
              </a>

              <a
                href="tel:03287205940"
                className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-4 py-3 rounded-2xl text-xs transition"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>Call Store: 03287205940</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
