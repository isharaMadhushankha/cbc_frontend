import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import toast from "react-hot-toast";

function Productdeletefunction(props) {
  const productId = props.productId;
  const close = props.close;
  const refresh = props.refresh;

  function productdelete() {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/Product/" + productId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("Product delete successfully");
        refresh();
      }).catch(()=>{
        toast.error("Failed to delete product");
      })
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-full bg-[#00000050] z-100 flex items-center justify-center">
      <div className="w-[500px] h-[200px] gap-3 bg-primary flex flex-col justify-center items-center relative">
        <button
          onClick={close}
          className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-500 rounded-full text-white hover:bg-red-500"
        >
          X
        </button>
        <p>
          Are you sure want to delete the product with product ID:{productId} ?
        </p>
        <div className="flex gap-4">
          <button
            onClick={close}
            className="w-[70px] h-[30px] rounded bg-red-400 hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            onClick={productdelete}
            className="w-[70px] h-[30px] rounded bg-green-400 hover:bg-green-500"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminProductPage = () => {
  const [product, setProduct] = useState([]);
  const [isDeleteConfirmeVisible, setisDeleteConfirmeVisible] = useState(false);
  const [productTodelete, setproductTodelete] = useState(null);
  const [isloading, setisloading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if(isloading){
       axios
      .get(import.meta.env.VITE_API_URL + "/api/Product")
      .then((response) => {
        setProduct(response.data);
        setisloading(false);
      });
    }
   
  }, [isloading]); //[] this dependency arry use to refresh our page again. it help to reload product after delete. if we add some variable of some hook,it will refresh when chnage the variable value

  return (
    <div className="w-full h-full p-0 bg-primary relative">
      {isDeleteConfirmeVisible && (   // this is work like a if. this is short version of if in js
        <Productdeletefunction
          refresh = {()=>{setisloading(true)}}
          productId={productTodelete}
          close={() => {
            setisDeleteConfirmeVisible(false);
          }}
        />
      )}
      <Link
        to="/admin/add-product"
        className="right-[50px] bottom-[50px] hover:text-accent text-secondery text-5xl fixed"
      >
        <FaCirclePlus />
      </Link>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-secondery mb-4">
        Product Management
      </h1>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      {
        isloading ? <Loader/> : 
          <table className="w-full text-sm text-center">
          <thead className="bg-secondery text-white">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Product ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Labelled Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {product.map((item) => (
              <tr
                key={item.productId}
                className="border-b hover:bg-primary transition"
              >
                <td className="py-3 px-4">
                  <img
                    src={item.images[0]}
                    className="w-16 h-16 mx-auto rounded-md object-cover shadow"
                  />
                </td>

                <td className="py-3 px-4 font-medium">{item.productId}</td>

                <td className="py-3 px-4">{item.name}</td>

                <td className="py-3 px-4">Rs. {item.price}</td>

                <td className="py-3 px-4 text-gray-500">
                  Rs. {item.labeledPrice}
                </td>
                <td className="py-3 px-4 text-gray-500">{item.stock}</td>

                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent font-medium">
                    {item.catagory}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="flex justify-center gap-4">
                    <button
                      className="p-2 rounded-full hover:bg-accent/20 transition"
                      onClick={() => {
                        navigate("/admin/update-product", {
                          state: item,
                        });
                      }}
                    >
                      <FaRegEdit className="text-lg text-accent" />
                    </button>

                    <button className="p-2 rounded-full hover:bg-red-100 transition">
                      <MdDelete
                        className="text-lg text-red-500"
                        onClick={() => {
                          setproductTodelete(item.productId);
                          setisDeleteConfirmeVisible(true);
                          // axios.delete(import.meta.VITE_API_URL+"/api/product/"+item.productId);
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      }
      </div>
    </div>
  );
};

export default AdminProductPage;
