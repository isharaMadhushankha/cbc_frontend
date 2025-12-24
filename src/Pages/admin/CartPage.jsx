import React, { useEffect, useState } from 'react'
import { addToCart, getTotal, LoadCart } from '../../utils/Cart'
import { FaChevronCircleUp } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { TbTrash } from 'react-icons/tb';
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const CartPage = () => {
    
    
    const [cart,setacart] = useState(LoadCart());
    
    console.log(cart);
  return (
    <div className='w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center'>
        <div className='w-[600px] h-[400px] flex  items-center flex-col  gap-2'>
            {
                cart.map((item,index)=>{
                    return(
                       <div key={index} className='w-full h-[100px] bg-white flex relative'>
                            <button className='absolute text-red-500 right-[-50px] top-[40px] text-xl  aspect-square hover:bg-red-600 hover:text-white p-2 rounded-full'><BiTrash onClick={()=>{
                                addToCart(item,-item.quantity);
                                setacart(LoadCart());
                            }}/></button>
                            <img className='h-full aspect-square object-cover' src={item.images[0]}/>
                            <div  className='w-[250px] h-full flex flex-col ps-3'>
                            <h1 className='font-semibold text-lg ps-2'>{item.name}</h1>
                            <span className='text-secondery/70 ps-2 text-sm'>{item.productId}</span>
                           
                            </div>
                             <div className='w-[100px] h-full flex flex-col justify-center items-center  gap-1'>
                                <FaChevronCircleUp onClick={()=>{
                                    addToCart(item,1);
                                    setacart(LoadCart);
                                }} className='text-xl'/>
                                <span className='bg-accent/20 w-[30px] h-[30px] rounded-full text-center'>{item.quantity}</span>
                                <FaChevronCircleDown onClick={()=>{
                                    addToCart(item,-1);
                                    setacart(LoadCart);
                                }} className='text-xl'/>

                             </div>
                             <div className='w-[100px] h-full flex justify-center items-center'>
                               {
                                item.labeledPrice > item.price ?<div className='text-center'>
                                    <p className='text-accent font-semibold'>LKR {item.price.toFixed(2)}</p>
                                    <p className='line-through text-secondery/80'>LKR {item.labeledPrice.toFixed(2)}</p>
                                    <p className='text-secondery/80'>{(item.price * item.quantity).toFixed(2)}</p>
                                </div> : <p className='text-accent font-semibold'>LKR {item.price.toFixed(2)}</p>
                               }
                             </div>

                       </div>
                    )
                })
            }
            <div className='w-full h-[100px] bg-white flex flex-row  items-center'>
               <div className='w-[400px] h-full flex  items-center pe-4 bg-yellow-100'>
                <Link state={cart} className='bg-accent ms-[20px]  text-primary font-semibold px-4 py-2 rounded hover:bg-accent/80 hover:text-secondery' to="/checkout">Proceed to Checkout</Link>
                <h1 className='font-semibold text-lg ps-[120px]'>Total  :</h1>
               </div>
               <div className='flex w-[200px] text-center items-center justify-center'>
                <span className='text-accent w-full font-semibold'>LKR {getTotal(cart).toFixed(2)}</span>
               </div>
            </div>
            
        </div>
        
    </div>

  )
}

export default CartPage