import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { FaChartBar, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import AdminProductPage from "./admin/AdminProductPage";
import AdminAddNewProduct from "./admin/AdminAddNewProduct";
import AdminUpdateProduct from "./admin/adminUpdateProduct";
import AdminOtdersPage from "./admin/AdminOrdersPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";

const AdminPage = () => {
  const location = useLocation();

  const menuItemStyle = (path) =>
    `w-full h-[50px] flex items-center px-5 gap-4 transition
     ${location.pathname === path
        ? "bg-accent/20 hover:text-secondery font-semibold border-l-4 border-accent"
        : "text-secondery hover:bg-accent/10 "
     }`;

  return (
    <div className="h-full w-full flex bg-primary">

      {/* Sidebar */}
      <div className="w-[300px] h-full flex flex-col shadow-lg">

        {/* Logo */}
        <div className="flex items-center h-[70px] px-4 bg-accent">
          <img src="/logo.png" className="h-[50px]" />
          <span className="text-black text-xl font-semibold ml-3">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-2 text-sm">
          <Link to="/admin" className={menuItemStyle("/admin")}>
            <FaChartBar className="text-lg" />
            Dashboard
          </Link>

          <Link to="/admin/orders" className={menuItemStyle("/admin/orders")}>
            <FaCartArrowDown className="text-lg" />
            Orders
          </Link>

          <Link to="/admin/products" className={menuItemStyle("/admin/products")}>
            <FaBoxOpen className="text-lg" />
            Products
          </Link>

          <Link to="/admin/users" className={menuItemStyle("/admin/users")}>
            <FaUsers className="text-lg" />
            Users
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-[calc(100%-300px)] h-full border-l border-secondery/20">
        <div className="w-full h-full overflow-y-auto p-6">

          <Routes>
            <Route path="/" element={<h1 className="text-2xl font-semibold text-secondery">Dashboard</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage/>} />
            <Route path="/add-product" element={<AdminAddNewProduct/>}/>
            <Route path="/update-product" element={<AdminUpdateProduct/>}/>
           
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;
