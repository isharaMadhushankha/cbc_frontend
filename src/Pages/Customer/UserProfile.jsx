import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    image: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setFormData({
        firstName: parsed.firstName || "",
        lastname: parsed.lastname || "",
        email: parsed.email || "",
        image: parsed.image || "",
        phone: parsed.phone || "",
        address: parsed.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = user?._id || user?.id;

      if (!userId) {
        toast.error("Please log in again to update your profile.");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/api/User/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.User));
      setUser(response.data.User);
      window.dispatchEvent(new Event("userUpdated"));
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileInput").click();
  };

  return (
    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center bg-secondery p-4 lg:p-5 font-sans relative overflow-hidden">
      {/* Hidden File Input */}
      <input 
        type="file" 
        id="profileInput" 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageChange} 
      />

      {/* Dynamic Ambient Background */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Split Card */}
      <div className="w-full max-w-5xl h-[450px] flex flex-col lg:flex-row bg-white/10 backdrop-blur-3xl rounded-[25px] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden relative z-10 group">
        
        {/* LEFT PANEL: LUXURY PROFILE (DARK) */}
        <div className="w-full lg:w-[35%] bg-gradient-to-br from-secondery to-secondery/95 flex flex-col items-center justify-center p-6 relative border-r border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Avatar Section */}
            <div className="relative group/avatar">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-accent via-white/20 to-accent shadow-2xl transition-all duration-700">
                <div className="w-full h-full rounded-full overflow-hidden bg-primary border-4 border-white/5 shadow-inner">
                  <img 
                    src={formData.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                  />
                </div>
              </div>
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-1 right-1 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:text-accent transition-all border-2 border-white/20 scale-90 group-hover/avatar:scale-100"
              >
                <FiCamera size={14} />
              </button>
            </div>

            {/* Name & Role */}
            <div className="mt-5 text-center">
              <h2 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                <span className="text-accent not-italic font-light">{formData.firstName}</span> {formData.lastname}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-[1px] w-4 bg-accent/40"></div>
                <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em]">Elite Member</span>
                <div className="h-[1px] w-4 bg-accent/40"></div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-8 w-full px-2 space-y-2.5">
              <div className="flex items-center gap-3 text-white bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiMail className="text-accent text-xs" />
                </div>
                <span className="text-[10px] font-bold truncate opacity-50 tracking-wide">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-white bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                  <FiPhone className="text-accent text-xs" />
                </div>
                <span className="text-[10px] font-bold opacity-50 tracking-wide">{formData.phone || "No Mobile"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: SETTINGS FORM (LIGHT) */}
        <div className="w-full lg:w-[65%] p-6 lg:px-10 lg:py-8 flex flex-col justify-center bg-[#fcfbf7] relative">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-0.5">
              <div className="w-1 h-5 bg-accent rounded-full"></div>
              <h3 className="text-xl font-black text-secondery tracking-tighter uppercase italic">Account <span className="text-accent font-light not-italic">Settings</span></h3>
            </div>
            <p className="text-secondery/30 text-[8px] font-black uppercase tracking-[0.4em] ml-4">Refine Your Global Profile</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-2.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-0.5">
                <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">First Name</label>
                <input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full h-9 bg-primary/20 border border-black/10 rounded-xl px-4 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-secondery/20"
                  required
                />
              </div>
              
              <div className="space-y-0.5">
                <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">Last Name</label>
                <input 
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full h-9 bg-primary/20 border border-black/10 rounded-xl px-4 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-secondery/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">Verified Email</label>
              <input 
                type="email"
                value={formData.email}
                disabled
                className="w-full h-9 bg-primary/30 border border-black/5 rounded-xl px-4 text-secondery/40 text-[11px] font-bold italic cursor-not-allowed"
              />
            </div>

            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">Mobile Number</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 XX XXX XXXX"
                className="w-full h-9 bg-primary/20 border border-black/10 rounded-xl px-4 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-secondery/20"
              />
            </div>

            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery/60 font-black uppercase tracking-wider ml-1">Shipping Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                placeholder="Shipping address details..."
                className="w-full bg-primary/20 border border-black/10 rounded-xl px-4 py-2 text-secondery text-[11px] font-bold focus:outline-none focus:border-accent transition-all resize-none leading-tight placeholder:text-secondery/20"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-accent text-white font-black rounded-xl shadow-lg hover:bg-secondery transition-all duration-500 flex items-center justify-center gap-3 uppercase tracking-[0.4em] text-[10px] active:scale-95 disabled:opacity-50"
              >
                {loading ? "Saving..." : (
                  <>
                    <FiSave size={14} />
                    Synchronize Profile
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

export default UserProfile;
