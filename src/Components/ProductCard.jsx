import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
   const product = props.product;
 
  return (
    <div className="w-[300px] h-[400px] shadow-2xl m-3 flex flex-col p-2">
        <img className="w-full h-[250px] object-cover" src={product.images[0]} />
        <h1 className="text-xl font-bold text-secondery ">{product.name}</h1>
        {
          product.labeledPrice > product.price ? 
          <div className="flex gap-3 items-center">
            <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
            <p className="text-lg text-secondery font-semibold line-through">LKR {product.labeledPrice.toFixed(2)}</p>
            
          </div> :
          <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
          
        }
        <p className="text-secondery/70 ">{product.productId}</p>
        <p className="text-secondery/70 ">{product.catagory}</p>
        <Link  to={"/overview/"+ product.productId} className="w-full border text-center border-accent rounded hover:bg-accent">View Product</Link>
    </div> // state={product} state use to crray the product data to overview
  );
};

export default ProductCard;
