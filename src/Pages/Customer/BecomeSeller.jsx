import React from "react";
import { FiUserCheck, FiUpload, FiTrendingUp, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BecomeSeller = () => {
  const [selectedStep, setSelectedStep] = React.useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    brandName: "",
    email: "",
    category: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/Seller/submit", formData);
      toast.success("Application submitted successfully!");
      setIsApplyModalOpen(false);
      setFormData({ fullName: "", brandName: "", email: "", category: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
    setIsSubmitting(false);
  };

  const steps = [
    {
      icon: <FiUserCheck />,
      title: "Register Your Boutique",
      desc: "Create a professional seller account with your business details and identity verification.",
      details: "Our onboarding process is streamlined for luxury brands. You'll need to provide business registration documents, identity verification, and a short brand portfolio. Once submitted, our curation team will review your application within 48 hours to ensure alignment with CBC's premium standards."
    },
    {
      icon: <FiUpload />,
      title: "Curate Your Collection",
      desc: "Upload high-quality images and detailed descriptions of your luxury beauty products.",
      details: "Gain access to our exclusive Merchant Portal where you can manage your high-end catalog. We support high-resolution imagery, detailed ingredient lists, and storytelling descriptions. You can also request professional photography assistance from our in-house studio to match our boutique aesthetic."
    },
    {
      icon: <FiTrendingUp />,
      title: "Accelerate Your Sales",
      desc: "Reach thousands of premium customers and manage your orders via our advanced dashboard.",
      details: "Leverage our AI-driven marketing engine that targets premium shoppers in Sri Lanka and globally. Track your performance with real-time analytics, manage logistics through our trusted delivery partners, and receive secure bi-weekly payouts directly to your business account."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="w-full bg-secondery py-20 px-6 lg:px-12 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
        </div>
        
        <span className="relative z-10 text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4">Partner with Excellence</span>
        <h1 className="relative z-10 text-white text-4xl lg:text-6xl font-black uppercase tracking-tight leading-tight max-w-4xl italic">
          Empower Your <span className="text-accent not-italic">Beauty Brand</span> With CBC
        </h1>
        <p className="relative z-10 text-white/50 text-sm lg:text-lg mt-6 max-w-2xl leading-relaxed">
          Join Sri Lanka's most exclusive boutique marketplace. We provide the platform, you provide the brilliance.
        </p>
        <button 
          onClick={() => setIsApplyModalOpen(true)}
          className="relative z-10 mt-10 px-12 py-5 bg-accent text-white font-black uppercase tracking-[0.3em] text-xs rounded-full shadow-2xl hover:bg-white hover:text-secondery transition-all active:scale-95"
        >
          Apply to Sell
        </button>
      </div>

      {/* Steps Section - Premium Dark Process Design */}
      <div className="w-full bg-white py-16 px-6 lg:px-12 relative overflow-hidden">
        {/* Premium Mesh Gradient Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           {/* Center Glow behind Title */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[250px] bg-gradient-to-b from-accent/10 via-accent/[0.02] to-transparent rounded-full blur-[60px]"></div>
           
           {/* Floating Ambient Orbs */}
           <div className="absolute top-10 left-[10%] w-48 h-48 bg-accent/10 rounded-full blur-[50px] animate-pulse"></div>
           <div className="absolute top-15 right-[10%] w-40 h-40 bg-primary/10 rounded-full blur-[40px] animate-pulse delay-700"></div>

           {/* Subtle Grid Pattern */}
           <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#ff9013 0.5px, transparent 0.5px), linear-gradient(90deg, #ff9013 0.5px, transparent 0.5px)', backgroundSize: '60px 60px'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-2">
            <div className="inline-block mb-3 px-5 py-1.5 rounded-full bg-accent/5 border border-accent/10 backdrop-blur-sm">
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px]">Process Workflow</span>
            </div>
            <h2 className="text-secondery text-3xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-3">
              How to <span className="text-accent italic font-serif">Get Started</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full shadow-[0_5px_15px_rgba(255,144,19,0.2)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative mt-4">
             {/* Subtle connecting line between cards for desktop */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-accent/[0.05] -translate-y-1/2 z-0"></div>
            {steps.map((step, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedStep(step)}
                className="group relative flex flex-col items-center text-center p-12 bg-secondery rounded-[3rem] border border-white/5 transition-all duration-700 hover:shadow-[0_50px_100px_rgba(0,0,0,0.3)] hover:-translate-y-4 overflow-hidden cursor-pointer"
              >
                {/* Glowing Background Effect on Hover */}
                <div className="absolute -inset-px bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Step Number Badge */}
                <div className="absolute top-8 right-10 text-6xl font-black italic text-white/5 group-hover:text-accent/10 transition-colors duration-700">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon Container */}
                <div className="w-24 h-24 bg-white/5 rounded-[2.2rem] flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-accent group-hover:scale-110 shadow-2xl relative z-10">
                   <div className="text-accent group-hover:text-white transition-colors transform group-hover:rotate-12 duration-500">
                     {React.cloneElement(step.icon, { size: 38, className: "transition-colors" })}
                   </div>
                </div>

                <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-4 relative z-10 group-hover:text-accent transition-colors">{step.title}</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs relative z-10 group-hover:text-white/60 transition-colors">{step.desc}</p>
                
                {/* Bottom Interactive Element */}
                <div className="mt-10 flex items-center gap-3 text-accent font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-700 relative z-10">
                   Learn More <span className="text-lg">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us - Optimized Premium Layout with Background Design */}
      <div className="w-full bg-white py-16 px-6 lg:px-12 relative overflow-hidden">
        {/* Decorative background elements for white section */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#ff9013 0.5px, transparent 0.5px)', backgroundSize: '30px 30px'}}></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
          {/* Left Side: Benefits List */}
          <div className="flex-[1.2] space-y-12">
            <div className="space-y-4">
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Merchant Benefits</span>
              <h2 className="text-secondery text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
                Why Sell on <br/> <span className="text-accent italic font-serif">Crystal Beauty Clear?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
              {[
                { title: "Global Reach", desc: "Access to 50,000+ Active Premium Customers" },
                { title: "Low Fees", desc: "Industry-leading 5% Commission Rates" },
                { title: "Advanced Tech", desc: "State-of-the-art Order Management" },
                { title: "Visual Support", desc: "Professional Product Photography Assistance" },
                { title: "Fast Payouts", desc: "Secure & Bi-weekly Payouts Guaranteed" },
                { title: "Growth Tools", desc: "Real-time Analytics & Marketing Engine" }
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-accent/[0.03] transition-colors duration-500">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                    <FiCheckCircle size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-secondery font-black text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-secondery/50 text-xs font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Reduced & Refined Growth Card */}
          <div className="flex-1 relative w-full max-w-md">
            <div className="w-full aspect-[4/5] bg-secondery rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative group">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent opacity-30"></div>
               
               <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-accent font-black uppercase tracking-[0.4em] text-[8px]">Dashboard Preview</p>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-none italic">
                      Growth <br/> <span className="text-accent not-italic">Starts Here</span>
                    </h3>
                  </div>

                  {/* Micro Stats inside the card */}
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                      <p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Monthly Traffic</p>
                      <div className="flex items-end gap-2">
                        <span className="text-white text-2xl font-black">1.2M+</span>
                        <span className="text-accent text-[10px] font-bold mb-1">↑ 24%</span>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                      <p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Conversion Rate</p>
                      <div className="flex items-end gap-2">
                        <span className="text-white text-2xl font-black">4.8%</span>
                        <span className="text-accent text-[10px] font-bold mb-1">↑ 12%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/30 text-[9px] font-medium leading-relaxed italic">
                      "Since joining CBC, our sales have grown by 300% in the first quarter."
                    </p>
                  </div>
               </div>
            </div>

            {/* Floating Satisfaction Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-primary/20 animate-float">
               <p className="text-accent text-3xl font-black italic tracking-tighter">98%</p>
               <p className="text-secondery/40 text-[8px] font-black uppercase tracking-widest mt-1">Merchant Happiness</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA - Premium Dark Aesthetic Update */}
      <div className="w-full py-40 flex flex-col items-center text-center px-6 relative overflow-hidden bg-secondery">
        {/* Dark Mode Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           {/* Artistic Angled Watermark */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 text-[35vw] font-black text-white/[0.015] select-none -rotate-[15deg] tracking-tighter uppercase leading-none">
             CBC
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]"></div>
           <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <span className="text-accent font-black uppercase tracking-[0.6em] text-[10px] block">Start Your Journey</span>
            <h2 className="text-white text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              Ready to <span className="text-accent italic font-serif">Expand Your Reach?</span>
            </h2>
          </div>
          
          <p className="text-white/40 text-sm lg:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Join our exclusive ecosystem of luxury beauty brands and start your digital success story with Crystal Beauty Clear today.
          </p>

          <div className="pt-8">
            <Link to="/contact" className="group relative inline-flex items-center gap-6 bg-accent text-white px-16 py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 hover:bg-white hover:text-secondery shadow-[0_30px_60px_rgba(255,144,19,0.3)] hover:scale-105 active:scale-95">
              Contact Merchant Support
              <div className="w-8 h-[1px] bg-white group-hover:bg-secondery transition-colors"></div>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </div>
      {/* Step Details Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-secondery/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-secondery border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-slideUp">
            <div className="p-12 relative">
              <button 
                onClick={() => setSelectedStep(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent transition-colors"
              >
                ✕
              </button>
              
              <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mb-8">
                <div className="text-accent">
                  {React.cloneElement(selectedStep.icon, { size: 40 })}
                </div>
              </div>
              
              <h3 className="text-white text-3xl font-black uppercase tracking-tight mb-6">{selectedStep.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                {selectedStep.details}
              </p>
              
              <button 
                onClick={() => setSelectedStep(null)}
                className="w-full py-5 bg-accent text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-white hover:text-secondery transition-all"
              >
                Got It, Thanks
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Seller Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondery/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-[420px] rounded-[2rem] shadow-2xl overflow-hidden relative border border-white/20">
            <button 
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 text-secondery/40 hover:text-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="mb-6 text-center">
                <span className="text-accent font-black uppercase tracking-[0.3em] text-[8px]">Merchant Onboarding</span>
                <h3 className="text-secondery text-xl font-black uppercase tracking-tighter mt-1">
                  Apply to <span className="text-accent italic font-serif">Partner</span>
                </h3>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondery/80">Full Name</label>
                    <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-transparent border-b border-secondery/10 px-0 py-2 text-xs font-bold text-black focus:border-accent focus:ring-0 transition-all outline-none placeholder:text-gray-400" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondery/80">Brand Name</label>
                    <input type="text" required value={formData.brandName} onChange={(e) => setFormData({...formData, brandName: e.target.value})} className="w-full bg-transparent border-b border-secondery/10 px-0 py-2 text-xs font-bold text-black focus:border-accent focus:ring-0 transition-all outline-none placeholder:text-gray-400" placeholder="Luxe Beauty" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondery/80">Business Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-secondery/10 px-0 py-2 text-xs font-bold text-black focus:border-accent focus:ring-0 transition-all outline-none placeholder:text-gray-400" placeholder="partner@brand.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondery/80">Product Category</label>
                  <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border-b border-secondery/10 px-0 py-2 text-xs font-bold text-black focus:border-accent focus:ring-0 transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-400">Select a Category</option>
                    <option value="skincare">Skincare</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="fragrance">Fragrance</option>
                    <option value="haircare">Haircare</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondery/80">Brand Vision</label>
                  <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-secondery/10 px-0 py-2 text-xs font-bold text-black focus:border-accent focus:ring-0 transition-all outline-none min-h-[60px] resize-none placeholder:text-gray-400" placeholder="Share your vision with us..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-secondery text-white py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[9px] hover:bg-accent transition-all shadow-lg hover:shadow-accent/20 mt-4 group disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeSeller;
