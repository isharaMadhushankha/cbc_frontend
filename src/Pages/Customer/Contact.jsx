import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/Inquiry", formData);
      toast.success(response.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[550px] flex items-center justify-center bg-primary p-4 lg:p-5 relative overflow-hidden font-sans">
      {/* Dynamic Ambient Background */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-secondery/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-5"></div>

      <div className="w-full max-w-6xl h-full flex flex-col lg:flex-row bg-white/30 backdrop-blur-3xl rounded-[25px] border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden relative group">
        
        {/* Left Panel: Contact Info Card */}
        <div className="w-full lg:w-[40%] bg-gradient-to-br from-secondery to-secondery/95 flex flex-col justify-center p-6 lg:p-10 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-1 h-6 bg-accent rounded-full"></div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Get In <span className="text-accent font-light">Touch</span></h2>
            </div>
            <p className="text-primary/60 text-[8px] font-bold uppercase tracking-[0.3em] ml-3.5 mb-8">Luxury Skincare Concierge</p>
            
            <div className="space-y-4">
              <div className="group flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiPhone className="text-accent text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-accent font-black uppercase tracking-widest mb-0.5">Call Us</p>
                  <p className="text-white text-xs font-medium tracking-wide">+94 11 234 5678</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiMail className="text-accent text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-accent font-black uppercase tracking-widest mb-0.5">Email Us</p>
                  <p className="text-white text-xs font-medium tracking-wide">concierge@cbcbeauty.com</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiMapPin className="text-accent text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-accent font-black uppercase tracking-widest mb-0.5">Visit Us</p>
                  <p className="text-white text-xs font-medium tracking-wide leading-relaxed">
                    Beauty Lane, Colombo 07
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 ml-1.5">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-all duration-300"><FiFacebook size={14}/></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-all duration-300"><FiInstagram size={14}/></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-all duration-300"><FiTwitter size={14}/></a>
            </div>
          </div>
        </div>

        {/* Right Panel: Message Form */}
        <div className="w-full lg:w-[60%] p-6 lg:p-10 flex flex-col justify-center bg-white/40 relative">
          <div className="mb-6">
            <h3 className="text-xl font-black text-secondery tracking-tighter uppercase">Send A <span className="text-accent font-light">Message</span></h3>
            <p className="text-secondery/40 text-[8px] font-black uppercase tracking-widest mt-1">Response within 24 hours</p>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name" 
                  required
                  className="w-full h-10 bg-white border border-secondery/10 rounded-2xl px-5 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm placeholder:text-secondery/20"
                />
              </div>
              <div className="space-y-0.5">
                <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com" 
                  required
                  className="w-full h-10 bg-white border border-secondery/10 rounded-2xl px-5 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm placeholder:text-secondery/20"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">How can we assist?</label>
              <textarea 
                rows="2" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your beauty goals..." 
                required
                className="w-full bg-white border border-secondery/10 rounded-2xl px-5 py-3 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm resize-none placeholder:text-secondery/20 leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-3">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-accent to-[#FFAC4D] text-white font-black rounded-xl shadow-[0_12px_24px_-8px_rgba(255,144,19,0.5)] hover:shadow-[0_20px_32px_-8px_rgba(255,144,19,0.6)] hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[9px] disabled:opacity-50"
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
