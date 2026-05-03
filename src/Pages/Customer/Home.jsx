import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard';
import Loader from '../../Components/Loader';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/Product")
      .then((res) => {
        setProducts(res.data.slice(0, 4)); // Show only 4 products
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full h-[600px] bg-secondery flex items-center px-10 relative overflow-hidden">
        <div className="z-10 max-w-2xl text-white">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 animate-fadeIn">
            Crystal <span className="text-accent">Beauty</span> Clear
          </h1>
          <p className="text-lg text-primary/80 mb-8 max-w-lg">
            Discover your natural glow with our premium skincare collection. Pure ingredients for a flawless you.
          </p>
          <Link
            to="/product"
            className="bg-accent text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 w-fit hover:bg-accent/90 transition transform hover:scale-105"
          >
            Shop Now <FaArrowRight />
          </Link>
        </div>
        {/* Hero Image */}
        <div className="absolute right-[5%] top-[10%] w-[500px] h-[500px] z-10 animate-float hidden lg:block">
          <img
            src="/img1.png"
            alt="Hero"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Abstract background elements */}
        <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute right-[10%] bottom-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-2xl"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-10 bg-primary">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-secondery">Featured Products</h2>
            <div className="w-20 h-1 bg-accent mt-2"></div>
          </div>
          <Link to="/product" className="text-accent font-medium hover:underline flex items-center gap-1">
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

      {/* Benefits Section */}
      <section className="py-16 px-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 rounded-2xl bg-primary/30">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent text-2xl font-bold">100%</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Natural Ingredients</h3>
            <p className="text-secondery/70">Only the purest natural elements go into our products.</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/30">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent text-2xl font-bold">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Dermatologist Tested</h3>
            <p className="text-secondery/70">Safe and effective for all skin types.</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/30">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent text-2xl font-bold">🐰</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cruelty Free</h3>
            <p className="text-secondery/70">We never test on animals. Beauty without compromise.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
