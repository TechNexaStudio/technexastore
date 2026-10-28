import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  onRecordOrder 
}) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);
  const shippingFee = subtotal >= 3000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + shippingFee;

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in your Name, Phone and Delivery Address!");
      return;
    }

    // Format item list for WhatsApp message
    const itemsListText = items.map((item, idx) => {
      const sizeStr = item.selectedSize ? ` (${item.selectedSize})` : '';
      const colorStr = item.selectedColor ? ` [${item.selectedColor}]` : '';
      return `${idx + 1}. *${item.title}*${sizeStr}${colorStr}\n   Qty: ${item.quantity || 1} x Rs. ${Number(item.price).toLocaleString()} = Rs. ${(Number(item.price) * (item.quantity || 1)).toLocaleString()}`;
    }).join('\n\n');

    const whatsappMessage = 
`🛍️ *NEW ORDER FROM TECHNEXASTORE WEBSITE*
━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${customerName}
📞 *Phone:* ${customerPhone}
📍 *Address:* ${customerAddress}, ${customerCity}
${orderNotes ? `📝 *Note:* ${orderNotes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
📦 *ORDER ITEMS:*
${itemsListText}

━━━━━━━━━━━━━━━━━━━━
Subtotal: Rs. ${subtotal.toLocaleString()}
Shipping: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
💰 *TOTAL PAYABLE:* Rs. ${grandTotal.toLocaleString()}
🚚 *Payment Method:* Cash on Delivery (COD)
━━━━━━━━━━━━━━━━━━━━
Please confirm my order dispatch. Thank you!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/923287205940?text=${encodedMessage}`;

    // Record order in parent state / Supabase
    if (onRecordOrder) {
      onRecordOrder({
        customerName,
        customerPhone,
        customerAddress,
        customerCity,
        items,
        totalAmount: grandTotal,
        paymentMethod: 'Cash on Delivery',
        notes: orderNotes
      });
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Ignore if confetti fails
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setShowCheckoutModal(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h3 className="font-bold text-base text-stone-900">Your Shopping Bag</h3>
            <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-amber-50/70 border-b border-amber-200/60 px-5 py-2.5 text-xs text-amber-900">
          {subtotal >= 3000 ? (
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>You've unlocked FREE Nationwide Delivery! 🎉</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>Add Rs. {(3000 - subtotal).toLocaleString()} more for FREE Delivery!</span>
              <span className="font-bold text-[11px]">Free @ Rs. 3,000</span>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1">
                Explore our curated collection of mens, womens, and kids apparel to find your style.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div 
                key={`${item.id}-${item.selectedSize}-${index}`}
                className="flex gap-4 p-3 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-xl border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-stone-400 hover:text-rose-600 transition p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      {item.selectedSize && (
                        <span className="bg-white px-2 py-0.5 rounded border border-stone-200 font-semibold">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span>{item.selectedColor}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQty(index, Math.max(1, (item.quantity || 1) - 1))}
                        className="px-2.5 py-0.5 text-xs text-stone-600 hover:text-stone-900 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800 min-w-6 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => onUpdateQty(index, (item.quantity || 1) + 1)}
                        className="px-2.5 py-0.5 text-xs text-stone-600 hover:text-stone-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-stone-950 font-sans">
                      Rs. {(Number(item.price) * (item.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Nationwide Shipping</span>
                <span>{shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `Rs. ${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Amount (COD)</span>
                <span className="text-base text-amber-800">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCheckoutModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-2xl font-bold text-sm transition shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Checkout via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cash on Delivery • Direct WhatsApp Confirmation</span>
            </div>
          </div>
        )}

      </div>

      {/* WhatsApp Checkout Information Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div 
            onClick={() => setShowCheckoutModal(false)}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-stone-900">Order Delivery Details</h3>
                <p className="text-xs text-stone-500">Order will be dispatched via Cash on Delivery</p>
              </div>
            </div>

            <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  WhatsApp / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0300 1234567"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="e.g. Lahore / Karachi"
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Cash on Delivery (COD)"
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-600 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House/Apartment #, Street, Sector / Area"
                  className="w-full text-xs sm:text-sm px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Deliver after 4pm"
                  className="w-full text-xs px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                <span className="text-stone-600">Total Payable upon delivery:</span>
                <span className="text-base font-extrabold text-amber-900 font-sans">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition shadow-lg shadow-emerald-600/30 text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Order via WhatsApp (03287205940)</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
