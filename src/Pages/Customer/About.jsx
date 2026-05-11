import React, { useEffect, useRef, useState } from "react";
import { FaLeaf, FaShieldAlt, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full flex flex-col min-h-screen  bg-primary">
      {/* Hero Section */}
      <section className="py-24 px-10 bg-secondery text-white relative overflow-hidden h-[600px] flex items-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fadeIn">
              Our Story. <br />
              <span className="text-accent">Purity</span> in every drop.
            </h1>
            <p className="text-xl text-primary/80 leading-relaxed max-w-xl">
              At Crystal Beauty Clear, we believe that true beauty starts with
              the purest ingredients. Our mission is to provide skincare that
              doesn't just look good, but feels good and does good.
            </p>
          </div>

          {/* 3D Product Element */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Watermark Design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[15rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12">
              CBC
            </div>

            <div className="absolute w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative animate-float z-10">
              <img
                src="/img5.png"
                alt="3D Crystal Bottle"
                className="w-[350px] h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.6)] transform -rotate-6 hover:rotate-0 transition-transform duration-700 cursor-pointer"
              />
            </div>
            {/* Decorative crystal-like elements */}
            <div className="absolute top-0 right-10 w-4 h-4 bg-accent/40 rounded-full animate-bounce delay-100"></div>
            <div className="absolute bottom-10 left-20 w-3 h-3 bg-white/20 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-secondery mb-4">
                Who We Are
              </h2>
              <div className="w-20 h-1.5 bg-accent rounded-full"></div>
            </div>
            <p className="text-secondery/70 text-lg leading-relaxed">
              Founded in 2024, Crystal Beauty Clear emerged from a simple
              realization: the beauty industry needed more transparency. We
              wanted to create a brand that uses clinical research to harness
              the power of natural elements.
            </p>
            <p className="text-secondery/70 text-lg leading-relaxed">
              Every formula we create is a balance of science and nature,
              meticulously tested to ensure it delivers the results you deserve
              without any harmful additives.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondery/70 to-secondery rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl"></div>
            <div className="relative w-full h-[500px] rounded-3xl transition-transform duration-500 group-hover:-translate-y-2 flex items-center justify-center p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(0, 0, 0, 0.4) 100%)",
                backdropFilter: "blur(10px)"
              }}>
              {/* Premium gradient decorative elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-accent/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
              <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-2xl"></div>
              
              <img
                src="/cbc_drop.png"
                alt="CBC Drop Product"
                className="relative w-64 h-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_20px_40px_rgba(139,92,246,0.4)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Prism Design */}
      <section className="h-[650px] px-10 bg-secondery relative overflow-hidden flex items-center">
        {/* Abstract 3D background elements */}
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-3">
                Our Principles
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Our Core <span className="text-accent italic">Values</span>
              </h3>
            </div>
            <p className="text-primary/60 text-sm max-w-sm lg:text-right">
              The foundational principles that guide every formula we create and
              every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
            <ValueCard
              icon={<FaLeaf />}
              number="01"
              title="100% Natural"
              desc="We source only the finest botanicals and pure elements."
              delay={0}
              offset="lg:translate-y-0"
            />
            <ValueCard
              icon={<FaShieldAlt />}
              number="02"
              title="Science Backed"
              desc="Our products are dermatologist-tested and clinical."
              delay={200}
              offset="lg:translate-y-8"
            />
            <ValueCard
              icon={<FaMagic />}
              number="03"
              title="Cruelty Free"
              desc="We never test on animals and ensure ethical standards."
              delay={400}
              offset="lg:translate-y-16"
            />
          </div>
        </div>
      </section>

      {/* Call to Action - Crystal Portal */}
      <section className="py-24 px-10 relative overflow-hidden bg-primary">
        {/* Background ambient glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-secondery/5 rounded-full blur-[100px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative p-16 md:p-24 rounded-[4rem] bg-secondery overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/5 group">
            {/* Inner decorative elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent/10 to-transparent pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

            <div className="relative z-10 text-center space-y-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Experience the <br />
                <span className="text-accent italic drop-shadow-[0_0_20px_rgba(255,144,19,0.4)]">
                  Glow
                </span>{" "}
                Today
              </h2>
              <p className="text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Join thousands of customers who have transformed their skin with
                Crystal Beauty Clear. Your journey to radiant skin begins here.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
                <Link
                  to="/product"
                  className="px-12 py-5 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,144,19,0.3)] hover:shadow-[0_25px_50px_rgba(255,144,19,0.5)] flex items-center justify-center"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/philosophy"
                  className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center"
                >
                  Our Philosophy
                </Link>
              </div>
            </div>

            {/* Decorative crystal icon */}
            <div className="absolute bottom-[-10%] left-[-5%] text-white/5 text-[20rem] font-black pointer-events-none rotate-12">
              CBC
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, desc, delay, number, offset }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`p-10 rounded-[3rem] backdrop-blur-3xl bg-white/5 border border-white/10 text-left shadow-2xl transition-all duration-1000 transform relative overflow-hidden group cursor-default ${offset} ${
        isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 -translate-x-10 scale-95"
      } hover:bg-white/10 hover:border-accent/30 hover:-translate-y-4 transition-all duration-500`}
    >
      {/* Background Numbering */}
      <div className="absolute top-[-10%] right-[-5%] text-white/5 text-[12rem] font-black leading-none pointer-events-none group-hover:text-accent/5 transition-colors duration-500">
        {number}
      </div>

      <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent text-3xl mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,144,19,0.3)]">
        {icon}
      </div>

      <h3 className="text-3xl font-bold text-white mb-4 relative z-10 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-primary/60 leading-relaxed text-lg relative z-10 group-hover:text-primary/90 transition-colors duration-300">
        {desc}
      </p>

      {/* Interactive corner accent */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-r-[40px] border-r-accent/0 group-hover:border-r-accent/20 transition-all duration-500"></div>
    </div>
  );
};

export default About;
