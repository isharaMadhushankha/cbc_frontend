import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { FaCirclePlus } from 'react-icons/fa6';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


const AdminProductPage = () => {

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/Product").then(
      (response) => {
        setProduct(response.data);
      }
    )
  }, []);

  return (
    <div className="w-full h-full p-0 bg-primary relative">
    <Link to="/admin/add-product" className='right-[50px] bottom-[50px] hover:text-accent text-secondery text-5xl fixed'><FaCirclePlus /></Link>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-secondery mb-4">
        Product Management
      </h1>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">

        <table className="w-full text-sm text-center">
          <thead className="bg-secondery text-white">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Product ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Labelled Price</th>
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

                <td className="py-3 px-4 font-medium">
                  {item.productId}
                </td>

                <td className="py-3 px-4">
                  {item.name}
                </td>

                <td className="py-3 px-4">
                  Rs. {item.price}
                </td>

                <td className="py-3 px-4 text-gray-500">
                  Rs. {item.labeledPrice}
                </td>

                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent font-medium">
                    {item.catagory}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="flex justify-center gap-4">
                    <button className="p-2 rounded-full hover:bg-accent/20 transition"  onClick={()=>{
                        navigate("/admin/update-product")
                      }}>
                      <FaRegEdit className="text-lg text-accent" />
                    </button>

                    <button className="p-2 rounded-full hover:bg-red-100 transition">
                      <MdDelete className="text-lg text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default AdminProductPage;
