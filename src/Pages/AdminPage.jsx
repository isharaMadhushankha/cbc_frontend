import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FaChartBar, FaCartArrowDown, FaBoxOpen, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import AdminProductPage from "./admin/AdminProductPage";
import AdminAddNewProduct from "./admin/AdminAddNewProduct";
import AdminUpdateProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import AdminDashboard from "./admin/AdminDashboard";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Components/Loader";

const AdminPage = () => {
  const [isloading, setisloading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(()=>{
     const token = localStorage.getItem("token");
     if(token==null){ // if user is not admin redirect to home page
      toast.error("login first");
      navigate("/login");
      return;
     }
     axios.get(import.meta.env.VITE_API_URL+"/api/User/me",
      {headers:{
        Authorization:`Bearer ${token}`
      }}
     ).then((res)=>{
      if(res.data.role!="admin"){ 
        toast.error("You are not admin");
        navigate("/");
      }
      setisloading(true); // if user is admin then load the page

       
     }).catch((err)=>{
      console.log(err);
      toast.error("Session expired please login again");
      localStorage.removeItem("token");
      navigate("/login");
     })
  },[]) // if we want do something on page load

  const menuItemStyle = (path) =>
    `w-full h-[50px] flex items-center px-5 gap-4 transition
     ${
       location.pathname === path
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

        <nav className="flex flex-col mt-2 text-sm flex-grow">
          <Link to="/admin" className={menuItemStyle("/admin")}>
            <FaChartBar className="text-lg" />
            Dashboard
          </Link>

          <Link to="/admin/orders" className={menuItemStyle("/admin/orders")}>
            <FaCartArrowDown className="text-lg" />
            Orders
          </Link>

          <Link
            to="/admin/products"
            className={menuItemStyle("/admin/products")}
          >
            <FaBoxOpen className="text-lg" />
            Products
          </Link>

          <Link to="/admin/users" className={menuItemStyle("/admin/users")}>
            <FaUsers className="text-lg" />
            Users
          </Link>

          <div className="mt-auto border-t border-secondery/10 pb-4">
            <Link to="/admin/settings" className={menuItemStyle("/admin/settings")}>
              <FaCog className="text-lg" />
              Settings
            </Link>

            <button 
              onClick={() => {
                localStorage.removeItem("token");
                toast.success("Logged out successfully");
                navigate("/login");
              }}
              className="w-full h-[50px] flex items-center px-5 gap-4 transition text-red-500 hover:bg-red-50"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-[calc(100%-300px)] h-full border-l border-secondery/20">
        <div className="w-full h-full overflow-y-auto p-4">
         {
          isloading ?  <Routes>
            <Route
              path="/"
              element={<AdminDashboard />}
            />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/add-product" element={<AdminAddNewProduct />} />
            <Route path="/update-product" element={<AdminUpdateProduct />} />
          </Routes>:<Loader/>
         }
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
