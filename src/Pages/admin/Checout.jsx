import React, { useState } from "react";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const [cart, setacart] = useState(location.state);
  const navigate = useNavigate();

  const [name,setname] = useState("");
  const [address,setaddress] = useState("");
  const [phone,setphone] = useState("");

  async function purshesCart() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("login first");
      navigate("/login");
      return;
    }

    try {
      let item = [];
      for (let i = 0; i < cart.length; i++) {
        item.push({
          productId: cart[i].productId,
          quantity: cart[i].quantity,
        });
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/Orders",
        { address: address, customername: name, phone: phone, items: item },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("order placed successfully");
    } catch (error) {
      toast.error("something went wrong");
      if (error.response && error.response.status == 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  function getTotalPrice(cart) {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex justify-center pt-6 px-3">
      <div className="w-full max-w-[700px] flex flex-col gap-4">
        {/* CART ITEMS */}
        {cart.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-lg p-3 flex flex-col lg:flex-row gap-3 relative"
          >
            {/* REMOVE */}
            <button className="absolute lg:right-2 lg:top-2 lg:text-red-500 text-xl top-[25px] right-[25px] bg-white p-1 rounded-full text-red-500">
              <BiTrash />
            </button>

            {/* IMAGE */}
            <img
              src={item.images[0]}
              className="w-full lg:w-[100px] h-[150px] lg:h-[100px] object-cover rounded"
            />

            {/* DETAILS */}
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <span className="text-sm text-secondery/70">
                {item.productId}
              </span>
            </div>

            {/* QUANTITY */}
            <div className="flex lg:flex-col flex-row items-center justify-center gap-2">
              <FaChevronCircleUp
                className="text-xl"
                onClick={() => {
                  const newcart = [...cart];
                  newcart[index].quantity += 1;
                  setacart(newcart);
                }}
              />
              <span className="w-8 h-8 flex items-center justify-center bg-accent/20 rounded-full">
                {item.quantity}
              </span>
              <FaChevronCircleDown
                className="text-xl"
                onClick={() => {
                  const newcart = [...cart];
                  if (newcart[index].quantity > 1) {
                    newcart[index].quantity -= 1;
                  }
                  setacart(newcart);
                }}
              />
            </div>

            {/* PRICE */}
            <div className="flex justify-center items-center text-center min-w-[90px]">
              {item.labeledPrice > item.price ? (
                <div>
                  <p className="text-accent font-semibold">
                    LKR {item.price.toFixed(2)}
                  </p>
                  <p className="line-through text-sm text-secondery/70">
                    LKR {item.labeledPrice.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-accent font-semibold">
                  LKR {item.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className="w-full bg-white rounded-lg p-4 flex flex-col gap-4 items-center ">
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <label htmlFor="" className="text-center ">
              Name
            </label>
            <input
              type="textarea"
              placeholder="Enter your Name"
              className="text-center w-full border border-accent rounded"
              onChange={(e)=>{
                setname(e.target.value)
              }}
            />
          </div>
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <label htmlFor="" className="text-center ">
              Address
            </label>
            <textarea
              type="textarea"
              placeholder="Enter your address"
              className="text-center w-full border border-accent rounded"
              onChange={(e)=>{
                setaddress(e.target.value)
              }}
            />
          </div>
           <div className="w-full flex flex-row justify-center items-center gap-5">
            <label htmlFor="" className="text-center ">
              phone
            </label>
            <input
              type="textarea"
              placeholder="Enter your Phone number"
              className="text-center w-full border border-accent rounded"
              onChange={(e)=>{
                setphone(e.target.value)
              }}
            />
          </div>
        </div>

        {/* TOTAL & ORDER */}
        <div className="w-full bg-white rounded-lg p-4 flex flex-col lg:flex-row gap-4 items-center">
          <button
            onClick={purshesCart}
            className="bg-accent w-full lg:w-[200px] text-primary font-semibold py-2 rounded hover:bg-accent/80"
          >
            Order
          </button>

          <div className="flex-1 flex justify-center lg:justify-end items-center">
            <span className="font-semibold text-lg">
              Total :{" "}
              <span className="text-accent">
                LKR {getTotalPrice(cart).toFixed(2)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
