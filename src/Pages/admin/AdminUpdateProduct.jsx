import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/MediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

const AdminUpdateProduct = () => {
  const location = useLocation(); // use to check data come with adminproduct page when click edit button
  console.log(location);

  const [productId, setproductId] = useState(location.state.productId);
  const [name, setname] = useState(location.state.name);
  const [altName, setaltName] = useState(location.state.altName.join(","));
  const [discription, setdiscription] = useState(location.state.discription);
  const [images, setimages] = useState([]);
  const [price, setprice] = useState(location.state.price);
  const [labeledPrice, setlabeledPrice] = useState(location.state.labeledPrice);
  const [catagory, setcatagory] = useState(location.state.catagory);
  const [stock, setStock] = useState(location.state.setStock);
  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }
    const promises = []
    for (let i =0;i<images.length;i++){
      promises[i] = MediaUpload(images[i])
    }
    try{
       let ulrl = await Promise.all(promises);// if change add that images url
       if(ulrl.length==0){
        ulrl = location.state.images // if not change use old url
       }
       const alternateName = altName.split(",");
       
       const product = {
        productId : productId,
        name:name,
        altName:alternateName,
        discription:discription,
        images:ulrl,
        price:price,
        labeledPrice:labeledPrice,
        catagory:catagory,
        stock:stock
      
       }

       axios.put(import.meta.env.VITE_API_URL+"/api/product/"+productId,product,{ //1.url ,  2.what data will send   3.token
       headers:{
          Authorization : "Bearer "+ token
       }
       })
       toast.success("product updated successfully");
       navigate("/admin/products");

    // console.log(ulrl);
    }catch{
      toast.error("An error occorred")
    }
  }


  return (
    <div className="w-full h-full flex justify-center items-start p-8 bg-primary">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-secondery text-center">
          Update Product
        </h2>

        {/* Product ID */}
        <div>
          <label className="text-sm font-medium text-secondery">
            Product ID
          </label>
          <input
            disabled
            placeholder="Enter product ID (e.g. PRD001)"
            value={productId}
            onChange={(e) => {
              setproductId(e.target.value);
            }}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="text-sm font-medium text-secondery">
            Product Name
          </label>
          <input
            placeholder="Enter product name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Alternate Name */}
        <div>
          <label className="text-sm font-medium text-secondery">
            Alternate Name
          </label>
          <input
            placeholder="Optional alternate name"
            value={altName}
            onChange={(e) => {
              setaltName(e.target.value);
            }}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-secondery">
            Description
          </label>
          <textarea
            placeholder="Write a short product description..."
            value={discription}
            onChange={(e) => setdiscription(e.target.value)}
            rows={3}
            className="w-full mt-1 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Images */}
        <div>
          <label className="text-sm font-medium text-secondery mb-1 block">
            Images
          </label>

          <input
            type="file"
            multiple
            onChange={(e) => {
              setimages(e.target.files);
            }}
            className="
      w-full
      file:mr-4
      file:py-2
      file:px-4
      file:rounded-md
      file:border-0
      file:bg-accent/30
      file:text-black
      file:font-medium
      hover:file:bg-accent/40
      cursor-pointer
      border
      rounded-lg
      bg-white
      text-sm
      text-secondery
      focus:outline-none
      focus:ring-2
      focus:ring-accent
    "
          />

          <p className="text-xs text-secondery/60 mt-1">
            PNG/JPG recommended. Multiple files supported.
          </p>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-secondery">Price</label>
            <input
              type="number"
              placeholder="Enter selling price"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-secondery">
              Labeled Price
            </label>
            <input
              type="number"
              placeholder="Original price (MRP)"
              value={labeledPrice}
              onChange={(e) => {
                setlabeledPrice(e.target.value);
              }}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-secondery">Category</label>
          <select
            value={catagory}
            onChange={(e) => {
              setcatagory(e.target.value);
            }}
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-accent"
          >
            <option value="cream">Cream</option>
            <option value="lotion">Lotion</option>
            <option value="serum">Serum</option>
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm font-medium text-secondery">Stock</label>
          <input
            type="number"
            placeholder="Available quantity"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
            }}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-secondery/20">
          <button
            type="button"
            onClick={() => {
              navigate("/admin/products");
            }}
            className="px-5 py-2 rounded-lg border border-secondery/40 text-black bg-red-400/80 hover:bg-red-400 hover:border-red-500 hover:border-[2px] transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={updateProduct}
            className="px-6 py-2 rounded-lg bg-accent/80 text-black  hover:bg-accent/80  hover:border-accent hover:border-[2px] shadow-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
