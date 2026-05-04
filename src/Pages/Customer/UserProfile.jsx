import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave } from "react-icons/fi";
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
        console.error("User ID not found in user object:", user);
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

      // Update local storage and state
      localStorage.setItem("user", JSON.stringify(response.data.User));
      setUser(response.data.User);
      window.dispatchEvent(new Event("userUpdated"));
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile. Please try again.");
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
    <div className="w-full h-[550px] flex items-center justify-center bg-primary p-4 lg:p-5 relative overflow-hidden font-sans">
      {/* Hidden File Input */}
      <input 
        type="file" 
        id="profileInput" 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageChange} 
      />

      {/* Dynamic Ambient Background */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-secondery/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-5"></div>

      <div className="w-full max-w-5xl h-full flex flex-col lg:flex-row bg-white/30 backdrop-blur-3xl rounded-[25px] border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden relative group">
        
        {/* Left Panel: Luxury Profile Card */}
        <div className="w-full lg:w-[35%] bg-gradient-to-br from-secondery to-secondery/95 flex flex-col items-center justify-center p-6 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10">
            <div className="relative group/avatar">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-accent via-white to-accent shadow-2xl transition-transform duration-500 group-hover/avatar:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-primary border-2 border-white/10">
                  <img 
                    src={formData.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:text-accent transition-all border-2 border-white/20"
              >
                <FiCamera size={14} />
              </button>
            </div>
          </div>
          
          <div className="mt-5 text-center z-10">
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">
              <span className="text-accent">{formData.firstName}</span> {formData.lastname}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-[1px] w-5 bg-accent"></div>
              <span className="text-[8px] text-white font-bold uppercase tracking-[0.2em]">Elite Member</span>
              <div className="h-[1px] w-5 bg-accent"></div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-2 z-10">
            <div className="flex items-center gap-3 text-white bg-white/10 p-3 rounded-xl border border-white/10">
              <div className="w-6 h-6 rounded-lg bg-accent/30 flex items-center justify-center shrink-0">
                <FiMail className="text-white text-[10px]" />
              </div>
              <span className="text-[10px] font-medium truncate">{formData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-white bg-white/10 p-3 rounded-xl border border-white/10">
              <div className="w-6 h-6 rounded-lg bg-accent/30 flex items-center justify-center shrink-0">
                <FiPhone className="text-white text-[10px]" />
              </div>
              <span className="text-[10px] font-medium">{formData.phone || "No Mobile"}</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Elegant Form */}
        <div className="w-full lg:w-[65%] p-6 lg:p-8 flex flex-col justify-center bg-white/40 relative overflow-hidden">
          <div className="mb-4">
            <div className="flex items-center gap-2.5 mb-0.5">
              <div className="w-1 h-5 bg-accent rounded-full"></div>
              <h3 className="text-xl font-black text-secondery tracking-tighter uppercase">Account Settings</h3>
            </div>
            <p className="text-secondery/60 text-[9px] font-bold uppercase tracking-widest ml-3.5">Refine Your Profile</p>
          </div>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">First Name</label>
              <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full h-9 bg-white border border-secondery/10 rounded-xl px-4 text-secondery text-xs font-bold focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">Last Name</label>
              <input 
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full h-9 bg-white border border-secondery/10 rounded-xl px-4 text-secondery text-xs font-bold focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
                required
              />
            </div>

            <div className="space-y-0.5 md:col-span-2">
              <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">Verified Email</label>
              <div className="relative">
                <input 
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full h-9 bg-secondery/5 border border-secondery/5 rounded-xl px-4 text-secondery/40 text-xs italic font-bold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">Mobile Number</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 7X XXX XXXX"
                className="w-full h-9 bg-white border border-secondery/10 rounded-xl px-4 text-secondery text-xs font-bold focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
              />
            </div>

            <div className="space-y-0.5 md:col-span-2">
              <label className="text-[8px] text-secondery font-black uppercase tracking-wider ml-1">Shipping Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                placeholder="Full address details..."
                className="w-full bg-white border border-secondery/10 rounded-xl px-4 py-2 text-secondery text-xs font-bold focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm resize-none leading-relaxed"
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-accent text-white font-black rounded-xl shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] active:scale-95 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Synchronize Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
