import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';
import ProductCard from '../../Components/ProductCard';

const ProductPage = () => {
    const [product,setproduct] = useState([]);
    const [isloading,setisloading] = useState(true);
    
    useEffect(()=>{ // useeffect go back end load the data only one time
        if(isloading){
            axios.get(import.meta.env.VITE_API_URL + "/api/Product").then((response)=>{
                setproduct(response.data);
                setisloading(false);
            }).catch((error)=>{
                console.error("Error fetching product:"+error);
                setisloading(false);
                toast.error("Failed to load the product");
            })
                


            
        }
    },[]) // write about first time load of this page 

  return (
    <div className='w-full min-h-[calc(100vh-70px)] bg-primary flex '>
        {
            isloading ? <Loader/> : <div className='w-full h-full flex flex-row flex-wrap justify-center items-center '> 
                {
                    product.map((item)=>{
                        return <div>
                            <ProductCard key={item.productID} product={item}/>
                        </div>
                    })

                }
               
            </div> // flex wrap mean - when incres the product horizantal side, it automaticaly go new line when not enough
        }
    </div>
  )
}

export default ProductPage