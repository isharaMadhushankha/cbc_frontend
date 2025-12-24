import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

const Headers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <headers className="w-full h-[70px] bg-accent text-secondery flex px-6">
      <div className="w-full h-full flex relative justify-center items-center">
        <TiThMenu
          className="text-xl text-white hover:text-secondery lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
        <img
          src="/logo.png"
          className="h-[90%] ps-4 w-[100px] object-cover hidden lg:flex  left-0  "
        />
        <div className="w-full h-full flex relative justify-center lg:hidden  ">
          <img
            src="/logo.png"
            className="lg:h-[90%] ps-4 lg:w-[100px] object-cover  left-0  "
          />
        </div>
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-full  h-screen bg-[#00000050] z-100 flex ">
            <div className="w-[250px] bg-primary h-full">
              <div className="w-full h-[70px] bg-accent flex flex-row justify-center items-center gap-[30px] ">
                <TiThMenu
                  className="text-xl text-white hover:text-secondery "
                  onClick={() => setIsSidebarOpen(false)}
                />
                <img
                  src="/logo.png"
                  className="h-[80%] ps-4 w-[100px] object-cover "
                />
                <div>
                  <a href="/cart">
                    <FaCartArrowDown className="lg:hidden  text-xl text-white hover:text-secondery/70" />
                  </a>
                </div>
              </div>
              <div className="w-full h-full flex flex-col  gap-5 ps-6 pt-4 ">
                <a href="/"  className="hover:text-secondery/70">
                  Home
                </a>
                <a href="/product" className="hover:text-secondery/70">
                  Product
                </a>
                <a href="/about" className="hover:text-secondery/70">
                  About
                </a>
                <a href="/contact" className="hover:text-secondery/70">
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
        <div className=" hidden lg:flex justify-center items-center w-full gap-[20px] text-white font-semibold ">
          <Link to="/" className="hover:text-secondery/70">
            Home
          </Link>
          <Link to="/product" className="hover:text-secondery/70">
            Product
          </Link>
          <Link to="/about" className="hover:text-secondery/70">
            About
          </Link>
          <Link to="/contact" className="hover:text-secondery/70">
            Contact
          </Link>
        </div>
      </div>
      <Link to="/cart" className="flex justify-center items-center pe-7">
        <FaCartArrowDown className="lg:text-2xl hidden lg:flex text-white hover:text-secondery/70" />
      </Link>
    </headers>
  );
};

export default Headers;
