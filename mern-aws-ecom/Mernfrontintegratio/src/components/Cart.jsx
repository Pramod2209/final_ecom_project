import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const [quantityMap, setQuantityMap] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
  );
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantityMap(prev => ({ ...prev, [id]: newQuantity }));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = quantityMap[item._id] || 1;
      return total + (item.price * quantity);
    }, 0);
  };

  const calculateItemTotal = (item) => {
    const quantity = quantityMap[item._id] || 1;
    return item.price * quantity;
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  const discount = promoApplied ? calculateTotal() * 0.1 : 0;
  const subtotal = calculateTotal();
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-10 text-lg max-w-md mx-auto">
              Looks like you haven't added anything yet. Discover amazing products and start shopping!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">
            <span className="text-orange-600 font-semibold">{cart.length}</span> item{cart.length !== 1 ? 's' : ''} ready for checkout
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div 
                key={item._id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                        {quantityMap[item._id] || 1}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {item.description || "Premium quality product with fast delivery"}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              In Stock
                            </span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                              Free Delivery
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">
                            ₹{calculateItemTotal(item)}
                          </div>
                          <div className="text-sm text-gray-400 line-through">
                            ₹{Math.floor(calculateItemTotal(item) * 1.3)}
                          </div>
                          <div className="text-xs text-green-600 font-semibold">
                            Save ₹{Math.floor(calculateItemTotal(item) * 0.3)}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 font-medium">Qty:</span>
                          <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item._id, (quantityMap[item._id] || 1) - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">
                              {quantityMap[item._id] || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, (quantityMap[item._id] || 1) + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Save for later"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={promoApplied}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100"
                  />
                  <button 
                    onClick={applyPromo}
                    disabled={promoApplied || !promoCode}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
                  >
                    {promoApplied ? "Applied!" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Promo code applied! 10% off
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">Try "SAVE10" for 10% off</p>
              </div>

              {/* Summary Details */}
              <div className="space-y-4 py-6 border-y border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount (10%)</span>
                    <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="py-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-orange-600">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Including ₹{tax.toFixed(2)} in taxes</p>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mb-4"
              >
                <span className="flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>

              {/* Payment Methods */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500 mb-4">Secure Payment Methods</p>
                <div className="flex justify-center gap-3">
                  <div className="w-14 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="w-14 h-9 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">MC</span>
                  </div>
                  <div className="w-14 h-9 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">UPI</span>
                  </div>
                  <div className="w-14 h-9 bg-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}