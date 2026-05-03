import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
                  <td className="py-3 px-4 font-medium">
                    {user.firstName} {user.lastname}
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isblock
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.isblock ? "Blocked" : "Active"}
                    </span>
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
