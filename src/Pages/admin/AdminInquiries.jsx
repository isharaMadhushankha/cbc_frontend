import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMessageSquare, FiClock, FiCheckCircle, FiUser, FiMail, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Inquiry/all");
      setInquiries(response.data);
    } catch (error) {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/Inquiry/status/${id}`, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchInquiries();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex justify-between items-end border-b border-secondery/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-secondery tracking-tight">Customer Inquiries</h1>
          <p className="text-xs text-secondery/50 font-medium uppercase tracking-[0.2em] mt-1">Management Console</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-secondery/5 shadow-sm flex items-center gap-2">
            <FiMessageSquare className="text-accent" />
            <span className="text-xs font-bold text-secondery">{inquiries.length} Total</span>
          </div>
          <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-2">
            <FiClock className="text-accent" />
            <span className="text-xs font-bold text-accent">
              {inquiries.filter(i => i.status === "pending").length} New
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-[25px] border border-secondery/5 p-20 flex flex-col items-center justify-center text-center shadow-lg">
             <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
                <FiMessageSquare className="text-accent text-3xl opacity-20" />
             </div>
             <h3 className="text-xl font-bold text-secondery">No Inquiries Found</h3>
             <p className="text-sm text-secondery/40 max-w-xs mt-2">When customers send messages through the contact page, they will appear here.</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div 
              key={inquiry._id} 
              className={`bg-white rounded-[25px] border border-secondery/5 p-6 shadow-md transition hover:shadow-xl relative overflow-hidden group ${
                inquiry.status === 'pending' ? 'border-l-4 border-l-accent' : 'border-l-4 border-l-green-500'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                {/* Header Info */}
                <div className="lg:w-1/4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-secondery/5">
                      <FiUser className="text-secondery" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-secondery truncate">{inquiry.name}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-secondery/40 font-medium">
                        <FiCalendar />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 px-3 py-2 bg-primary/30 rounded-xl border border-secondery/5">
                    <FiMail className="text-accent text-xs" />
                    <span className="text-[11px] font-bold text-secondery/70 truncate">{inquiry.email}</span>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    inquiry.status === 'pending' 
                      ? 'bg-accent/10 text-accent border border-accent/20' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {inquiry.status === 'pending' ? <FiClock /> : <FiCheckCircle />}
                    {inquiry.status}
                  </div>
                </div>

                {/* Message Body */}
                <div className="lg:w-2/4 bg-primary/20 p-5 rounded-2xl border border-secondery/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-2">Message Content</span>
                    <p className="text-xs text-secondery/80 leading-relaxed font-medium italic">
                      "{inquiry.message}"
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-1/4 flex flex-col justify-center gap-3">
                  <button 
                    onClick={() => handleStatusChange(inquiry._id, inquiry.status === 'pending' ? 'resolved' : 'pending')}
                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition shadow-lg ${
                      inquiry.status === 'pending'
                        ? 'bg-secondery text-white hover:bg-accent'
                        : 'bg-white text-secondery border border-secondery/10 hover:bg-primary'
                    }`}
                  >
                    {inquiry.status === 'pending' ? (
                      <><FiCheckCircle /> Mark as Resolved</>
                    ) : (
                      <><FiClock /> Reopen Inquiry</>
                    )}
                  </button>
                  
                  <a 
                    href={`mailto:${inquiry.email}?subject=Reply to your CBC Beauty Inquiry`}
                    className="w-full py-3 bg-accent text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-[0_8px_16px_-4px_rgba(255,144,19,0.4)] hover:shadow-xl transition"
                  >
                    <FiMail />
                    Send Direct Reply
                  </a>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-1 opacity-5 group-hover:opacity-10 transition-opacity">
                <FiMessageSquare size={120} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
