import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';
import ProductCard from '../../Components/ProductCard';

const ProductPage = () => {
  const [product, setproduct] = useState([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => { // useeffect go back end load the data only one time
    if (isloading) {
      axios.get(import.meta.env.VITE_API_URL + "/api/Product").then((response) => {
        setproduct(response.data);
        setisloading(false);
      }).catch((error) => {
        console.error("Error fetching product:" + error);
        setisloading(false);
        toast.error("Failed to load the product");
      })




    }
  }, []) // write about first time load of this page 

  return (
    <div className="w-full min-h-[calc(100vh-70px)] bg-secondery py-8 px-10 relative overflow-hidden">
      {/* Modern Watermark Design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[20rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12 animate-float">
        CBC
      </div>
      <div className="absolute top-20 right-10 text-white/[0.03] font-outline text-8xl font-black pointer-events-none select-none vertical-text tracking-[0.5em] z-0 opacity-20">
        BEAUTY
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-sm lg:text-base font-bold text-white leading-none">
            Crystal <span className="text-accent italic font-serif">Collection</span>
          </h1>
          <div className="w-8 h-0.5 bg-accent rounded-full mt-1"></div>
        </div>

        {isloading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.map((item) => (
              <ProductCard key={item.productId} product={item} />
            ))}
          </div>
        )}

        {!isloading && product.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-white">
            <div className="text-6xl opacity-20">🛍️</div>
            <p className="opacity-50 font-medium italic">No products found in our collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage