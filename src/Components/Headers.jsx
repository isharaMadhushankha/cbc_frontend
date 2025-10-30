import React from "react";

const Headers = () => {
  return (
    <headers className='w-full h-[70px] bg-accent text-secondery flex px-5'>
      <div className="w-full h-full flex relative">
        <img src="/logo.png" className="h-[90%] ps-4 w-[100px] object-cover  left-0" />
        <div className=" flex justify-center items-center w-full gap-[20px]">
          <a href="/">home</a>
          <a href="/product">product</a>
          <a href="/about">about</a>
          <a href="/contact">contact</a>
        </div>
      </div>
    </headers>
  );
};

export default Headers;
