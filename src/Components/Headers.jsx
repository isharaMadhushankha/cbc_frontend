import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown, FaChevronDown } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FiSmile, FiPackage, FiHeart, FiStar, FiXCircle, FiLogOut } from "react-icons/fi";
import axios from "axios";

const Headers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const updateHeaderData = () => {
    // Sync User
    const userData = localStorage.getItem("user") || localStorage.getItem("userInfo");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser({ name: userData }); // Fallback if it's just a string
      }
    } else {
      setUser(null);
    }

    // Sync Cart Count
    const cartData = localStorage.getItem("cart") || localStorage.getItem("cartItems");
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        setCartCount(Array.isArray(parsedCart) ? parsedCart.length : 0);
      } catch (e) {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateHeaderData();

    // Listen for storage changes in other tabs/windows
    window.addEventListener("storage", updateHeaderData);
    
    // Custom event listener for same-tab updates (useful if your login/cart logic dispatches it)
    window.addEventListener("cartUpdated", updateHeaderData);
    window.addEventListener("userUpdated", updateHeaderData);

    return () => {
      window.removeEventListener("storage", updateHeaderData);
      window.removeEventListener("cartUpdated", updateHeaderData);
      window.removeEventListener("userUpdated", updateHeaderData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Secondary Nav - Daraz Style */}
      <div className="w-full h-8 bg-accent/90 text-[10px] lg:text-[11px] text-white flex justify-end items-center px-10 gap-6 font-medium tracking-wide border-b border-white/10">
        <Link to="#" className="hover:text-secondery transition uppercase">Save more on app</Link>
        <Link to="#" className="hover:text-secondery transition uppercase">Become a seller</Link>
        <Link to="#" className="hover:text-secondery transition uppercase">Help & Support</Link>
        
        {user || localStorage.getItem("token") ? (
          <div className="relative group">
            <button 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 hover:text-secondery transition uppercase font-bold cursor-pointer"
            >
              {user?.username?.toUpperCase() || 
               user?.firstName?.toUpperCase() || 
               user?.name?.toUpperCase() || 
               "MY ACCOUNT"}
              <FaChevronDown className={`text-[10px] transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            <div className={`absolute top-full right-0 mt-1 w-[220px] bg-white text-gray-700 shadow-xl rounded-b-md z-[150] flex flex-col py-2 border border-gray-100 transition-all origin-top ${isUserDropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
              <Link to="/profile" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[12px] font-medium transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiSmile className="text-gray-400 text-base" />
                Manage My Account
              </Link>
              <Link to="/orders" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[12px] font-medium transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiPackage className="text-gray-400 text-base" />
                My Orders
              </Link>
              <Link to="/wishlist" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[12px] font-medium transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiHeart className="text-gray-400 text-base" />
                My Wishlist & Followed Stores
              </Link>
              <Link to="/reviews" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[12px] font-medium transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiStar className="text-gray-400 text-base" />
                My Reviews
              </Link>
              <Link to="/returns" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[12px] font-medium transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiXCircle className="text-gray-400 text-base" />
                My Returns & Cancellations
              </Link>
              <div className="h-[1px] bg-gray-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[12px] font-medium text-red-500 transition text-left"
              >
                <FiLogOut className="text-base" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="hover:text-secondery transition uppercase font-bold">
            Login / Register
          </Link>
        )}
      </div>

      {/* Main Navigation */}
      <header className="w-full h-[70px] bg-accent text-secondery flex px-6 shadow-md">
        <div className="w-full h-full flex relative justify-center items-center">
          <TiThMenu
            className="text-xl text-white hover:text-secondery lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          />
          <img
            src="/logo.png"
            className="h-[90%] ps-4 w-[100px] object-cover hidden lg:flex absolute left-0"
          />
          <div className="w-full h-full flex relative justify-center lg:hidden">
            <img
              src="/logo.png"
              className="lg:h-[90%] ps-4 lg:w-[100px] object-cover"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex justify-center items-center w-full gap-[40px] text-white font-semibold text-lg">
            <Link to="/" className="hover:text-secondery transition-all relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/product" className="hover:text-secondery transition-all relative group">
              Product
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="hover:text-secondery transition-all relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="hover:text-secondery transition-all relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="absolute right-0 flex justify-center items-center px-4 group">
            <div className="relative p-2 rounded-full hover:bg-white/10 transition">
              <FaCartArrowDown className="text-2xl text-white group-hover:text-secondery transition" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-secondery text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-[100] flex backdrop-blur-sm">
            <div className="w-[280px] bg-primary h-full shadow-2xl">
              <div className="w-full h-[70px] bg-accent flex flex-row justify-between items-center px-6">
                <TiThMenu
                  className="text-xl text-white"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <img
                  src="/logo.png"
                  className="h-[80%] w-[80px] object-cover"
                />
                <FaCartArrowDown className="text-xl text-white" />
              </div>
              <div className="w-full flex flex-col gap-6 p-8 font-bold text-lg text-secondery">
                <Link to="/" onClick={() => setIsSidebarOpen(false)}>Home</Link>
                <Link to="/product" onClick={() => setIsSidebarOpen(false)}>Product</Link>
                <Link to="/about" onClick={() => setIsSidebarOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>Contact</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Headers;
