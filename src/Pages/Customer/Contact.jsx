import React, { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiUrl}/api/Inquiry`, formData, {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Inquiry submission error:", error);
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Server may be offline.");
      } else if (error.response?.status === 404) {
        toast.error("API endpoint not found. Check server configuration.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message === "Network Error") {
        toast.error("Network error. Is the backend server running?");
      } else {
        toast.error(error.message || "Failed to send inquiry");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-secondery p-4 lg:p-5 relative overflow-hidden font-sans">
      {/* Dynamic Ambient Background */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="w-full max-w-6xl h-full flex flex-col lg:flex-row bg-white/10 backdrop-blur-3xl rounded-[25px] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative group">
        {/* Left Panel: Contact Info Card */}
        <div className="w-full lg:w-[40%] bg-gradient-to-br from-secondery to-secondery/95 flex flex-col justify-center p-6 lg:p-8 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-1 h-6 bg-accent rounded-full"></div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                Get In <span className="text-accent font-light">Touch</span>
              </h2>
            </div>
            <p className="text-primary/60 text-[8px] font-bold uppercase tracking-[0.3em] ml-3.5 mb-6">
              Luxury Skincare Concierge
            </p>

            <div className="space-y-3">
              <div className="group flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiPhone className="text-accent text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-accent font-black uppercase tracking-widest mb-0.5">
                    Call Us
                  </p>
                  <p className="text-white text-xs font-medium tracking-wide">
                    +94 11 234 5678
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiMail className="text-accent text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-accent font-black uppercase tracking-widest mb-0.5">
                    Email Us
                  </p>
                  <p className="text-white text-xs font-medium tracking-wide">
                    concierge@cbcbeauty.com
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiMapPin className="text-accent text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-accent font-black uppercase tracking-widest mb-0.5">
                    Visit Us
                  </p>
                  <p className="text-white text-xs font-medium tracking-wide leading-relaxed">
                    Beauty Lane, Colombo 07
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 ml-1.5">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1877F2] hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <FiFacebook size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1DA1F2] hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <FiTwitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel: Message Form - Light/Clean Design */}
        <div className="w-full lg:w-[60%] p-6 lg:p-10 flex flex-col justify-center bg-white relative">
          <div className="mb-4">
            <h3 className="text-xl font-black text-secondery tracking-tighter uppercase italic">
              Send A{" "}
              <span className="text-accent font-light not-italic">Message</span>
            </h3>
            <p className="text-secondery/30 text-[8px] font-black uppercase tracking-widest mt-1">
              Response within 24 hours
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full h-10 bg-primary/20 border border-black/20 rounded-xl px-5 text-secondery text-[11px] font-medium focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm placeholder:text-secondery/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  className="w-full h-10 bg-primary/20 border border-black/20 rounded-xl px-5 text-secondery text-[11px] font-medium focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm placeholder:text-secondery/20"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">
                How can we assist?
              </label>
              <textarea
                rows="2"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your beauty goals..."
                required
                className="w-full bg-primary/20 border border-black/20 rounded-xl px-5 py-3 text-secondery text-[11px] font-medium focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm resize-none placeholder:text-secondery/20 leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-secondery text-white font-bold rounded-xl shadow-lg hover:bg-accent transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[9px] disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <FiSend size={14} />
                    Inquire Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
