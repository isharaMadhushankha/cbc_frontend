import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader';
import ImageSlider from '../../Components/ImageSlider';

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
    <div className='w-full h-[calc(100vh-70px)] flex text-secondery'>
        {
            state == "Loading" && <Loader/>
        }
        {
            state =="success" && ( <div className='w-full h-full flex flex-row'>
                <div className='w-[50%] h-full flex justify-center items-center'>
                    <ImageSlider images={product.images}/>
                </div>
                <div className='w-[50%] h-full  flex flex-col items-center p-6'>
                <span>{product.productId}</span>
                <h1 className='text-2xl font-bold text-center '>{product.name}
                  {
                    product.altName.map((names,index)=>{
                      return (
                        <span className=" font-normal text-secondery/70" key={index}>{" | " + names}</span>
                      )
                    })
                  }
                </h1>
                <p className='mt-[30px] text-justify'>{product.discription}</p>
                <span className='rounded-full w-[100px] h-[30px] border-[2px] border-secondery text-center mt-2 bg-accent/40'>{product.catagory}</span>
                {
                  product.labeledPrice > product.price ? 
                  <div className='text-center'>
                    <p className='text-xl text-accent '>LKR : {product.price.toFixed(2)}</p>
                    <p className='line-through text-secondery/80'>LKR : {product.labeledPrice.toFixed(2)}</p>
                  </div>: <p  className='text-xl text-accent'>{product.price}</p>
                }
                <div className='flex gap-4 mt-6 '>
                  <button className='w-[200px] h-[40px] bg-accent'>Add to cart</button>
                  <button className='w-[200px] h-[40px] border-accent border'>By Now</button>
                </div>

                </div>
              
            </div>

            )
            
        }
        {
            state=="error" && <div>Fiild to lead the product details</div>
        }
    </div>
  )
}

export default ProductOverView