import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import Loader from "../../Components/Loader";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaShieldAlt,
  FaLeaf,
  FaMagic,
  FaTruck,
  FaUndo,
  FaHeadset,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

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
      <section className="w-full h-[600px] bg-secondery flex items-start pt-10 px-10 relative overflow-hidden">
        {/* Hero Section Content */}
        <div className="z-20 max-w-3xl text-white relative">
          <div className="space-y-2 mb-4">
            <h2 className="text-accent font-bold tracking-[0.3em] uppercase text-xs lg:text-sm animate-fadeIn">
              Premium Skincare
            </h2>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1] animate-fadeIn">
              Crystal <br />
              <span className="text-accent italic drop-shadow-[0_0_20px_rgba(255,144,19,0.5)]">
                Beauty
              </span>{" "}
              <br />
              Clear
            </h1>
          </div>
          <p className="text-lg lg:text-xl text-primary/70 mb-4 max-w-lg leading-relaxed animate-fadeIn delay-200">
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

      {/* Featured Products Section - Premium Grid */}
      <section className="py-24 px-10 bg-primary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h5 className="text-accent font-black tracking-[0.3em] uppercase text-xs">
                Our Collection
              </h5>
              <h2 className="text-4xl lg:text-5xl font-bold text-secondery">
                Featured{" "}
                <span className="text-accent italic font-serif">Products</span>
              </h2>
            </div>
            <Link
              to="/product"
              className="group text-secondery font-bold flex items-center gap-2 hover:text-accent transition-colors"
            >
              Explore All{" "}
              <div className="w-8 h-8 rounded-full bg-secondery group-hover:bg-accent flex items-center justify-center text-white transition-all">
                <FaArrowRight size={12} />
              </div>
            </Link>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
        </div>
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

      {/* Core Values Section - Premium Animated Style */}
      <section className="py-24 px-10 relative overflow-hidden bg-secondery">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h5 className="text-accent font-black tracking-[0.3em] uppercase text-xs animate-fadeIn">
                Our Principles
              </h5>
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-none">
                Our Core{" "}
                <span className="text-accent italic font-serif">Values</span>
              </h2>
            </div>
            <p className="text-primary/40 text-sm max-w-xs md:text-right leading-relaxed">
              The foundational principles that guide every formula we create and
              every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 01 */}
            <div className="group relative backdrop-blur-2xl bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:bg-white/[0.08] overflow-hidden">
              {/* Watermark Number */}
              <div className="absolute top-4 right-8 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-700">
                01
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(255,144,19,0.2)] group-hover:shadow-[0_0_60px_rgba(255,144,19,0.4)] group-hover:scale-110 transition-all duration-500">
                  <FaLeaf className="text-accent text-4xl" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                  100% Natural
                </h3>
                <p className="text-primary/60 leading-relaxed text-lg">
                  We source only the finest botanicals and pure elements for
                  your skin.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="group relative backdrop-blur-2xl bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:bg-white/[0.08] overflow-hidden">
              <div className="absolute top-4 right-8 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-700">
                02
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(255,144,19,0.2)] group-hover:shadow-[0_0_60px_rgba(255,144,19,0.4)] group-hover:scale-110 transition-all duration-500">
                  <FaShieldAlt className="text-accent text-4xl" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                  Science Backed
                </h3>
                <p className="text-primary/60 leading-relaxed text-lg">
                  Our products are dermatologist-tested and clinically proven
                  for safety.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="group relative backdrop-blur-2xl bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:bg-white/[0.08] overflow-hidden">
              <div className="absolute top-4 right-8 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-700">
                03
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(255,144,19,0.2)] group-hover:shadow-[0_0_60px_rgba(255,144,19,0.4)] group-hover:scale-110 transition-all duration-500">
                  <FaMagic className="text-accent text-4xl" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                  Cruelty Free
                </h3>
                <p className="text-primary/60 leading-relaxed text-lg">
                  We never test on animals, ensuring the highest ethical beauty
                  standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info Section - Premium Dark Style */}
      <section className="bg-secondery pt-24 pb-12 px-10 relative overflow-hidden">
        {/* Modern Watermark Design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden">
          <div className="text-[20rem] lg:text-[35rem] font-black text-white/[0.02] leading-none tracking-tighter uppercase transform -rotate-12 translate-y-20 animate-float opacity-50">
            CBC
          </div>
          <div className="absolute top-20 right-0 text-9xl font-outline text-white/[0.05] rotate-90 origin-right tracking-[2em] hidden lg:block hover:text-white transition-all duration-1000">
            BEAUTY
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-white text-xl">
                  C
                </div>
                <h4 className="text-white font-bold text-2xl tracking-tight italic">
                  CBC{" "}
                  <span className="font-light not-italic opacity-60 text-sm ml-1">
                    Beauty
                  </span>
                </h4>
              </div>
              <p className="text-primary/60 text-sm leading-relaxed max-w-xs">
                Pure, natural, and effective skincare solutions crafted for your
                unique beauty journey.
              </p>
              <div className="flex gap-4">
                <Link
                  to="#"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-[0_8px_20px_rgba(24,119,242,0.4)] transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-[#1877F2]">
                    <FaFacebook size={20} />
                  </span>
                </Link>

                <Link
                  to="#"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-[0_8px_20px_rgba(245,133,41,0.4)] transition-all duration-300 transform hover:scale-110"
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(to top right, #f58529, #dd2a7b, #8134af)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <FaInstagram size={20} />
                  </span>
                </Link>

                <Link
                  to="#"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-[0_8px_20px_rgba(29,161,242,0.4)] transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-[#1DA1F2]">
                    <FaTwitter size={20} />
                  </span>
                </Link>

                <Link
                  to="#"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-[0_8px_20px_rgba(255,0,0,0.4)] transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-[#FF0000]">
                    <FaYoutube size={20} />
                  </span>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg tracking-wide uppercase flex items-center gap-2">
                Customer Care
                <span className="w-8 h-[2px] bg-accent/40"></span>
              </h4>
              <ul className="space-y-4 text-primary/50 text-sm">
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    How to Buy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg tracking-wide uppercase flex items-center gap-2">
                Quick Explore
                <span className="w-8 h-[2px] bg-accent/40"></span>
              </h4>
              <ul className="space-y-4 text-primary/50 text-sm">
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    About CBC
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl">
                <h4 className="text-white font-bold text-lg mb-2">
                  Get the App
                </h4>
                <p className="text-primary/40 text-xs mb-6">
                  Experience our premium catalog on the go.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="#" className="inline-block">
                    <div className="bg-white px-4 py-3 rounded-xl hover:bg-accent transition-all cursor-pointer flex items-center justify-center">
                      <img
                        src="/appleStore.JPG"
                        alt="Download on the App Store"
                        className="h-12 w-auto max-w-[160px] object-contain"
                      />
                    </div>
                  </a>

                  <a href="#" className="inline-block">
                    <div className="bg-white px-4 py-3 rounded-xl hover:bg-accent transition-all cursor-pointer flex items-center justify-center">
                      <img
                        src="/GooglePlay.JPG"
                        alt="Get it on Google Play"
                        className="h-12 w-auto max-w-[160px] object-contain"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Payment and SEO Section - The part from the image */}
          <div className="border-t border-white/10 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-white font-bold text-2xl lg:text-3xl leading-tight">
                  Premium Skincare in Sri Lanka <br />
                  <span className="text-accent italic font-serif">
                    - Crystal Beauty Clear
                  </span>
                </h2>
                <div className="space-y-4 text-primary/60 text-sm leading-relaxed text-justify">
                  <p>
                    Discover the ultimate destination for premium skincare in
                    Sri Lanka. At Crystal Beauty Clear, we believe that everyone
                    deserves to glow with confidence. Our collection is
                    meticulously curated with 100% natural ingredients, ensuring
                    your skin receives the purest care it deserves.
                  </p>
                  <p>
                    Whether you're looking for hydrating serums, rejuvenating
                    creams, or gentle cleansers, we have the perfect solution
                    for all skin types. We prioritize quality and safety above
                    all else. Every product is dermatologist-tested and proven
                    to deliver results.
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex gap-3 text-white/40 text-3xl">
                    <FaCcVisa className="hover:text-white transition-colors" />
                    <FaCcMastercard className="hover:text-white transition-colors" />
                    <FaCcAmex className="hover:text-white transition-colors" />
                  </div>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div className="text-accent text-xs font-black tracking-[0.2em] uppercase px-4 py-2 bg-accent/10 rounded-lg">
                    Cash on Delivery
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h5 className="font-black text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    Categories
                  </h5>
                  <ul className="space-y-2 text-primary/60 text-xs">
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Facial Care
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Body Lotions
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Night Creams
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Sun Protection
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-black text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    Trending
                  </h5>
                  <ul className="space-y-2 text-primary/60 text-xs">
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Vitamin C Serum
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Aloe Vera Gel
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Glow Boosters
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Clay Masks
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-black text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    Links
                  </h5>
                  <ul className="space-y-2 text-primary/60 text-xs">
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Shop All
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      New Arrivals
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Best Sellers
                    </li>
                    <li className="hover:text-accent transition-colors cursor-pointer">
                      Gift Cards
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-black text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    Global
                  </h5>
                  <div className="flex gap-3 text-lg opacity-80">
                    <span
                      title="Sri Lanka"
                      className="hover:scale-125 transition-transform cursor-help"
                    >
                      🇱🇰
                    </span>
                    <span
                      title="India"
                      className="hover:scale-125 transition-transform cursor-help"
                    >
                      🇮🇳
                    </span>
                    <span
                      title="Dubai"
                      className="hover:scale-125 transition-transform cursor-help"
                    >
                      🇦🇪
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright Strip */}
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-primary/30 text-[10px] font-medium tracking-wider uppercase">
              <p>© 2026 Crystal Beauty Clear. All Rights Reserved.</p>
              <div className="flex gap-8">
                <Link to="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
