
import { useState } from "react";
import MediaUpload from "../utils/MediaUpload";


const Testpage = () => {
  // use state provide two things as array( first one is variable. second one is function. we can give initail number for the variable)
  const [file,setfile]=useState(null);
   
  async function uploadimage(){

    const link = await MediaUpload(file)
    console.log(link);

  }


  return (
    <div className="h-full w-full flex items-center justify-center">
      <input type="file" onChange={(e)=>{
        setfile(e.target.files[0])
      }}/>

      <button className="bg-accent"  onClick={uploadimage} >
          submit
      </button>
    </div>
    
  );
};

export default Testpage;
