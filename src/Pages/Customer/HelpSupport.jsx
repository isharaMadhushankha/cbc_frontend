import React, { useState } from "react";
import axios from "axios";
import { 
  FiSearch, FiTruck, FiCreditCard, FiRefreshCw, FiUser, 
  FiMessageCircle, FiChevronDown, FiMail, FiPhone, FiInfo, FiZap 
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const HelpSupport = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = React.useRef(null);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [emailFormData, setEmailFormData] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (isChatOpen && token) {
        fetchChatHistory();
    }
  }, [isChatOpen]);

  React.useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Consultation/my`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setChatMessages(response.data.messages || []);
    } catch (error) {
        console.error("Failed to load chat history");
    }
  };

  const handleSendInquiry = async (e) => {
    e.preventDefault();
    if (!emailFormData.name || !emailFormData.email || !emailFormData.message) {
        toast.error("Please fill all fields");
        return;
    }

    const toastId = toast.loading("Sending inquiry...");

    try {
        // 1. Send to Web3Forms (for Direct Email to your Inbox)
        const web3FormData = new FormData();
        web3FormData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
        web3FormData.append("name", emailFormData.name);
        web3FormData.append("email", emailFormData.email);
        web3FormData.append("message", emailFormData.message);
        web3FormData.append("from_name", "CBC Boutique Customer");
        web3FormData.append("subject", `New Boutique Inquiry from ${emailFormData.name}`);

        await axios.post("https://api.web3forms.com/submit", web3FormData);

        // 2. Save to your Backend (for Admin Panel view)
        await axios.post(`${API_URL}/api/Inquiry/`, emailFormData);

        toast.success("Inquiry sent successfully to Inbox & Admin!", { id: toastId });
        setIsEmailOpen(false);
        setEmailFormData({ name: "", email: "", message: "" });
    } catch (error) {
        toast.error("Failed to send inquiry. Try again later.", { id: toastId });
    }
  };

  const handleUserSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || !token) return;

    try {
        const response = await axios.post(`${API_URL}/api/Consultation/send`, 
            { message: chatInput },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setChatMessages(response.data.messages);
        setChatInput("");
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Failed to send message. Please login.";
        toast.error(errorMsg);
    }
  };

  const categories = [
    { 
      id: "shipping",
      icon: <FiTruck />, 
      title: "Shipping & Delivery", 
      desc: "Track orders & shipping updates",
      color: "bg-blue-500/10 text-blue-600",
      details: [
        { 
            title: "Track My Order", 
            link: "/orders", 
            desc: "Get real-time updates on your package location.",
            content: "To track your order, please visit your 'Orders' page. Each order will display its current status (Pending, Shipped, Delivered). Once shipped, a tracking number will be provided by our courier partner."
        },
        { 
            title: "Delivery Times", 
            link: "#", 
            desc: "Estimated delivery schedules for all regions.",
            content: "• Western Province: 1-2 business days\n• Other Provinces: 3-5 business days\n• International: 7-14 business days depending on location.\nNote: Orders placed after 2 PM will be processed the next business day."
        },
        { 
            title: "International Shipping", 
            link: "#", 
            desc: "Shipping rates and times for 50+ countries.",
            content: "We ship to over 50 countries via express courier. International customers are responsible for any customs duties or taxes applied by their local government. Average shipping cost for international orders is $25-$45."
        },
        { 
            title: "Shipping Costs", 
            link: "#", 
            desc: "How we calculate shipping and handling fees.",
            content: "• Standard Shipping: LKR 350 flat rate\n• Orders over LKR 10,000: FREE Shipping\n• Express Delivery: LKR 600 (Colombo only)\nShipping costs are calculated at checkout based on your delivery address."
        }
      ]
    },
    { 
      id: "payments",
      icon: <FiCreditCard />, 
      title: "Payments & Refunds", 
      desc: "Billing, invoices & money back",
      color: "bg-emerald-500/10 text-emerald-600",
      details: [
        { 
            title: "Payment Methods", 
            link: "#", 
            desc: "Credit cards, bank transfers, and digital wallets.",
            content: "We accept Visa, Mastercard, AMEX, and Koko. You can also pay via Bank Transfer or Cash on Delivery (selected regions). All online payments are processed securely through PayHere."
        },
        { 
            title: "Refund Status", 
            link: "#", 
            desc: "How to check the status of your refund.",
            content: "Refunds typically take 5-10 business days to reflect in your account once approved. You will receive an automated email as soon as the refund is initiated from our side."
        },
        { 
            title: "Invoices", 
            link: "#", 
            desc: "Downloading and managing your billing documents.",
            content: "Digital invoices are sent to your registered email immediately after purchase. You can also download them from the 'Order History' section in your user profile."
        },
        { 
            title: "Secure Payments", 
            link: "#", 
            desc: "Our commitment to protecting your financial data.",
            content: "Your security is our priority. We use 256-bit SSL encryption and never store your CVV or full credit card numbers on our servers."
        }
      ]
    },
    { 
      id: "returns",
      icon: <FiRefreshCw />, 
      title: "Returns & Exchanges", 
      desc: "Hassle-free return process",
      color: "bg-amber-500/10 text-amber-600",
      details: [
        { 
            title: "Start a Return", 
            link: "#", 
            desc: "Easy step-by-step guide to return your items.",
            content: "1. Log into your account.\n2. Go to 'Orders'.\n3. Select 'Return Item'.\n4. Follow the prompts to schedule a pickup or drop-off."
        },
        { 
            title: "Return Policy", 
            link: "#", 
            desc: "Detailed rules for returns and exchanges.",
            content: "Items must be returned within 7 days of delivery. Products must be unopened, unused, and in original packaging for a full refund or exchange."
        },
        { 
            title: "Damaged Items", 
            link: "#", 
            desc: "What to do if your order arrives damaged.",
            content: "If you receive a damaged item, please contact us within 24 hours of delivery. Take clear photos of the damage and the packaging to speed up the claim process."
        },
        { 
            title: "Exchanging Sizes", 
            link: "#", 
            desc: "How to swap your item for a different size.",
            content: "Exchanges are subject to stock availability. If your preferred size is out of stock, we will issue store credit or a refund as per our policy."
        }
      ]
    },
    { 
      id: "account",
      icon: <FiUser />, 
      title: "Account Security", 
      desc: "Manage profile & privacy",
      color: "bg-purple-500/10 text-purple-600",
      details: [
        { 
            title: "Password Reset", 
            link: "#", 
            desc: "How to recover or change your account password.",
            content: "Click 'Forgot Password' on the login screen. We will send a secure reset link to your registered email address. Link expires in 1 hour."
        },
        { 
            title: "Privacy Settings", 
            link: "#", 
            desc: "Control what data you share with us.",
            content: "You can manage your data preferences in 'Account Settings'. We value your privacy and never sell your personal information to third parties."
        },
        { 
            title: "Profile Updates", 
            link: "#", 
            desc: "Updating your address and contact information.",
            content: "Keep your profile up to date to ensure smooth delivery. Changes to shipping addresses will not affect orders that are already 'Processing' or 'Shipped'."
        },
        { 
            title: "Account Deletion", 
            link: "#", 
            desc: "Understanding the process of closing your account.",
            content: "Account deletion is permanent. All order history, reward points, and saved addresses will be lost. To proceed, please contact our support team."
        }
      ]
    }
  ];

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "For domestic orders in Sri Lanka, delivery typically takes 2-4 business days. International shipping can take 7-14 business days depending on your location. You will receive a tracking number as soon as your order is dispatched."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 7-day hassle-free return policy for unused products in their original packaging. Simply initiate a return request through your account dashboard or contact our support team for assistance."
    },
    {
      q: "Are my payment details secure?",
      a: "Absolutely. We use industry-standard SSL encryption and partner with high-security payment gateways like PayHere to ensure your credit card and personal data are 100% protected. We never store your full card details."
    },
    {
      q: "Can I cancel my order after placing it?",
      a: "Orders can be cancelled within 2 hours of placement. Once the order has entered the 'Processing' stage, we are unable to cancel it as it may have already been dispatched. In such cases, you can follow our return process."
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. All international orders are shipped via express courier for safety and speed."
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeDetail, setActiveDetail] = useState(null);

  // Optimized Search Engine
  const searchResults = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return { categories: categories, articles: [], faqs: [] };

    // 1. Filter Categories
    const filteredCats = categories.filter(cat => 
        cat.title.toLowerCase().includes(query) || 
        cat.desc.toLowerCase().includes(query)
    );

    // 2. Filter Articles (Deep Content)
    const matchingArticles = [];
    categories.forEach(cat => {
        cat.details.forEach(detail => {
            if (
                detail.title.toLowerCase().includes(query) || 
                detail.desc.toLowerCase().includes(query) ||
                (detail.content && detail.content.toLowerCase().includes(query))
            ) {
                matchingArticles.push({ ...detail, parentCat: cat });
            }
        });
    });

    // 3. Filter FAQs
    const filteredFaqs = faqs.filter(faq => 
        faq.q.toLowerCase().includes(query) || 
        faq.a.toLowerCase().includes(query)
    );

    return { 
        categories: filteredCats, 
        articles: matchingArticles,
        faqs: filteredFaqs
    };
  }, [searchQuery, categories, faqs]);

  const { categories: filteredCats, articles: matchingArticles, faqs: filteredFaqs } = searchResults;

  const handleHardSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
        const resultsSection = document.getElementById("search-results-anchor");
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
  };

  const handleSpeakToExpert = () => {
    setSelectedCategory(null);
    setActiveDetail(null);
    setTimeout(() => {
        setIsChatOpen(true);
    }, 300);
  };

  return (
    <>
      <div className={`w-full min-h-screen bg-primary/30 font-sans pb-20 transition-all duration-700 relative overflow-hidden ${selectedCategory ? 'blur-2xl scale-[0.98] brightness-50' : ''}`}>
        
        {/* Hero Section with Mesh Gradient Effect */}
        <div className="relative w-full bg-secondery pt-32 pb-40 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10 max-w-4xl animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6 backdrop-blur-md">
              <FiZap className="animate-pulse" /> Support Center
            </div>
            <h1 className="text-white text-4xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              How can we <span className="text-accent italic">Help you?</span>
            </h1>
            <p className="text-white/50 text-lg lg:text-xl max-w-2xl mx-auto mb-12 font-medium">
              Search our knowledge base or browse categories below to find the answers you need.
            </p>
            
            <form onSubmit={handleHardSearch} className="w-full max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-400 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
              <div className="relative flex items-center">
                  <FiSearch className="absolute left-6 text-white/40 group-focus-within:text-accent transition-colors" size={24} />
                  <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Describe your issue (e.g. tracking order)" 
                      className="w-full h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl pl-16 pr-6 text-white text-lg placeholder:text-white/30 focus:outline-none focus:bg-white/15 focus:border-accent/50 transition-all shadow-2xl"
                  />
                  {searchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-32 text-white/40 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
                      >
                        Clear
                      </button>
                  )}
                  <button type="submit" className="absolute right-4 px-6 py-3 bg-accent text-secondery font-black rounded-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider">
                      Search
                  </button>
              </div>
            </form>
          </div>
        </div>

        {/* Floating Statistics / Quick Info */}
        {!searchQuery && (
            <div className="max-w-6xl mx-auto -mt-16 relative z-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Articles", value: "150+", icon: <FiInfo /> },
                        { label: "Happy Customers", value: "12k+", icon: <FiUser /> },
                        { label: "Response Time", value: "< 2hr", icon: <FiZap /> }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white flex items-center gap-6">
                            <div className="w-12 h-12 bg-secondery text-accent rounded-2xl flex items-center justify-center text-xl shadow-inner">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl font-black text-secondery leading-none">{stat.value}</div>
                                <div className="text-secondery/40 text-[10px] uppercase tracking-widest font-bold">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Dynamic Content Section */}
        <div id="search-results-anchor" className="max-w-7xl mx-auto py-24 px-6 lg:px-12">
          {searchQuery.trim() ? (
              <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-12 border-b border-primary/10 pb-8">
                      <div>
                          <h2 className="text-secondery text-4xl font-black uppercase tracking-tighter mb-2">
                              Search <span className="text-accent italic">Results</span>
                          </h2>
                          <p className="text-secondery/40 font-bold uppercase tracking-widest text-xs">
                              Found {matchingArticles.length} matching articles, {filteredCats.length} categories & {filteredFaqs.length} FAQs
                          </p>
                      </div>
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="text-accent font-black text-[10px] uppercase tracking-[0.2em] hover:underline"
                      >
                        Back to all topics
                      </button>
                  </div>

                  {matchingArticles.length === 0 && filteredCats.length === 0 ? (
                      <div className="py-20 text-center bg-white rounded-[4rem] border border-dashed border-primary/20">
                          <div className="text-accent text-6xl mb-6">🔍</div>
                          <h3 className="text-secondery text-2xl font-black uppercase mb-2">No matches found</h3>
                          <p className="text-secondery/40 font-medium">Try different keywords or contact our support team.</p>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                          {/* Articles Column */}
                          <div className="lg:col-span-2 space-y-6">
                              <h4 className="text-secondery/40 font-black uppercase tracking-widest text-[10px] mb-8">Matching Articles</h4>
                              {matchingArticles.map((article, i) => (
                                  <div 
                                    key={i} 
                                    onClick={() => {
                                        setSelectedCategory(article.parentCat);
                                        setActiveDetail(article);
                                    }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-primary/10 hover:border-accent/30 hover:shadow-xl transition-all cursor-pointer group"
                                  >
                                      <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                              <div className="flex items-center gap-3 mb-3">
                                                  <span className={`px-3 py-1 rounded-full ${article.parentCat.color} text-[8px] font-black uppercase tracking-widest`}>
                                                      {article.parentCat.title}
                                                  </span>
                                              </div>
                                              <h5 className="text-secondery text-xl font-black uppercase tracking-tight group-hover:text-accent transition-colors mb-2">
                                                  {article.title}
                                              </h5>
                                              <p className="text-secondery/40 text-xs font-medium leading-relaxed">
                                                  {article.desc}
                                              </p>
                                          </div>
                                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                              →
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Categories Sidebar */}
                          <div className="space-y-6">
                              <h4 className="text-secondery/40 font-black uppercase tracking-widest text-[10px] mb-8">Related Categories</h4>
                              <div className="grid grid-cols-1 gap-6">
                                  {filteredCats.map((cat, i) => (
                                      <div 
                                        key={i} 
                                        onClick={() => setSelectedCategory(cat)}
                                        className="bg-white p-6 rounded-[2rem] border border-primary/10 hover:border-accent/30 transition-all cursor-pointer flex items-center gap-6"
                                      >
                                          <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                              {React.cloneElement(cat.icon, { size: 24 })}
                                          </div>
                                          <div>
                                              <h6 className="text-secondery font-black uppercase tracking-tight text-sm mb-1">{cat.title}</h6>
                                              <p className="text-secondery/40 text-[10px] font-medium leading-none">{cat.desc}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Matching FAQs in Search */}
                  {filteredFaqs.length > 0 && (
                      <div className="mt-20 pt-20 border-t border-primary/10">
                          <h4 className="text-secondery/40 font-black uppercase tracking-widest text-[10px] mb-8">Relevant FAQs</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {filteredFaqs.map((faq, i) => (
                                  <div key={i} className="bg-white/50 p-8 rounded-[2.5rem] border border-primary/10">
                                      <h5 className="text-secondery font-black uppercase text-sm mb-4">{faq.q}</h5>
                                      <p className="text-secondery/40 text-xs font-medium leading-relaxed">{faq.a}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-secondery text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
                            Browse by <span className="text-accent italic">Category</span>
                        </h2>
                        <p className="text-secondery/50 font-medium">Select a topic to find related articles and common solutions.</p>
                    </div>
                    <button className="px-8 py-4 bg-secondery text-white rounded-2xl font-bold text-sm hover:bg-accent transition-all shadow-lg hover:shadow-accent/20">
                        View All Topics
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {categories.map((cat, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedCategory(cat)}
                      className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-transparent hover:border-accent/20 transition-all duration-500 hover:-translate-y-3 group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                      
                      <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                        {React.cloneElement(cat.icon, { size: 32 })}
                      </div>
                      <h3 className="text-secondery text-xl font-black uppercase tracking-tight mb-3 relative z-10">{cat.title}</h3>
                      <p className="text-secondery/40 text-xs font-medium leading-relaxed relative z-10">{cat.desc}</p>
                      
                      <div className="mt-8 flex items-center text-accent font-black text-[10px] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-500">
                        Learn More <span className="text-lg">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
          )}
        </div>

        {/* Cinematic Dark FAQ Section */}
        <div className="relative w-full bg-secondery py-32 overflow-hidden">
            {/* Boutique Watermark Specific to this section */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none">
                <div className="text-[55vw] font-serif font-black text-white/[0.02] rotate-[-12deg] tracking-tighter leading-none whitespace-nowrap animate-pulse">
                    CBC
                </div>
            </div>

            {/* Ambient Light Orbs */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] uppercase tracking-[0.4em] font-black mb-8 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Intelligence Hub
                    </div>
                    <h2 className="text-white text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
                        Deep <span className="text-accent italic">Insights</span>
                    </h2>
                    <p className="text-white/40 font-medium max-w-2xl text-lg leading-relaxed">
                        Explore our comprehensive knowledge base designed for the modern luxury experience. 
                        Precision support at your fingertips.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {faqs.map((faq, i) => (
                    <div 
                        key={i} 
                        style={{ animationDelay: `${i * 150}ms` }}
                        className={`group relative bg-white/5 backdrop-blur-2xl rounded-[3.5rem] border border-white/10 transition-all duration-700 animate-fadeInUp ${
                            activeFaq === i 
                            ? 'bg-white/[0.08] border-accent/50 shadow-[0_40px_100px_rgba(0,0,0,0.5)] -translate-y-2' 
                            : 'hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-1'
                        }`}
                    >
                        {/* Glowing Corner Effect */}
                        <div className={`absolute -inset-px rounded-[3.5rem] bg-gradient-to-br from-accent/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 ${activeFaq === i ? 'opacity-100' : 'group-hover:opacity-40'}`}></div>

                        {/* FAQ Header - Separate Trigger */}
                        <button 
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="relative w-full p-12 flex items-start gap-8 text-left z-10"
                        >
                            <div className="shrink-0 pt-1">
                                <div className={`text-5xl font-black italic tracking-tighter transition-all duration-500 ${activeFaq === i ? 'text-accent scale-110' : 'text-white/10 group-hover:text-white/20'}`}>
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className={`text-xl lg:text-2xl font-black uppercase tracking-tight transition-all duration-500 ${activeFaq === i ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                                    {faq.q}
                                </h3>
                            </div>

                            <div className={`mt-2 w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-500 ${activeFaq === i ? 'bg-accent border-accent text-secondery rotate-180 shadow-[0_0_20px_rgba(255,165,0,0.4)]' : 'bg-white/5 text-white/30 group-hover:border-accent group-hover:text-accent'}`}>
                                <FiChevronDown size={22} />
                            </div>
                        </button>

                        {/* FAQ Content - Sibling to the trigger button */}
                        <div className={`relative z-10 px-12 pb-12 ml-24 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${activeFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="w-12 h-1 bg-accent/50 rounded-full mb-8"></div>
                            <p className="text-white/50 text-base lg:text-lg leading-relaxed font-medium pr-4">
                                {faq.a}
                            </p>
                            <div className="mt-10 flex items-center gap-6">
                                <button 
                                    type="button"
                                    className="px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/5"
                                >
                                    Helpful
                                </button>
                                <button 
                                    type="button"
                                    className="text-white/20 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Documentation
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Contact Support Channels */}
        <div id="contact-support" className="max-w-7xl mx-auto py-24 px-6 lg:px-12 text-center">
          <h2 className="text-secondery text-4xl font-black uppercase tracking-tighter mb-16">
              Still need <span className="text-accent italic">Help?</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <FiMessageCircle />, 
                title: "Live Chat", 
                desc: "Instant support from our beauty experts.", 
                cta: "Start Chat Now",
                contact: "Available 24/7"
              },
              { 
                icon: <FiMail />, 
                title: "Email Support", 
                desc: "We typically respond within 12 business hours.", 
                cta: "Send an Email",
                contact: "support@cbc.lk"
              },
              { 
                icon: <FiPhone />, 
                title: "Phone Support", 
                desc: "Talk to us directly for urgent matters.", 
                cta: "Call +94 11 234 5678",
                contact: "Mon-Fri, 9am - 6pm"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-12 bg-white rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-primary/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 group">
                  <div className="w-20 h-20 bg-primary/20 rounded-[2rem] shadow-inner flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                      {React.cloneElement(item.icon, { size: 32 })}
                  </div>
                  <h4 className="text-secondery text-2xl font-black uppercase tracking-tight mb-3">{item.title}</h4>
                  <p className="text-secondery/50 text-sm font-medium mb-8 leading-relaxed px-4">{item.desc}</p>
                  
                  <div className="w-full space-y-4">
                      <button 
                        onClick={() => {
                            if (i === 0) setIsChatOpen(true);
                            if (i === 1) setIsEmailOpen(true);
                            if (i === 2) window.location.href = "tel:+94112345678";
                        }}
                        className="w-full py-4 bg-secondery text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-lg shadow-secondery/10 group-hover:shadow-accent/20"
                      >
                          {item.cta}
                      </button>
                      <p className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">{item.contact}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-accent rounded-[3.5rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 group">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              <div className="relative z-10 text-center lg:text-left">
                  <h2 className="text-secondery text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                      Ready to <span className="text-white">Shop?</span>
                  </h2>
                  <p className="text-secondery/70 font-bold uppercase tracking-widest text-xs">Explore our latest beauty collections</p>
              </div>
              <Link 
                to="/product"
                className="relative z-10 px-12 py-6 bg-secondery text-white rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-secondery transition-all duration-500 shadow-2xl hover:shadow-white/20 transform hover:scale-105 inline-block text-center"
              >
                  Go to Shop
              </Link>
          </div>
        </div>
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-secondery/20 backdrop-blur-md animate-fadeIn">
            <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden relative border border-white/50 animate-float">
                <button 
                    onClick={() => {
                        setSelectedCategory(null);
                        setActiveDetail(null);
                    }}
                    className="absolute top-8 right-8 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-secondery hover:bg-accent hover:text-white transition-all z-20"
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                    <div className={`lg:col-span-2 p-12 flex flex-col justify-center items-center text-center ${selectedCategory.color} relative overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="relative z-10 scale-150 mb-12">
                            {React.cloneElement(selectedCategory.icon, { size: 48 })}
                        </div>
                        <h2 className="text-secondery text-3xl font-black uppercase tracking-tight mb-4 relative z-10">{selectedCategory.title}</h2>
                        <p className="text-secondery/60 text-sm font-medium relative z-10 px-4">{selectedCategory.desc}</p>
                    </div>

                    <div className="lg:col-span-3 p-12 lg:p-16 overflow-y-auto max-h-[70vh] custom-scrollbar bg-white relative">
                        {activeDetail ? (
                            <div className="animate-fadeIn">
                                <button 
                                    onClick={() => setActiveDetail(null)}
                                    className="text-accent font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-8 hover:translate-x-[-5px] transition-transform"
                                >
                                    ← Back to Topics
                                </button>
                                <h3 className="text-secondery text-2xl font-black uppercase tracking-tight mb-6">{activeDetail.title}</h3>
                                <div className="text-secondery/60 text-sm font-medium leading-relaxed whitespace-pre-line bg-primary/10 p-8 rounded-[2rem] border border-primary/20">
                                    {activeDetail.content}
                                </div>
                                <button 
                                    onClick={handleSpeakToExpert}
                                    className="w-full mt-10 py-5 bg-secondery text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl shadow-secondery/10"
                                >
                                    Still need help? Speak to us
                                </button>
                            </div>
                        ) : (
                            <>
                                <h4 className="text-secondery text-[10px] uppercase tracking-[0.3em] font-black mb-8 opacity-40">Specific Sub-Topics</h4>
                                <div className="space-y-8">
                                    {selectedCategory.details.map((detail, idx) => (
                                        <div 
                                            key={idx} 
                                            className="group cursor-pointer"
                                            onClick={() => {
                                                if(detail.link !== "#") {
                                                    window.location.href = detail.link;
                                                } else {
                                                    setActiveDetail(detail);
                                                }
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h5 className="text-secondery font-black uppercase tracking-tight text-lg group-hover:text-accent transition-colors">{detail.title}</h5>
                                                <span className="text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                                            </div>
                                            <p className="text-secondery/40 text-xs font-medium leading-relaxed">{detail.desc}</p>
                                            <div className="w-full h-px bg-primary/20 mt-6 group-hover:bg-accent/20 transition-colors"></div>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={handleSpeakToExpert}
                                    className="w-full mt-12 py-5 bg-secondery text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl shadow-secondery/10"
                                >
                                    Speak to an Expert
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Email Support Modal - Modern & Compact */}
      {isEmailOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-secondery/40 backdrop-blur-xl animate-fadeIn">
            <div className="bg-white/95 w-full max-w-lg rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden relative border border-white/50 animate-float">
                {/* Close Button */}
                <button 
                    onClick={() => setIsEmailOpen(false)}
                    className="absolute top-6 right-6 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-secondery hover:bg-accent hover:text-white transition-all z-20 text-xs"
                >
                    ✕
                </button>

                <div className="p-10 lg:p-12">
                    <div className="flex items-center gap-5 mb-8">
                        <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-secondery shadow-lg shadow-accent/20">
                            <FiMail size={24} />
                        </div>
                        <div>
                            <h2 className="text-secondery text-2xl font-black uppercase tracking-tight">Email Support</h2>
                            <p className="text-accent text-[9px] font-black uppercase tracking-[0.2em]">Boutique Inquiry Service</p>
                        </div>
                    </div>

                    <form onSubmit={handleSendInquiry} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-secondery/40 uppercase tracking-widest ml-3">Full Name</label>
                                <input 
                                    type="text" 
                                    value={emailFormData.name}
                                    onChange={(e) => setEmailFormData({...emailFormData, name: e.target.value})}
                                    placeholder="Enter name"
                                    className="w-full bg-primary/10 h-12 rounded-xl px-5 text-sm font-bold focus:outline-none focus:bg-primary/20 transition-all border-l-4 border-transparent focus:border-accent"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-secondery/40 uppercase tracking-widest ml-3">Email Address</label>
                                <input 
                                    type="email" 
                                    value={emailFormData.email}
                                    onChange={(e) => setEmailFormData({...emailFormData, email: e.target.value})}
                                    placeholder="your@email.com"
                                    className="w-full bg-primary/10 h-12 rounded-xl px-5 text-sm font-bold focus:outline-none focus:bg-primary/20 transition-all border-l-4 border-transparent focus:border-accent"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-secondery/40 uppercase tracking-widest ml-3">How can we help?</label>
                            <textarea 
                                rows="4"
                                value={emailFormData.message}
                                onChange={(e) => setEmailFormData({...emailFormData, message: e.target.value})}
                                placeholder="Tell us more about your inquiry..."
                                className="w-full bg-primary/10 rounded-2xl p-6 text-sm font-bold focus:outline-none focus:bg-primary/20 transition-all border-l-4 border-transparent focus:border-accent resize-none"
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-5 bg-secondery text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-accent transition-all shadow-xl shadow-secondery/10 hover:shadow-accent/30 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                        >
                            Send Inquiry Now
                            <span className="text-lg">→</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
      )}

      {/* Chat Backdrop Overlay */}
      <div 
        onClick={() => setIsChatOpen(false)}
        className={`fixed inset-0 z-[140] bg-secondery/60 backdrop-blur-md transition-all duration-700 ${isChatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>

      {/* Boutique Live Chat Overlay - Compact Version */}
      <div className={`fixed bottom-6 right-6 z-[150] transition-all duration-700 transform ${isChatOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'}`}>
          <div className="bg-white w-[360px] rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-primary/10 overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="bg-secondery p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="relative">
                          <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=80&h=80" 
                            alt="Consultant" 
                            className="w-10 h-10 rounded-2xl object-cover border-2 border-accent"
                          />
                          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[3px] border-secondery animate-pulse"></div>
                      </div>
                      <div>
                          <h4 className="text-white font-black uppercase tracking-tight text-xs">Consultant</h4>
                          <p className="text-accent text-[8px] font-black uppercase tracking-widest">Boutique Expert</p>
                      </div>
                  </div>
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-accent transition-all text-xs"
                  >
                      ✕
                  </button>
              </div>

              {/* Chat Messages - Optimized Height */}
              <div className="h-[320px] p-6 overflow-y-auto custom-scrollbar bg-primary/5 flex flex-col gap-5">
                  {chatMessages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full opacity-30">
                          <FiMessageCircle size={40} className="mb-2" />
                          <p className="text-[10px] font-black uppercase tracking-widest">No messages yet</p>
                      </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                        <div 
                            key={i} 
                            className={`flex flex-col ${msg.sender === "admin" ? 'items-start' : 'items-end'} w-full`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-[1.2rem] shadow-sm ${
                                msg.sender === "admin" 
                                ? 'bg-white text-secondery rounded-tl-none border border-primary/10' 
                                : 'bg-accent text-secondery rounded-tr-none shadow-md'
                            }`}>
                                <p className={`text-[13px] ${msg.sender === "admin" ? 'font-medium' : 'font-black'} leading-relaxed`}>
                                    {msg.message}
                                </p>
                                <span className={`text-[8px] font-black uppercase mt-1.5 block ${msg.sender === "admin" ? 'text-secondery/30' : 'text-secondery/40'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
              </div>

              {/* Chat Input - Compact */}
              <form onSubmit={handleUserSendMessage} className="p-4 bg-white border-t border-primary/10 flex items-center gap-3">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message..." 
                    className="flex-1 bg-primary/10 h-12 rounded-xl px-5 text-[13px] font-medium focus:outline-none focus:bg-primary/20 transition-all"
                  />
                  <button 
                    type="submit"
                    className="w-12 h-12 bg-accent text-secondery rounded-xl flex items-center justify-center hover:bg-secondery hover:text-white transition-all shadow-lg shadow-accent/20"
                  >
                      →
                  </button>
              </form>
          </div>
      </div>
    </>
  );
};

export default HelpSupport;
