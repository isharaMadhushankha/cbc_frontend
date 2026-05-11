import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPackage, FiCalendar, FiDollarSign, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (Array.isArray(response.data)) {
          setOrders(response.data.reverse()); 
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
        toast.error("Could not load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return { icon: <FiCheckCircle />, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" };
      case "shipped":
        return { icon: <FiTruck />, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
      case "pending":
        return { icon: <FiClock />, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" };
      case "cancelled":
        return { icon: <FiXCircle />, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" };
      default:
        return { icon: <FiPackage />, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" };
    }
  };

  return (
    <div className="w-full min-h-screen bg-secondery flex flex-col items-center p-6 lg:p-12 font-sans relative overflow-x-hidden">
      {/* Background Branding */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[20rem] lg:text-[30rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12">
        ORDERS
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-white text-3xl font-black uppercase tracking-[0.3em] italic">Purchase History</h1>
          <div className="w-20 h-1.5 bg-accent rounded-full mt-2"></div>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mt-4">
            Manage your past boutique orders
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const status = getStatusStyle(order.status);
              return (
                <div 
                  key={index}
                  className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[24px] p-4 lg:px-7 lg:py-5 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 shadow-2xl group"
                >
                  {/* Order Meta */}
                  <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start w-full lg:w-auto lg:border-r border-white/5 lg:pr-10 lg:min-w-[180px]">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-white/30 font-black uppercase tracking-[0.3em]">Order ID</span>
                      <p className="text-white font-black text-[13px] tracking-wide mt-0.5">#{order.orderId || order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    
                    <div className="hidden lg:flex flex-col mt-3">
                      <span className="text-[7px] text-white/30 font-black uppercase tracking-[0.3em]">Date Placed</span>
                      <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-bold mt-0.5">
                        <FiCalendar className="text-accent text-[12px]" />
                        {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div className={`mt-0 lg:mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bg} ${status.border} ${status.color} text-[8px] font-black uppercase tracking-widest`}>
                      <span className="animate-pulse">{status.icon}</span>
                      {order.status || "Processing"}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex-1 w-full flex items-center justify-start gap-4 overflow-x-auto pb-1 custom-scrollbar">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex-shrink-0 group/item relative">
                        <div className="w-20 h-20 bg-white/5 rounded-2xl p-2.5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover/item:scale-110 group-hover/item:border-accent/40 shadow-xl overflow-hidden">
                          <img src={item.images} className="w-full h-full object-cover rounded-lg" alt={item.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-black border-2 border-secondery shadow-lg z-20">
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                    <div className="ml-2 hidden lg:block">
                      <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em] leading-tight">
                        {order.items.length} {order.items.length === 1 ? "Product" : "Items"} <br/>
                        <span className="text-white/40">In Shipment</span>
                      </p>
                    </div>
                  </div>

                  {/* Order Total & Actions */}
                  <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end w-full lg:w-auto lg:pl-10 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                    <div className="flex flex-col lg:items-end">
                      <span className="text-[7px] text-white/30 font-black uppercase tracking-[0.3em] mb-0.5">Grand Total</span>
                      <p className="text-xl lg:text-2xl font-black text-accent tracking-tighter italic drop-shadow-lg">LKR {order.total.toLocaleString()}</p>
                    </div>
                    <button className="flex items-center gap-2 text-[9px] text-white/40 font-black uppercase tracking-[0.4em] hover:text-accent transition-all group/btn mt-0 lg:mt-4">
                      Details
                      <FiArrowRight className="transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full bg-white/[0.02] border border-dashed border-white/10 rounded-[40px] py-32 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5 text-white/10">
              <FiPackage size={40} />
            </div>
            <h2 className="text-white/40 text-2xl font-black uppercase tracking-[0.2em] mb-4">No Orders Yet</h2>
            <p className="text-white/20 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
              Your boutique history is empty. Start shopping to fill it with luxury.
            </p>
            <Link to="/product" className="mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase tracking-widest text-[11px] hover:bg-accent hover:border-accent transition-all">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
