import React, { useEffect, useState } from "react";
import { FaChevronCircleUp } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  console.log(location.state);
  const [cart, setacart] = useState(location.state);

  //navigate
  const navigate = useNavigate();

  async function purshesCart() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token == null) {
      toast.error("login first");
      navigate("/login");
      return;
    }

    try {
        let item = []
        for(let i=0;i< cart.length;i++){
            item.push({
                productId:cart[i].productId,
                quantity:cart[i].quantity
            })
        }

        await axios.post(
        import.meta.env.VITE_API_URL + "/api/Orders",
        {
          address: "No 123 street",
          items:item
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("order placed successfully");

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    
      //error is 4000

      if(error.response && error.response.status==400){
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

  console.log(cart);
  return (
    <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center">
      <div className="w-[600px] h-[400px] flex  items-center flex-col  gap-2">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[100px] bg-white flex relative"
            >
              <button className="absolute text-red-500 right-[-50px] top-[40px] text-xl  aspect-square hover:bg-red-600 hover:text-white p-2 rounded-full">
                <BiTrash onClick={() => {}} />
              </button>
              <img
                className="h-full aspect-square object-cover"
                src={item.images[0]}
              />
              <div className="w-[250px] h-full flex flex-col ps-3">
                <h1 className="font-semibold text-lg ps-2">{item.name}</h1>
                <span className="text-secondery/70 ps-2 text-sm">
                  {item.productId}
                
                </span>
              </div>
              <div className="w-[100px] h-full flex flex-col justify-center items-center  gap-1">
                <FaChevronCircleUp
                  onClick={() => {
                    // const newcart = cart; this is not the best way to do it.besouse doest not create te copy of the cart array and modify it directly
                    const newcart = [...cart]; // this is the best way
                    newcart[index].quantity += 1;
                    setacart(newcart);
                  }}
                  className="text-xl"
                />
                <span className="bg-accent/20 w-[30px] h-[30px] rounded-full text-center">
                  {item.quantity}
                </span>
                <FaChevronCircleDown
                  onClick={() => {
                    const newcart = [...cart]; // this is the best way
                    if (newcart[index].quantity > 1) {
                      newcart[index].quantity -= 1;
                    }

                    setacart(newcart);
                  }}
                  className="text-xl"
                />
              </div>
              <div className="w-[100px] h-full flex justify-center items-center">
                {item.labeledPrice > item.price ? (
                  <div className="text-center">
                    <p className="text-accent font-semibold">
                      LKR {item.price.toFixed(2)}
                    </p>
                    <p className="line-through text-secondery/80">
                      LKR {item.labeledPrice.toFixed(2)}
                    </p>
                    <p className="text-secondery/80">
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
          );
        })}
        <div className="w-full h-[100px] bg-white flex flex-row  items-center">
          <div className="w-[400px] h-full flex  items-center pe-4 bg-yellow-100">
            <Link
              className="bg-accent ms-[20px]  text-primary font-semibold px-4 py-2 rounded hover:bg-accent/80 hover:text-secondery"
              to="/checkout"
              onClick={purshesCart}
            >
              Order
            </Link>
            <h1 className="font-semibold text-lg ps-[120px]">Total :</h1>
          </div>
          <div className="flex w-[200px] text-center items-center justify-center">
            <span className="text-accent w-full font-semibold">
              LKR {getTotalPrice(cart).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
