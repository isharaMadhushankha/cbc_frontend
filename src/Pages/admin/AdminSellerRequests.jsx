import React, { useState, useEffect } from "react";
import { FaStore, FaCheck, FaTimes, FaEnvelope, FaTag, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const AdminSellerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/Seller/all");
      setRequests(res.data.filter(req => req.status === 'pending')); // Show only pending
    } catch (err) {
      toast.error("Failed to fetch requests");
    }
    setLoading(false);
  };

  const handleAction = async (id, action) => {
    const status = action === 'approve' ? 'approved' : 'rejected';
    try {
      await axios.put(import.meta.env.VITE_API_URL + `/api/Seller/update/${id}`, { status });
      toast.success(`Request ${status} successfully!`);
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-secondery/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <FaStore size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-secondery uppercase tracking-tight">Seller Requests</h2>
            <p className="text-xs text-secondery/40 font-bold uppercase tracking-widest">Manage pending merchant applications</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-accent/5 rounded-full border border-accent/10">
          <span className="text-accent font-black text-[10px] uppercase tracking-widest">{requests.length} Pending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {requests.map((request) => (
          <div key={request._id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-secondery/5 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 group relative overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-accent font-black uppercase tracking-[0.3em] text-[9px] px-3 py-1 bg-accent/5 rounded-full border border-accent/10">New Application</span>
                  <h3 className="text-2xl font-black text-secondery uppercase tracking-tight mt-3">{request.brandName}</h3>
                  <p className="text-sm font-bold text-secondery/60 flex items-center gap-2">
                    <FaTag className="text-accent/40" size={12} /> {request.category}
                  </p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-secondery/30 uppercase tracking-widest">{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black text-secondery/40 uppercase tracking-widest flex items-center gap-2">
                    <FaEnvelope size={10} /> Contact Person
                  </p>
                  <p className="text-sm font-bold text-secondery">{request.fullName}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black text-secondery/40 uppercase tracking-widest flex items-center gap-2">
                    <FaEnvelope size={10} /> Email Address
                  </p>
                  <p className="text-sm font-bold text-secondery truncate">{request.email}</p>
                </div>
              </div>

              <div className="p-6 bg-accent/[0.02] rounded-3xl border border-accent/5 space-y-2">
                <p className="text-[9px] font-black text-accent uppercase tracking-widest flex items-center gap-2">
                  <FaInfoCircle size={10} /> Brand Vision
                </p>
                <p className="text-sm font-medium text-secondery/70 leading-relaxed italic">
                  "{request.message}"
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => handleAction(request._id, 'approve')}
                  className="flex-1 bg-secondery text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-3 group/btn"
                >
                  <FaCheck className="group-hover/btn:scale-110 transition-transform" /> Approve Partner
                </button>
                <button 
                  onClick={() => handleAction(request._id, 'reject')}
                  className="px-6 border-2 border-secondery/5 text-secondery/30 hover:text-red-500 hover:border-red-100 hover:bg-red-50 py-4 rounded-2xl transition-all flex items-center justify-center"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4 bg-white rounded-[3rem] border border-dashed border-secondery/10">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-secondery/10">
              <FaStore size={40} />
            </div>
            <h3 className="text-xl font-black text-secondery/20 uppercase tracking-tight">No Pending Requests</h3>
            <p className="text-sm text-secondery/10 font-bold uppercase tracking-widest">All caught up! Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSellerRequests;
