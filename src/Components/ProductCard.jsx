import React from "react";

const ProductCard = (props) => {
    console.log(props);
  return (
    <div className="prodductCard">
        <img className="productimage" src={props.img}/>
        <h2>{props.name}</h2>
        <p>{props.dis}</p>
        <p>{props.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
