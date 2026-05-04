import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import Loader from "../../Components/Loader";
import { FaArrowRight, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaShieldAlt, FaLeaf, FaMagic, FaTruck, FaUndo, FaHeadset, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Fetch products
    axios
      .get(import.meta.env.VITE_API_URL + "/api/Product")
      .then((res) => {
        setProducts(res.data.slice(0, 4));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    // Fetch System Config
    axios
      .get(import.meta.env.VITE_API_URL + "/api/SystemConfig")
      .then((res) => setConfig(res.data))
      .catch((err) => console.error("Config fetch error:", err));
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* ... Hero Section code ... */}
      <section className="w-full h-[600px] bg-secondery flex items-center px-10 relative overflow-hidden">
        {/* Hero Section Content */}
        <div className="z-20 max-w-3xl text-white relative">
          <div className="space-y-2 mb-8">
            <h2 className="text-accent font-bold tracking-[0.3em] uppercase text-xs lg:text-sm animate-fadeIn">Premium Skincare</h2>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1] animate-fadeIn">
              Crystal <br/>
              <span className="text-accent italic drop-shadow-[0_0_20px_rgba(255,144,19,0.5)]">Beauty</span> <br/>
              Clear
            </h1>
          </div>
          <p className="text-lg lg:text-xl text-primary/70 mb-10 max-w-lg leading-relaxed animate-fadeIn delay-200">
            Discover your natural glow with our meticulously curated collection. 
            Pure ingredients for a flawless, crystal-clear transformation.
          </p>
          <Link
            to="/product"
            className="bg-accent text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 w-fit hover:bg-accent/90 transition transform hover:scale-105 shadow-[0_20px_40px_rgba(255,144,19,0.3)]"
          >
            Shop Collection <FaArrowRight />
          </Link>
        </div>

        {/* Hero Image */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] z-10 animate-float hidden lg:block">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[15rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12">
               CBC
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"></div>
            <img
              src="/img1.png"
              alt="Hero"
              className="w-full h-full object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-transform duration-1000 relative z-10"
            />
          </div>
        </div>

        <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"></div>
        <div className="absolute left-[-5%] bottom-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-10 bg-primary">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-secondery">
              Featured Products
            </h2>
            <div className="w-20 h-1 bg-accent mt-2"></div>
          </div>
          <Link
            to="/product"
            className="text-accent font-medium hover:underline flex items-center gap-1"
          >
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Dynamic Ad Banner - Added between Products and Benefits */}
      {config?.middleAdBanner && (
        <section className="w-full px-10 mb-16 animate-fadeIn">
          <div className="w-full max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 group">
            <img 
              src={config.middleAdBanner} 
              alt="Promotion" 
              className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700" 
            />
          </div>
        </section>
      )}


      {/* Benefits Section - Crystal Glass Style */}
      <section className="py-20 px-10 relative overflow-hidden bg-secondery min-h-[500px] flex items-center">
        {/* Decorative background blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center transform hover:-translate-y-3 transition duration-500 group">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 group-hover:rotate-12 transition-transform duration-500">
              <FaLeaf className="text-accent text-4xl -rotate-3 group-hover:-rotate-12 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Natural Ingredients</h3>
            <p className="text-primary/70 leading-relaxed text-lg">
              Only the purest natural elements go into our products for your skin's health.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center transform hover:-translate-y-3 transition duration-500 group">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-8 -rotate-3 group-hover:-rotate-12 transition-transform duration-500">
              <FaShieldAlt className="text-accent text-4xl rotate-3 group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Dermatologist Tested</h3>
            <p className="text-primary/70 leading-relaxed text-lg">
              Rigorous testing ensures our collection is safe and effective for all skin types.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center transform hover:-translate-y-3 transition duration-500 group">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <FaMagic className="text-accent text-4xl -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Cruelty Free</h3>
            <p className="text-primary/70 leading-relaxed text-lg">
              We never test on animals. Experience premium beauty without any compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Info Section - Daraz Style */}
      <section className="bg-white pt-20 pb-10 px-10 border-t border-primary/30">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <h4 className="text-secondery font-bold text-xl relative inline-block">
                Customer Care
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h4>
              <ul className="space-y-4 text-secondery/70">
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>Help Center</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>How to Buy</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>Returns & Refunds</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>Contact Us</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-secondery font-bold text-xl relative inline-block">
                Crystal Beauty
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h4>
              <ul className="space-y-4 text-secondery/70">
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>About CBC</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>Careers</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>Terms & Conditions</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/20 p-6 rounded-3xl border border-primary/50">
                <h4 className="text-secondery font-bold text-lg mb-4">Happy Shopping</h4>
                <p className="text-secondery/60 text-sm mb-6">Experience our app on your mobile device.</p>
                <div className="flex flex-col gap-3">
                  <div className="bg-secondery text-white px-5 py-2.5 rounded-xl flex items-center gap-3 hover:bg-secondery/90 transition cursor-pointer">
                    <div className="text-2xl">🍎</div>
                    <div className="text-xs">Download on the <br/><span className="text-sm font-bold">App Store</span></div>
                  </div>
                  <div className="bg-secondery text-white px-5 py-2.5 rounded-xl flex items-center gap-3 hover:bg-secondery/90 transition cursor-pointer">
                    <div className="text-2xl">🤖</div>
                    <div className="text-xs">GET IT ON <br/><span className="text-sm font-bold">Google Play</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-secondery font-bold text-xl mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <Link to="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-md border border-primary/20"><FaFacebook size={20}/></Link>
                <Link to="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-md border border-primary/20"><FaInstagram size={20}/></Link>
                <Link to="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#000000] hover:bg-[#000000] hover:text-white transition-all duration-300 shadow-md border border-primary/20"><FaTwitter size={20}/></Link>
                <Link to="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300 shadow-md border border-primary/20"><FaYoutube size={20}/></Link>
              </div>
              <div className="mt-10">
                 <h5 className="text-secondery font-semibold mb-4">Verified by</h5>
                 <div className="flex items-center gap-4 text-accent text-4xl opacity-70">
                    <FaShieldAlt title="Secure" />
                    <span className="text-sm font-bold text-secondery">PCI DSS<br/>COMPLIANT</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Payment Methods - High-end Strip */}
          <div className="mt-20 bg-primary/40 backdrop-blur-sm border border-primary/50 rounded-[2rem] p-8 flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <h4 className="text-secondery/60 text-xl font-bold tracking-tight">Payment Methods</h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-[#1a1f71] rounded flex items-center justify-center text-white text-2xl shadow-sm hover:scale-110 transition-transform cursor-help" title="Visa">
                  <FaCcVisa />
                </div>
                <div className="w-12 h-8 bg-[#eb001b] rounded flex items-center justify-center text-white text-2xl shadow-sm hover:scale-110 transition-transform cursor-help" title="Mastercard">
                  <FaCcMastercard />
                </div>
                <div className="w-12 h-8 bg-[#007bc1] rounded flex items-center justify-center text-white text-2xl shadow-sm hover:scale-110 transition-transform cursor-help" title="American Express">
                  <FaCcAmex />
                </div>
              </div>
            </div>
            
            <div className="px-6 py-3 border-2 border-accent/20 rounded-xl text-accent text-sm font-black tracking-widest bg-white/50 shadow-sm hover:bg-accent hover:text-white transition-all cursor-pointer uppercase">
              Cash on Delivery Available
            </div>
          </div>

          {/* SEO / About Text Section */}
          <div className="mt-16 text-secondery/60 text-sm leading-relaxed max-w-5xl">
            <h2 className="text-secondery font-bold text-lg mb-4">Premium Skincare in Sri Lanka - Crystal Beauty Clear</h2>
            <p className="mb-4">
              Discover the ultimate destination for premium skincare in Sri Lanka. At Crystal Beauty Clear, we believe that everyone deserves to glow with confidence. Our collection is meticulously curated with 100% natural ingredients, ensuring your skin receives the purest care it deserves. Whether you're looking for hydrating serums, rejuvenating creams, or gentle cleansers, we have the perfect solution for all skin types.
            </p>
            <p className="mb-4">
              Why choose Crystal Beauty Clear? We prioritize quality and safety above all else. Every product in our catalog is dermatologist-tested and proven to deliver results. We are proud to be a 100% cruelty-free brand, because we believe beauty should never come at the cost of our animal friends. Our commitment to excellence has made us one of the fastest-growing beauty brands in the region.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div>
                <h5 className="font-bold text-secondery mb-2">TOP CATEGORIES</h5>
                <ul className="space-y-1">
                  <li>Facial Care</li>
                  <li>Body Lotions</li>
                  <li>Night Creams</li>
                  <li>Sun Protection</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-secondery mb-2">TRENDING</h5>
                <ul className="space-y-1">
                  <li>Vitamin C Serum</li>
                  <li>Aloe Vera Gel</li>
                  <li>Glow Boosters</li>
                  <li>Clay Masks</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-secondery mb-2">QUICK LINKS</h5>
                <ul className="space-y-1">
                  <li>Shop All</li>
                  <li>New Arrivals</li>
                  <li>Best Sellers</li>
                  <li>Gift Cards</li>
                </ul>
              </div>
              <div>
                 <h5 className="font-bold text-secondery mb-2">INTERNATIONAL</h5>
                 <div className="flex gap-2 opacity-50">
                    <span title="Sri Lanka">🇱🇰</span>
                    <span title="India">🇮🇳</span>
                    <span title="Dubai">🇦🇪</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-primary/20 flex justify-between items-center text-secondery/50 text-xs">
            <p>© Crystal Beauty Clear 2026. All Rights Reserved.</p>
            <div className="flex gap-6">
               <Link to="#" className="hover:text-accent transition">Privacy Policy</Link>
               <Link to="#" className="hover:text-accent transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
