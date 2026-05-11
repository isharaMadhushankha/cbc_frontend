import React, { useState, useEffect } from "react";
import { addToCart, getTotal, LoadCart } from "../../utils/Cart";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setacart] = useState(LoadCart());

  // Function to refresh cart after changes
  const refreshCart = () => {
    setacart(LoadCart());
  };

  const removeItem = (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    refreshCart();
  };

  const updateQuantity = (productId, delta) => {
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    refreshCart();
  };

  return (
    <div className="w-full min-h-screen bg-secondery flex flex-col items-center p-4 pt-2 font-sans relative overflow-x-hidden">
      {/* Background Design Elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[22rem] lg:text-[35rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12">
        CBC
      </div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-4 items-center pb-24">
        {/* Header Section */}
        <div className="w-full flex flex-col gap-0.5 items-center">
          <h1 className="text-white text-xl font-black uppercase tracking-[0.2em] italic">Your Shopping Bag</h1>
          <div className="w-16 h-1 bg-accent rounded-full"></div>
          <p className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em] mt-2">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-12 items-start justify-center">
          
          {/* CART ITEMS LIST */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            {cart.length > 0 ? cart.map((item, index) => (
              <div
                key={index}
                className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 flex gap-8 relative group transition-all duration-500 hover:bg-white/[0.06] hover:scale-[1.01] shadow-2xl"
              >
                {/* Product Image */}
                <div className="w-32 h-32 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 p-4 flex items-center justify-center shadow-inner relative group-hover:border-white/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={item.images[0]}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 relative z-10"
                    alt={item.name}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-black text-lg uppercase tracking-wider group-hover:text-accent transition-colors leading-tight">{item.name}</h3>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mt-2">REF: {item.productId}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-white/10 hover:text-red-500 transition-all transform hover:rotate-12 p-2 hover:bg-white/5 rounded-full"
                    >
                      <BiTrash size={24} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    {/* Modern Vertical Quantity Selector */}
                    <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-1 border border-white/10 shadow-lg">
                      <button 
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        <FaChevronCircleDown size={18}/>
                      </button>
                      <span className="text-base text-white font-black w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-accent hover:bg-white/5 rounded-xl transition-all"
                      >
                        <FaChevronCircleUp size={18}/>
                      </button>
                    </div>

                    {/* Pricing */}
                    <div className="text-right">
                      <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Unit Price: LKR {item.price.toLocaleString()}</p>
                      <p className="text-2xl font-black text-accent tracking-tighter italic drop-shadow-[0_0_15px_rgba(255,144,19,0.2)]">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="w-full bg-white/[0.02] border border-dashed border-white/10 rounded-[40px] py-32 flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5">
                  <BiTrash className="text-white/10" size={40} />
                </div>
                <h2 className="text-white/40 text-2xl font-black uppercase tracking-[0.2em] mb-4">Your bag is empty</h2>
                <p className="text-white/20 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
                  Looks like you haven't added any luxury items to your bag yet.
                </p>
                <Link to="/product" className="mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase tracking-widest text-[11px] hover:bg-accent hover:border-accent hover:scale-105 transition-all">
                  Explore Boutique
                </Link>
              </div>
            )}
          </div>

          {/* SUMMARY SIDEBAR */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[320px] flex flex-col gap-6 sticky top-12">
              <div className="bg-white/5 backdrop-blur-[40px] rounded-[32px] p-8 border border-white/10 shadow-2xl flex flex-col relative overflow-hidden group">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rotate-12"></div>
                
                <h2 className="text-white text-base font-black uppercase tracking-[0.2em] mb-8 relative z-10 italic">Order Summary</h2>
                
                <div className="relative z-10 space-y-5">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                    <span className="text-white/30">Subtotal</span>
                    <span className="text-white/80">LKR {getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                    <span className="text-white/30">Shipping</span>
                    <span className="text-accent">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                    <span className="text-white/30">Tax</span>
                    <span className="text-white/80">Included</span>
                  </div>
                  
                  <div className="h-[1px] bg-white/10 my-8"></div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Total Estimated</p>
                    <p className="text-3xl font-black text-accent tracking-tighter italic">
                      LKR {getTotal().toLocaleString()}
                    </p>
                  </div>

                  <Link
                    to="/checkout"
                    state={cart}
                    className="w-full h-14 bg-accent text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(255,144,19,0.3)] hover:bg-white hover:text-secondery transition-all duration-700 uppercase tracking-[0.5em] text-[11px] flex items-center justify-center mt-8 group"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
              
              <Link to="/product" className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] hover:text-accent transition-all group flex items-center justify-center gap-2">
                <span className="w-4 h-[1px] bg-white/5 group-hover:bg-accent transition-all"></span>
                Add More Items
                <span className="w-4 h-[1px] bg-white/5 group-hover:bg-accent transition-all"></span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
