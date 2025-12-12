import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FaChartBar } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import AdminProductPage from "./admin/AdminProductPage";
const AdminPage = () => {
  return (
    <div className=" h-full w-full flex ">
      <div className="w-[300px] h-full  flex flex-col bg-primary">
        <div className="flex flex-row w-full h-[70px]  bg-accent  items-center"> 
          <img src="/logo.png" className="h-[65px]"/>
          <span className="text-black text-xl  ml-4">Admin panel</span>
        </div>
        <Link to="/admin"  className="w-full h-[50px] bg-yellow-50 flex flex-row p-4 mt-1 gap-4">
          <FaChartBar className="text-xl "/>
          Dashbord
        </Link>
        <Link to="/admin/order"  className="w-full h-[50px] bg-yellow-50 flex flex-row p-4 gap-4">
          <FaCartArrowDown className="text-xl " />
          Orders
        </Link>
        <Link to="/admin/products"  className="w-full h-[50px] bg-yellow-50 flex flex-row p-4 gap-4">
          <FaBoxOpen  className="text-xl " />
          Products
        </Link>
         <Link to="/admin/users"  className="w-full h-[50px] bg-yellow-50 flex flex-row p-4 gap-4">
          <FaUsers   className="text-xl " />
          Users
        </Link>


      </div>
      <div className="w-[calc(100%-300px)] h-full bg-primary border-accent border-1 overflow-hidden">
           <div className=" w-full h-full max-w-full max-h-full overflow-y-scroll">
             <Routes path="/">
                 <Route path="/" element={<h1>Dashbord</h1>}/>
                 <Route path="/products" element={<AdminProductPage/>}/>
                 <Route path="/orders" element={<h1>orders</h1>}/>
            </Routes>
           </div>
      </div>
    </div>
  );
};

export default AdminPage;
