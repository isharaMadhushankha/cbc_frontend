import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <headers className='w-full h-[70px] bg-accent text-secondery flex px-5'>
      <div className="w-full h-full flex relative">
        <img src="/logo.png" className="h-[90%] ps-4 w-[100px] object-cover  left-0" />
        <div className=" flex justify-center items-center w-full gap-[20px]">
          <Link href="/">home</Link>
          <Link href="/product">product</Link>
          <Link href="/about">about</Link>
          <Link href="/contact">contact</Link>
        </div>
      </div>
    </headers>
  );
};

export default Headers;
