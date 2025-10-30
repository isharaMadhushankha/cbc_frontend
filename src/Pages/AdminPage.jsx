import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="bg-amber-300 h-full w-full flex ">
      <div className="w-[300px] h-full bg-accent">

      </div>
      <div className="w-[calc(100%-300px)] h-full bg-primary border-accent border-2">
            <Routes path="/">
                 <Route path="/" element={<h1>Dashbord</h1>}/>
                 <Route path="/product" element={<h1>product</h1>}/>
                 <Route path="/orders" element={<h1>orders</h1>}/>
            </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
