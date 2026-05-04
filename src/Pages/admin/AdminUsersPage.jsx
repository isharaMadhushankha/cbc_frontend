import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_API_URL + "/api/User/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/User/block/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      fetchUsers(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="w-full h-full p-0 bg-primary relative">
      <h1 className="text-2xl font-semibold text-secondery mb-4">
        User Management
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-sm text-center">
            <thead className="bg-secondery text-white">
              <tr>
                <th className="py-3 px-4">Avatar</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-primary transition"
                >
                  <td className="py-3 px-4">
                    {user.image && user.image !== "http://www.avater.com/avater/" ? (
                      <img
                        src={user.image}
                        className="w-10 h-10 mx-auto rounded-full object-cover"
                        alt="avatar"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-secondery/30 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-secondery">
                    {user.firstName} {user.lastname}
                  </td>
                  <td className="py-3 px-4 text-secondery/70">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-primary text-secondery/60 border border-secondery/5'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => user.role !== 'admin' && handleToggleStatus(user._id)}
                      disabled={user.role === 'admin'}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 ${
                        user.role === 'admin' 
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : user.isblock
                            ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
                            : "bg-green-500 text-white hover:bg-green-600 shadow-[0_4px_12px_rgba(34,197,94,0.3)]"
                      }`}
                    >
                      {user.isblock ? "Blocked" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
