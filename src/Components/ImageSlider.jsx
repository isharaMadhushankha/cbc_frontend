import React, { useState } from 'react'

const ImageSlider = ({ images }) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className='w-full max-w-[400px] flex flex-col gap-3'>
            <div className='w-full h-[250px] lg:h-[280px] rounded-2xl overflow-hidden bg-white/5 border border-white/10'>
                <img 
                    className='w-full h-full object-contain p-4' 
                    src={images[activeImage]} 
                    alt="Active product" 
                />
            </div>
            
            <div className='w-full h-[70px] flex justify-center items-center gap-2'>
                {images.map((img, index) => (
                    <div 
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                            activeImage === index ? 'border-accent scale-110' : 'border-white/10 hover:border-white/30'
                        }`}
                    >
                        <img 
                            className='w-full h-full object-cover' 
                            src={img} 
                            alt={`Thumbnail ${index}`} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;