import { useState } from "react";

const Testpage = () => {
  // use state provide two things as array( first one is variable. second one is function. we can give initail number for the variable)
  const [count, setcount] = useState(150);
  console.log(count);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-[300px] w-[400px] bg-amber-100 flex items-center justify-center gap-3">
        <button
          onClick={() => {
            console.log("adding");
            setcount(400);
          }}
          className="w-[100px] bg-accent">
          +
        </button>
        <span className="text-accent ">{count}</span>
        <button
          onClick={() => {
            console.log("subtraction");
            setcount(100);
          }}
          className="w-[100px] bg-accent" >
          -
        </button>
      </div>
    </div>
  );
};

export default Testpage;
