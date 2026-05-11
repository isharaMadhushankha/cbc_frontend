import React, { useState, useRef, useEffect } from "react";
import {
  FaLeaf,
  FaShieldAlt,
  FaMagic,
  FaHeart,
  FaEye,
  FaLightbulb,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Philosophy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="py-24 px-10 bg-secondery text-white relative overflow-hidden h-[500px] flex items-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fadeIn">
              Our <span className="text-accent">Philosophy</span>
            </h1>
            <p className="text-xl text-primary/80 leading-relaxed max-w-xl">
              The principles and beliefs that guide everything we do at Crystal
              Beauty Clear. We're not just creating skincare products—we're
              building a movement toward transparency, purity, and authentic
              beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="h-[600px] px-10 bg-secondery relative overflow-hidden flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-accent font-bold tracking-widest uppercase text-xs">
                    Our Mission
                  </span>
                </div>

                <h2 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Transform <span className="text-accent italic">Beauty</span>
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-white/80 text-lg leading-relaxed font-light">
                  We believe that everyone deserves skincare that works as
                  beautifully as it feels. Our mission is to revolutionize the
                  beauty industry by proving that purity and effectiveness
                  aren't mutually exclusive.
                </p>
                <p className="text-white/70 text-base leading-relaxed font-light">
                  Through rigorous research, transparent ingredient sourcing,
                  and dermatologist-backed formulations, we're creating products
                  that deliver real results without compromise.
                </p>
              </div>

              <div className="flex gap-8 pt-8 border-t border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <p className="text-white/60 uppercase tracking-wider text-xs font-bold">
                      100% Pure
                    </p>
                  </div>
                  <p className="text-white/80 text-sm">Natural Ingredients</p>
                </div>
                <div className="w-px bg-white/10"></div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <p className="text-white/60 uppercase tracking-wider text-xs font-bold">
                      Science
                    </p>
                  </div>
                  <p className="text-white/80 text-sm">Dermatologist Tested</p>
                </div>
              </div>
            </div>

            {/* Right Visual - Image Placeholder */}
            <div className="relative group hidden lg:flex items-center justify-center">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-accent/0 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>

              <div className="relative w-full h-[400px] bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl group-hover:border-accent/40 transition-all duration-500">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative h-full flex flex-col items-center justify-center space-y-8 p-12">
                  <div className="w-28 h-28 bg-gradient-to-br from-accent/40 to-accent/10 rounded-3xl flex items-center justify-center text-accent text-6xl shadow-[0_20px_40px_rgba(255,144,19,0.2)] group-hover:shadow-[0_30px_60px_rgba(255,144,19,0.3)] transition-all duration-500 transform group-hover:scale-110">
                    <FaHeart />
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-white">
                      Pure Beauty
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                      Where nature meets science to create transformative
                      skincare
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy Pillars */}
      <section className="py-24 px-10 bg-secondery relative overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div>
                <p className="text-accent font-bold tracking-wider uppercase text-xs mb-1">
                  100% Pure
                </p>
                <p className="text-white/80 text-sm">Natural Ingredients</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div>
                <p className="text-accent font-bold tracking-wider uppercase text-xs mb-1">
                  Science
                </p>
                <p className="text-white/80 text-sm">Dermatologist Tested</p>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Core <span className="text-accent italic">Philosophy</span>
            </h2>
            <p className="text-white/70 text-lg">
              Built on these fundamental beliefs that guide our every decision
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PhilosophyCard
              icon={<FaLeaf />}
              title="Purity First"
              desc="We believe the purest ingredients create the most beautiful results. Every botanical, every element is carefully sourced to ensure you're only getting what your skin truly needs."
              delay={0}
            />
            <PhilosophyCard
              icon={<FaShieldAlt />}
              title="Science + Nature"
              desc="The best skincare marries rigorous scientific research with nature's wisdom. Our formulations are clinically tested and dermatologist-approved, proving that nature and science are perfect partners."
              delay={200}
            />
            <PhilosophyCard
              icon={<FaMagic />}
              title="Ethical Beauty"
              desc="True beauty never comes at the cost of animals or the environment. We're committed to cruelty-free practices and sustainable sourcing that respects both nature and our global community."
              delay={400}
            />
            <PhilosophyCard
              icon={<FaEye />}
              title="Complete Transparency"
              desc="We hide nothing. You'll know exactly what's in every product, why it's there, and what it does. No proprietary blends, no mystery ingredients—just honest skincare."
              delay={600}
            />
            <PhilosophyCard
              icon={<FaLightbulb />}
              title="Innovation with Purpose"
              desc="We innovate not for the sake of being trendy, but to solve real skin concerns. Every new formula is developed to address genuine needs backed by research and customer feedback."
              delay={800}
            />
            <PhilosophyCard
              icon={<FaHeart />}
              title="People Over Profit"
              desc="We measure success by how many lives we improve, not just by sales numbers. Our pricing reflects fair value, and we're committed to making quality skincare accessible to everyone."
              delay={1000}
            />
          </div>
        </div>
      </section>

      {/* The Philosophy in Action */}
      <section className="py-24 px-10 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondery mb-4">
              Philosophy in Action
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-secondery">
                  Research-Driven Development
                </h3>
                <p className="text-secondery/70 leading-relaxed">
                  Every product undergoes extensive dermatological testing and
                  consumer trials before launch. We don't just make claims—we
                  prove them.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-secondery">
                  Ethical Sourcing
                </h3>
                <p className="text-secondery/70 leading-relaxed">
                  We partner directly with sustainable farms and suppliers who
                  share our commitment to environmental responsibility and fair
                  labor practices.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-secondery">
                  Community Feedback Loop
                </h3>
                <p className="text-secondery/70 leading-relaxed">
                  Your feedback directly shapes our future products. We listen
                  to our community and continuously improve based on real-world
                  results.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-secondery">
                  Accessible Luxury
                </h3>
                <p className="text-secondery/70 leading-relaxed">
                  Premium ingredients shouldn't come with premium prices. We've
                  optimized our process to offer luxury skincare at fair,
                  accessible prices.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-accent/10 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop"
                alt="Philosophy in action"
                className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-24 px-10 bg-secondery relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Our Commitment to <span className="text-accent italic">You</span>
            </h2>
            <p className="text-primary/70 text-lg max-w-3xl mx-auto">
              These aren't just words—they're promises we keep every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CommitmentItem
              number="100%"
              label="Natural Ingredients"
              description="No synthetic fillers, no harmful chemicals—just pure, natural beauty."
            />
            <CommitmentItem
              number="0"
              label="Animal Testing"
              description="We're 100% cruelty-free and proudly certified by leading ethical organizations."
            />
            <CommitmentItem
              number="100%"
              label="Transparent Sourcing"
              description="We trace every ingredient back to its source and share that journey with you."
            />
            <CommitmentItem
              number="365"
              label="Days of Support"
              description="Our customer care team is here to help you get the most from our products, every day."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-10 bg-primary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-secondery/5 rounded-full blur-[100px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative p-16 md:p-24 rounded-[4rem] bg-secondery overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/5 group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent/10 to-transparent pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

            <div className="relative z-10 text-center space-y-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Join the <br />
                <span className="text-accent italic drop-shadow-[0_0_20px_rgba(255,144,19,0.4)]">
                  Beauty Revolution
                </span>
              </h2>
              <p className="text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Experience skincare that aligns with your values. Pure
                ingredients. Proven results. Ethical practices.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
                <Link
                  to="/product"
                  className="px-12 py-5 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,144,19,0.3)] hover:shadow-[0_25px_50px_rgba(255,144,19,0.5)] flex items-center justify-center"
                >
                  Explore Our Collection
                </Link>
                <Link
                  to="/about"
                  className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center"
                >
                  Our Story
                </Link>
              </div>
            </div>

            <div className="absolute bottom-[-10%] left-[-5%] text-white/5 text-[20rem] font-black pointer-events-none rotate-12">
              CBC
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PhilosophyCard = ({ icon, title, desc, delay }) => {
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
      className={`p-7 rounded-2xl backdrop-blur-3xl bg-white/5 border border-white/10 text-left shadow-lg transition-all duration-1000 transform min-h-[240px] flex flex-col justify-between ${
        isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 -translate-x-10 scale-95"
      } hover:bg-white/8 hover:border-accent/40 hover:-translate-y-3 hover:shadow-xl transition-all duration-500 group cursor-default`}
    >
      <div>
        <div className="w-14 h-14 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-5 group-hover:from-accent/50 group-hover:to-accent/20 transition-all duration-500 shadow-[0_0_15px_rgba(255,144,19,0.2)]">
          {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-primary/65 text-sm leading-relaxed group-hover:text-primary/85 transition-colors duration-300">
        {desc}
      </p>
    </div>
  );
};

const CommitmentItem = ({ number, label, description }) => {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group">
      <div className="text-5xl font-bold text-accent mb-4 group-hover:text-white transition-colors duration-300">
        {number}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{label}</h3>
      <p className="text-primary/70 leading-relaxed">{description}</p>
    </div>
  );
};

export default Philosophy;
