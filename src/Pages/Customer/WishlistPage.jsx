import React, { useState, useEffect } from "react";
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter(item => item.productId !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success("Removed from favorites");
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.productId === product.productId);
    
    if (exists) {
      toast.error("Item already in cart");
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart");
    }
  };

  return (
    <div className="w-full min-h-screen bg-secondery flex flex-col items-center p-6 lg:pt-4 lg:pb-8 lg:px-8 font-sans relative overflow-x-hidden">
      {/* Background Branding */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[15rem] lg:text-[25rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12">
        FAVORITES
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-white text-xl lg:text-2xl font-black uppercase tracking-[0.3em] italic">My Wishlist</h1>
          <div className="w-12 h-1 bg-accent rounded-full mt-1.5"></div>
          <p className="text-white/20 text-[7px] font-black uppercase tracking-[0.4em] mt-3">
            Luxury Curated Favorites
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div 
                key={product.productId}
                className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden flex flex-col transition-all duration-700 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-2 shadow-2xl"
              >
                {/* Product Image Area */}
                <div className="relative h-64 overflow-hidden bg-white/5 flex items-center justify-center p-8">
                  <img 
                    src={product.images?.[0] || product.images} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
                      title="Add to Cart"
                    >
                      <FiShoppingCart size={18} />
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(product.productId)}
                      className="w-12 h-12 bg-white text-secondery rounded-full flex items-center justify-center shadow-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                      title="Remove from Wishlist"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center text-center">
                  <span className="text-[8px] text-accent font-black uppercase tracking-[0.3em] mb-2">{product.catagory || "Boutique"}</span>
                  <h3 className="text-white font-bold text-sm tracking-wide mb-3 line-clamp-1">{product.name}</h3>
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-black text-white/90 tracking-tighter italic">LKR {product.price.toLocaleString()}</p>
                    <Link 
                      to={`/overview/${product.productId}`}
                      className="mt-4 flex items-center gap-2 text-[9px] text-white/30 font-black uppercase tracking-[0.4em] hover:text-accent transition-colors group/link"
                    >
                      View Details
                      <FiArrowRight className="transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-white/[0.02] border border-dashed border-white/10 rounded-[40px] py-32 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5 text-white/10">
              <FiHeart size={40} />
            </div>
            <h2 className="text-white/40 text-2xl font-black uppercase tracking-[0.2em] mb-4">Wishlist is Empty</h2>
            <p className="text-white/20 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
              Find items you love and save them here for later.
            </p>
            <Link to="/product" className="mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase tracking-widest text-[11px] hover:bg-accent hover:border-accent transition-all">
              Browse Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
