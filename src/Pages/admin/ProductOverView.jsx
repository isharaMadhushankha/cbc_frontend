import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader';
import ImageSlider from '../../Components/ImageSlider';
import { addToCart, LoadCart } from '../../utils/Cart';

const ProductOverView = () => {
    // const location = useLocation();// use to get the product detials
    // const product  = location.state;


  const params = useParams(); // this get the product id from the url that attach with product id
  console.log(params)
  //
  const [state,setState] = useState("Loading");
  const [product,setProduct] = useState(null);


  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_URL+ "/api/Product/"+params.id).then((res)=>{
    console.log(res.data);
    setProduct(res.data);
    setState("success");
    toast.success(res.data.productId+"Load succuessfully")
  }).catch(()=>{
    setState("error")
    toast.error("Failed to fetch the data");
  })
  },[])
    
  return (
    <div className='w-full min-h-[calc(100vh-70px)] bg-secondery flex items-center justify-center p-6 relative overflow-hidden font-sans'>
      {/* Modern Watermark Design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[25rem] font-black pointer-events-none select-none tracking-tighter z-0 -rotate-12 animate-float">
        CBC
      </div>
      <div className="absolute top-20 right-10 text-white/[0.03] font-outline text-8xl font-black pointer-events-none select-none vertical-text tracking-[0.5em] z-0 opacity-20">
        BEAUTY
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl w-full h-full lg:h-[460px] bg-white/[0.03] backdrop-blur-3xl rounded-[30px] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 flex flex-col lg:flex-row">
        
        {state === "Loading" && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}

        {state === "success" && (
          <>
            {/* Left side: Image Section */}
            <div className="w-full lg:w-[45%] h-full bg-white/5 flex items-center justify-center relative group p-6">
              <ImageSlider images={product.images}/>
            </div>

            {/* Right side: Info Section */}
            <div className="w-full lg:w-[55%] h-full p-8 lg:p-14 flex flex-col justify-center">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[10px] text-accent font-bold tracking-[0.4em] uppercase">#{product.productId}</span>
                  <div className="h-[1px] w-10 bg-accent/20"></div>
                  <span className="text-[10px] text-white/40 font-semibold tracking-[0.2em] uppercase">{product.catagory}</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 uppercase leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.altName.map((name, index) => (
                    <span key={index} className="text-xs font-medium text-accent/80 tracking-wide">
                      {index > 0 && " • "} {name}
                    </span>
                  ))}
                </div>

                <div className="w-16 h-[2px] bg-accent/40 rounded-full mb-6"></div>

                <p className="text-white/70 text-[13px] leading-relaxed text-justify mb-8 font-normal tracking-wide max-w-[90%]">
                  {product.discription}
                </p>

                <div className="flex items-end gap-5 mb-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-1">Premium Price</span>
                    <span className="text-4xl font-bold text-accent tracking-tighter">
                      LKR {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  {product.labeledPrice > product.price && (
                    <span className="text-lg text-white/20 line-through mb-1.5 font-medium">
                      LKR {product.labeledPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Added to cart");
                    }} 
                    className="flex-1 h-14 bg-accent hover:bg-[#FFAC4D] text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] shadow-[0_12px_24px_-8px_rgba(255,144,19,0.5)] hover:scale-[1.02] active:scale-95"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={'/checkout'} 
                    state={[{
                      images: product.images,
                      productId: product.productId,
                      name: product.name,
                      price: product.price,
                      labeledPrice: product.labeledPrice,
                      quantity: 1
                    }]} 
                    className="flex-1 h-14 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] flex items-center justify-center hover:scale-[1.02] active:scale-95"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {state === "error" && (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-10">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-xl font-bold">Failed to load product details</p>
            <Link to="/product" className="mt-4 text-accent underline">Back to Collection</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductOverView