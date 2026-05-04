import React, { useEffect, useState } from "react";
import { FiSettings, FiGlobe, FiLock, FiTruck, FiShoppingBag, FiSave, FiInfo, FiLayout } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../Components/Loader";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [config, setConfig] = useState({
    siteName: "",
    supportEmail: "",
    siteDescription: "",
    shippingRate: 0,
    freeShippingThreshold: 0,
    heroBanners: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/SystemConfig");
      setConfig(response.data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:5000/api/SystemConfig",
        config,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success("Settings updated successfully");
      setConfig(response.data.config);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const handlePasswordChange = async () => {
    const token = localStorage.getItem("token");
    if (!passwords.currentPassword || !passwords.newPassword) {
      return toast.error("Please fill both fields");
    }
    try {
      await axios.put(
        "http://localhost:5000/api/User/change-password/me",
        passwords,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success("Password updated successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <Loader />;

  const tabs = [
    { id: "general", label: "General", icon: <FiGlobe /> },
    { id: "security", label: "Security", icon: <FiLock /> },
    { id: "shipping", label: "Shipping", icon: <FiTruck /> },
    { id: "content", label: "Page Content", icon: <FiLayout /> },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex justify-between items-end border-b border-secondery/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-secondery tracking-tight">System Settings</h1>
          <p className="text-xs text-secondery/50 font-medium uppercase tracking-[0.2em] mt-1">Configure your luxury platform</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? "bg-secondery text-white shadow-xl translate-x-2"
                  : "bg-white text-secondery/60 border border-secondery/5 hover:bg-primary"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white rounded-[30px] border border-secondery/5 shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FiSettings size={150} />
          </div>

          <div className="relative z-10 h-full">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-accent rounded-full"></div>
                  <h2 className="text-xl font-black text-secondery uppercase tracking-tighter">General Configuration</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">Site Name</label>
                    <input type="text" name="siteName" value={config.siteName} onChange={handleChange} className="w-full h-12 bg-primary/30 border border-secondery/5 rounded-xl px-5 text-secondery font-bold focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">Support Email</label>
                    <input type="email" name="supportEmail" value={config.supportEmail} onChange={handleChange} className="w-full h-12 bg-primary/30 border border-secondery/5 rounded-xl px-5 text-secondery font-bold focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">Site Description (SEO)</label>
                    <textarea rows="3" name="siteDescription" value={config.siteDescription} onChange={handleChange} className="w-full bg-primary/30 border border-secondery/5 rounded-xl px-5 py-4 text-secondery font-bold focus:outline-none focus:border-accent transition-all resize-none leading-relaxed" />
                  </div>
                </div>
                <SaveButton onSave={handleSave} />
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-accent rounded-full"></div>
                  <h2 className="text-xl font-black text-secondery uppercase tracking-tighter">Admin Security</h2>
                </div>
                <div className="space-y-6 max-w-md">
                   <div className="space-y-1.5">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">Current Password</label>
                    <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordInput} className="w-full h-12 bg-primary/30 border border-secondery/5 rounded-xl px-5 text-secondery font-bold focus:outline-none focus:border-accent transition-all" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">New Password</label>
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordInput} className="w-full h-12 bg-primary/30 border border-secondery/5 rounded-xl px-5 text-secondery font-bold focus:outline-none focus:border-accent transition-all" placeholder="••••••••" />
                  </div>
                </div>
                <SaveButton onSave={handlePasswordChange} />
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-accent rounded-full"></div>
                  <h2 className="text-xl font-black text-secondery uppercase tracking-tighter">Shipping & Delivery</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">Flat Rate (LKR)</label>
                    <input type="number" name="shippingRate" value={config.shippingRate} onChange={handleChange} className="w-full h-12 bg-primary/30 border border-secondery/5 rounded-xl px-5 text-secondery font-bold focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-secondery/50 font-black uppercase tracking-widest">Free Shipping Threshold (LKR)</label>
                    <input type="number" name="freeShippingThreshold" value={config.freeShippingThreshold} onChange={handleChange} className="w-full h-12 bg-primary/30 border border-secondery/5 rounded-xl px-5 text-secondery font-bold focus:outline-none focus:border-accent transition-all" />
                  </div>
                </div>
                <SaveButton onSave={handleSave} />
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-accent rounded-full"></div>
                  <h2 className="text-xl font-black text-secondery uppercase tracking-tighter">Banner Management</h2>
                </div>
                
                {/* Banner Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {config.heroBanners?.map((url, index) => (
                    <div key={index} className="group relative aspect-[21/9] rounded-2xl overflow-hidden border border-secondery/5 shadow-md hover:shadow-xl transition-all">
                      <img src={url} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => {
                            const newBanners = config.heroBanners.filter((_, i) => i !== index);
                            setConfig(prev => ({ ...prev, heroBanners: newBanners }));
                            toast.success("Banner removed from list. Click 'Commit Changes' to save.");
                          }}
                          className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                        >
                          <FiSave /> {/* Reusing icon for delete placeholder or use FiTrash if imported */}
                          <span className="text-[10px] font-black uppercase tracking-widest ml-2">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Placeholder */}
                  <label className="aspect-[21/9] border-2 border-dashed border-secondery/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-accent/30 hover:bg-primary/20 transition-all group">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        
                        const loadingToast = toast.loading("Uploading luxury banner...");
                        try {
                          const { default: MediaUpload } = await import("../../utils/MediaUpload");
                          const url = await MediaUpload(file);
                          setConfig(prev => ({ 
                            ...prev, 
                            heroBanners: [...(prev.heroBanners || []), url] 
                          }));
                          toast.success("Banner uploaded! Click 'Commit Changes' to finalize.", { id: loadingToast });
                        } catch (err) {
                          toast.error("Upload failed", { id: loadingToast });
                        }
                      }}
                    />
                    <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <FiLayout className="text-secondery/30 group-hover:text-accent transition-colors" />
                    </div>
                    <span className="text-[10px] font-black text-secondery/40 uppercase tracking-widest group-hover:text-secondery transition-colors">Add New Banner</span>
                  </label>
                </div>

                <div className="bg-primary/30 p-4 rounded-xl border border-secondery/5">
                   <p className="text-[10px] text-secondery/50 italic leading-relaxed">
                     <span className="font-bold text-accent uppercase mr-2">Pro Tip:</span> 
                     For the most premium look, use images with a wide aspect ratio (at least 1920x600px). 
                     Changes will reflect on the Home Page hero slider after you save.
                   </p>
                </div>

                {/* Promotional Ad Banner */}
                <div className="pt-6 border-t border-secondery/5 mt-6">
                  <h3 className="text-[10px] font-black text-secondery uppercase tracking-[0.2em] mb-4">Promotional Ad Banner</h3>
                  
                  {config.middleAdBanner ? (
                    <div className="group relative w-full aspect-[21/4] rounded-2xl overflow-hidden border border-secondery/5 shadow-lg">
                      <img src={config.middleAdBanner} alt="Ad Banner" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => {
                            setConfig(prev => ({ ...prev, middleAdBanner: "" }));
                            toast.success("Ad Banner removed. Click 'Commit Changes' to save.");
                          }}
                          className="px-6 py-3 bg-red-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl"
                        >
                          Delete Ad Banner
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="w-full aspect-[21/4] border-2 border-dashed border-secondery/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-accent/30 hover:bg-primary/20 transition-all group">
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const loadingToast = toast.loading("Uploading promo banner...");
                          try {
                            const { default: MediaUpload } = await import("../../utils/MediaUpload");
                            const url = await MediaUpload(file);
                            setConfig(prev => ({ ...prev, middleAdBanner: url }));
                            toast.success("Ad Banner uploaded! Click 'Commit Changes' to finalize.", { id: loadingToast });
                          } catch (err) {
                            toast.error("Upload failed", { id: loadingToast });
                          }
                        }}
                      />
                      <FiShoppingBag className="text-3xl text-secondery/20 group-hover:text-accent transition-colors mb-2" />
                      <span className="text-[10px] font-black text-secondery/40 uppercase tracking-widest group-hover:text-secondery transition-colors">Upload Middle Ad Banner</span>
                    </label>
                  )}
                </div>

                <SaveButton onSave={handleSave} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SaveButton = ({ onSave }) => (
  <div className="pt-6 border-t border-secondery/5 mt-8 flex justify-end">
    <button 
      onClick={onSave}
      className="px-10 py-4 bg-accent text-white font-black rounded-2xl flex items-center gap-3 text-[10px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
    >
      <FiSave size={16} />
      Commit Changes
    </button>
  </div>
);

export default AdminSettings;
