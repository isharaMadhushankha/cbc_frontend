import React from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

const Headers = () => {
  return (
    <headers className="w-full h-[70px] bg-accent text-secondery flex px-6">
      <div className="w-full h-full flex relative">
        <img
          src="/logo.png"
          className="h-[90%] ps-4 w-[100px] object-cover  left-0"
        />
        <div className=" flex justify-center items-center w-full gap-[20px] text-white font-semibold ">
          <Link to="/" className="hover:text-secondery/70">Home</Link>
          <Link to="/product"  className="hover:text-secondery/70">Product</Link>
          <Link to="/about" className="hover:text-secondery/70">About</Link>
          <Link to="/contact" className="hover:text-secondery/70">Contact</Link>
        </div>
      </div>
      <Link to="/cart" className="flex justify-center items-center pe-7">
        <FaCartArrowDown className="text-2xl text-white hover:text-secondery/70" />
      </Link>
    </headers>
  );
};

export default Headers;
