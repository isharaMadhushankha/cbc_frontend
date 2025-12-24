import React, { useState } from "react";
import { addToCart, getTotal, LoadCart } from "../../utils/Cart";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setacart] = useState(LoadCart());

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
            <button className="absolute lgright-2 lg:top-2 lg:text-red-500 text-xl lg:hover:text-red-600 top-[25px] right-[25px] bg-white p-1 rounded-full text-red-400">
              <BiTrash
                onClick={() => {
                  addToCart(item, -item.quantity);
                  setacart(LoadCart());
                }}
              />
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
                className="text-xl cursor-pointer"
                onClick={() => {
                  addToCart(item, 1);
                  setacart(LoadCart);
                }}
              />
              <span className="w-8 h-8 flex items-center justify-center bg-accent/20 rounded-full">
                {item.quantity}
              </span>
              <FaChevronCircleDown
                className="text-xl cursor-pointer"
                onClick={() => {
                  addToCart(item, -1);
                  setacart(LoadCart);
                }}
              />
            </div>

            {/* PRICE */}
            <div className="flex justify-center items-center text-center min-w-[100px]">
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

        {/* TOTAL & CHECKOUT */}
        <div className="w-full bg-white rounded-lg p-4 flex flex-col lg:flex-row gap-4 items-center">
          <Link
            state={cart}
            to="/checkout"
            className="bg-accent w-full lg:w-[220px] text-center text-primary font-semibold py-2 rounded hover:bg-accent/80"
          >
            Proceed to Checkout
          </Link>

          <div className="flex-1 flex justify-center lg:justify-end items-center">
            <span className="font-semibold text-lg">
              Total :{" "}
              <span className="text-accent">
                LKR {getTotal(cart).toFixed(2)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
