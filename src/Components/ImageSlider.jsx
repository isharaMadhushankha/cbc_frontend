import React, { useState } from 'react'

const ImageSlider = (props) => {
    const images = props.images;
    const [activeimage,setactiveimage] = useState(0);

  return (
    <div className='w-[400px] flex flex-col gap-2 '>
        <img className='w-full h-[400px] object-cover' src={images[activeimage]}/>
        
        <div className='w-full h-[100px] flex justify-center items-center gap-3 border-[1px] border-gray-500'>
           {
             images.map(
                (img,index)=>{
                    return(
                        <img onClick={()=>{
                            setactiveimage(index)
                        }} key={index} className={'w-[90px] h-[90px] object-cover border-[1px] border-gray-300'+ (activeimage === index ? 'border-[4px] border-accent':'')} src={img}/>
                    )
                }
            )
           }
        </div>
    </div>
  )
}

export default ImageSlider