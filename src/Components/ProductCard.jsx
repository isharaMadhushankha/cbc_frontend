import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingBag } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";

const ProductCard = (props) => {
  const product = props.product;

  const addToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find(item => item.productId === product.productId);
    
    if (exists) {
      toast.error("Item already in wishlist");
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="group bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-transparent hover:border-primary/50 relative overflow-hidden flex flex-col h-full">
      {/* Wishlist Button */}
      <button 
        onClick={addToWishlist}
        className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-secondery hover:text-accent hover:bg-white transition-all shadow-lg active:scale-90"
        title="Save to Wishlist"
      >
        <FiHeart size={18} />
      </button>

      {/* Discount Badge */}
      {product.labeledPrice > product.price && (
        <div className="absolute top-6 left-6 z-10 bg-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg transform -rotate-12">
          {Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-primary/20 mb-6">
        <img 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          src={product.images[0]} 
          alt={product.name}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-secondery/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <Link 
            to={"/overview/" + product.productId}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondery hover:bg-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl"
            title="Quick View"
          >
            <FaEye size={20} />
          </Link>
          <button 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondery hover:bg-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75 shadow-xl"
            title="Add to Cart"
          >
            <FaShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{product.catagory}</span>
          <span className="text-[10px] font-medium text-secondery/40">#{product.productId}</span>
        </div>
        
        <h3 className="text-xl font-bold text-secondery mb-3 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-auto pt-4 flex items-end justify-between">
          <div className="flex flex-col">
            {product.labeledPrice > product.price && (
              <span className="text-xs text-secondery/30 line-through font-medium">
                LKR {product.labeledPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-black text-secondery">
              <span className="text-sm font-bold mr-1">LKR</span>
              {product.price.toLocaleString()}
            </span>
          </div>
          
          <Link 
            to={"/overview/" + product.productId}
            className="bg-secondery text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-accent/30"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
