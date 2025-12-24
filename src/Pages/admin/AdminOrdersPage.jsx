import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

/* ================= STATUS COLOR HELPER ================= */
const statusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "processing":
      return "bg-blue-100 text-blue-700 border-blue-300";
    case "shipped":
      return "bg-purple-100 text-purple-700 border-purple-300";
    case "delivered":
      return "bg-green-100 text-green-700 border-green-300";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const AdminOrdersPage = () => {
  const [orders, setorders] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [ismodelopen, setismodelopen] = useState(false);
  const [selectedorder, setselectedorder] = useState(null);
  const [orderStatus, setorderStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (isloading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/Orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setorders(res.data);
          setisloading(false);
        });
    }
  }, [isloading]);

  /* ================= UPDATE STATUS ================= */
  const updateOrderStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        import.meta.env.VITE_API_URL +
          "/api/Orders/status/" +
          selectedorder.orderId,
        { status: orderStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setismodelopen(false);
      setisloading(true);
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="w-full h-full  bg-primary">

      {/* ================= MODAL ================= */}
      {ismodelopen && selectedorder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center">
          <div className="w-[90%] max-w-3xl bg-primary rounded-2xl shadow-2xl p-6 relative">

            <button
              onClick={() => setismodelopen(false)}
              className="absolute top-4 right-4 text-xl font-bold text-secondery hover:text-accent"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-secondery mb-6">
              Order Details
            </h2>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <p><b>Order ID:</b> {selectedorder.orderId}</p>
              <p><b>Date:</b> {new Date(selectedorder.date).toLocaleString()}</p>
              <p><b>Customer:</b> {selectedorder.customername}</p>
              <p><b>Email:</b> {selectedorder.email}</p>
              <p><b>Phone:</b> {selectedorder.phone}</p>
              <p className="col-span-2">
                <b>Address:</b> {selectedorder.address}
              </p>
            </div>

            {/* Status Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-secondery">
                  Order Status
                </label>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyle(orderStatus)}`}
                >
                  {orderStatus}
                </span>
              </div>

              <select
                value={orderStatus}
                onChange={(e) => setorderStatus(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 bg-white
                           focus:outline-none focus:ring-2 focus:ring-accent
                           transition shadow-sm"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Items Table */}
            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full text-sm text-center">
                <thead className="bg-secondery text-white">
                  <tr>
                    <th className="py-2">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedorder.items.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="flex gap-2 items-center justify-center py-2">
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        {item.name}
                      </td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-secondery">
                Total:
                <span className="ml-2 text-accent">
                  ${selectedorder.total}
                </span>
              </span>

              <button
                onClick={updateOrderStatus}
                className="px-6 py-2 bg-accent text-white rounded-lg
                           hover:brightness-110 transition shadow-md"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <h1 className="text-2xl font-semibold text-secondery mb-2 ">
        Orders Management
      </h1>

      <div className="overflow-x-auto rounded-xl shadow bg-white">
        {isloading ? (
          <Loader />
        ) : (
          <table className="w-full text-sm text-center">
            <thead className="bg-secondery text-white">
              <tr className="" >
                <th className="py-3">Order ID</th>
                <th>Items</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-primary transition cursor-pointer h-[40px]"
                  onClick={() => {
                    setselectedorder(item);
                    setorderStatus(item.status);
                    setismodelopen(true);
                  }}
                >
                  <td>{item.orderId}</td>
                  <td>{item.items.length}</td>
                  <td>{item.customername}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>${item.total}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
