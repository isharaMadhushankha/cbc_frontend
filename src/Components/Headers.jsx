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
      <div className="w-full h-8 bg-accent/90 text-[10px] text-white flex justify-end items-center px-10 gap-8 font-bold tracking-wide border-b border-white/10 uppercase">
        <Link to="#" className="hover:text-secondery transition-all">Save more on app</Link>
        <Link to="/become-seller" className="hover:text-secondery transition-all">Become a seller</Link>
        <Link to="/help-support" className="hover:text-secondery transition-all">Help & Support</Link>
        
        {user || localStorage.getItem("token") ? (
          <div className="relative group">
            <button 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 hover:text-secondery transition-all cursor-pointer font-bold"
            >
              {user?.username?.toUpperCase() || 
               user?.firstName?.toUpperCase() || 
               user?.name?.toUpperCase() || 
               "MY ACCOUNT"}
              <FaChevronDown className={`text-[9px] transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            <div className={`absolute top-full right-0 mt-1 w-[220px] bg-white text-gray-700 shadow-2xl rounded-b-xl z-[150] flex flex-col py-3 border border-gray-100 transition-all origin-top ${isUserDropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
              <Link to="/profile" className="px-5 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiSmile className="text-accent text-sm" />
                Manage Account
              </Link>
              <Link to="/orders" className="px-5 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiPackage className="text-accent text-sm" />
                My Orders
              </Link>
              <Link to="/wishlist" className="px-5 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide transition" onClick={() => setIsUserDropdownOpen(false)}>
                <FiHeart className="text-accent text-sm" />
                My Wishlist
              </Link>
              <div className="h-[1px] bg-gray-100 my-2 mx-4"></div>
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide text-red-500 transition text-left"
              >
                <FiLogOut className="text-sm" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="hover:text-secondery transition-all font-bold">
            Login / Register
          </Link>
        )}
      </div>

      {/* Main Navigation */}
      <header className="w-full h-[70px] bg-accent text-secondery flex px-10 shadow-lg border-b border-white/5">
        <div className="w-full h-full flex relative justify-between items-center">
          <TiThMenu
            className="text-2xl text-white hover:text-secondery lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          />
          
          <Link to="/" className="h-full flex items-center">
            <img
              src="/logo.png"
              className="h-[50px] w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex justify-center items-center gap-12 text-white font-bold text-[15px] uppercase tracking-wide">
            <Link to="/" className="hover:text-secondery transition-all relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/product" className="hover:text-secondery transition-all relative group py-2">
              Product
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="hover:text-secondery transition-all relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="hover:text-secondery transition-all relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondery transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="flex justify-center items-center group">
            <div className="relative p-2.5 rounded-2xl bg-white/5 hover:bg-white/20 transition-all border border-white/10 group-hover:border-white/20 shadow-xl">
              <FaCartArrowDown className="text-2xl text-white group-hover:text-secondery transition-all" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondery text-white text-[10px] rounded-lg flex items-center justify-center font-bold shadow-lg border border-white/20">
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
