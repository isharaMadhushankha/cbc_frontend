import React, { useState } from "react";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const [cart, setacart] = useState(location.state || []);
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  async function purshesCart() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("Login first");
      navigate("/login");
      return;
    }

    if (!name || !address || !phone) {
      toast.error("Please fill in all delivery details");
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

      toast.success("Order placed successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
      if (error.response && error.response.status === 400) {
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
    <div className="w-full h-[calc(100vh-70px)] bg-secondery flex flex-col items-center justify-center p-4 pt-8 font-sans relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[22rem] lg:text-[35rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12">
        CBC
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col gap-4 items-center">
        {/* Unified Header Row */}
        <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-center pt-2">
          <div className="w-full lg:w-[480px] flex items-center gap-4 px-2">
            <h2 className="text-white text-base font-black uppercase tracking-widest italic whitespace-nowrap">Review Order</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/60 to-transparent"></div>
          </div>
          <div className="w-full lg:w-[440px] px-2 flex items-center gap-4">
            <h3 className="text-white text-base font-black uppercase tracking-widest italic whitespace-nowrap">Delivery</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/60 to-transparent"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-center w-full">
          
          {/* LEFT SECTION: REVIEW ORDER */}
          <div className="w-full lg:w-[480px] flex flex-col">
            <div className="bg-white/5 backdrop-blur-[25px] rounded-[32px] p-6 border border-white/10 shadow-2xl relative overflow-hidden group h-[480px] flex flex-col">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rotate-12 transition-transform duration-1000 group-hover:translate-x-4"></div>
              
              <div className="relative z-10 space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {cart.length > 0 ? cart.map((item, index) => (
                  <div
                    key={index}
                    className="w-full bg-white/[0.04] backdrop-blur-md border border-white/5 rounded-[24px] p-5 flex gap-6 relative group/item transition-all duration-300 hover:bg-white/[0.08] hover:border-white/10"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 p-3 flex items-center justify-center">
                      <img
                        src={item.images[0]}
                        className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover/item:scale-110"
                        alt={item.name}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-black text-xs uppercase tracking-wider leading-tight group-hover/item:text-accent transition-colors">{item.name}</h3>
                          <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mt-1 block">Ref: {item.productId}</span>
                        </div>
                        <button 
                          onClick={() => {
                            const newcart = cart.filter((_, i) => i !== index);
                            setacart(newcart);
                          }}
                          className="text-white/20 hover:text-red-400 transition-colors"
                        >
                          <BiTrash size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4 bg-white/5 rounded-xl px-3 py-1.5 border border-white/5">
                          <button onClick={() => {
                            const newcart = [...cart];
                            if (newcart[index].quantity > 1) {
                              newcart[index].quantity -= 1;
                              setacart(newcart);
                            }
                          }} className="text-white/30 hover:text-white transition-colors"><FaChevronCircleDown size={16}/></button>
                          <span className="text-xs text-white font-black w-6 text-center">{item.quantity}</span>
                          <button onClick={() => {
                            const newcart = [...cart];
                            newcart[index].quantity += 1;
                            setacart(newcart);
                          }} className="text-white/30 hover:text-white transition-colors"><FaChevronCircleUp size={16}/></button>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-accent tracking-tighter italic">LKR {item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10">
                    <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: DELIVERY */}
          <div className="w-full lg:w-[440px] flex flex-col">
            <div className="bg-white/5 backdrop-blur-[30px] rounded-[32px] p-8 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] h-[480px] flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rotate-12 transition-transform duration-1000 group-hover:translate-x-4"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="space-y-5">
                  <div className="group/input">
                    <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-1.5 block ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Ishara Madhushankha"
                      className="w-full h-10 bg-white/[0.03] border border-white/10 rounded-xl px-5 text-white text-[12px] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-white/10"
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>

                  <div className="group/input">
                    <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-1.5 block ml-1">Shipping Address</label>
                    <textarea
                      rows="2"
                      placeholder="Enter street address"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white text-[12px] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-white/10 resize-none leading-tight"
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div className="group/input">
                    <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-1.5 block ml-1">Contact Phone</label>
                    <input
                      type="text"
                      placeholder="+94 XX XXX XXXX"
                      className="w-full h-10 bg-white/[0.03] border border-white/10 rounded-xl px-5 text-white text-[12px] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-white/10"
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col mb-4">
                    <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-0.5">Final Amount</p>
                    <p className="text-3xl font-black text-accent tracking-tighter leading-none italic drop-shadow-[0_0_15px_rgba(255,144,19,0.3)]">
                      LKR {getTotalPrice(cart).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <button
                    onClick={purshesCart}
                    className="w-full h-12 bg-accent text-white font-black rounded-xl shadow-[0_10px_20px_rgba(255,144,19,0.2)] hover:bg-white hover:text-secondery transition-all duration-500 uppercase tracking-[0.4em] text-[11px] hover:scale-[1.02] active:scale-95"
                  >
                    Confirm Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="w-full flex justify-center mt-4">
          <Link to="/product" className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] hover:text-accent transition-all group flex items-center gap-2">
            <span className="w-4 h-[1px] bg-white/5 group-hover:bg-accent transition-colors"></span>
            Continue Shopping
            <span className="w-4 h-[1px] bg-white/5 group-hover:bg-accent transition-colors"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
