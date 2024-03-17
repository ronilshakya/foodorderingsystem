import { useState, useEffect } from 'react';
import { GoDotFill } from "react-icons/go";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import coverimg1 from './img/1.jpg';
import coverimg2 from './img/2.jpg';
import coverimg3 from './img/3.jpg';

const sliderData = [
    { id: 1, image: coverimg1 },
    { id: 2, image: coverimg2 },
    { id: 3, image: coverimg3 },
];

const ImageCarousel = () => {
    const [current, setCurrent] = useState(0);
    const length = sliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };
    
      if (!Array.isArray(sliderData) || sliderData.length <= 0) {
        return null;
      }

    return (
        <div className='flex justify-center items-center gap-2 w-full'>
            <FaArrowAltCircleLeft className='w-56' onClick={prevSlide} />
            <div>
                {sliderData.map((slide) => (
                    <div key={slide.id} className={`z-0  ${current === slide.id - 1 ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 transition-opacity duration-1000'}`}>
                        {current === slide.id - 1 && (
                            <div>
                                <div className={`overflow-hidden rounded-lg`}>
                                    <img src={slide.image} alt="image" />
                                </div>
                                <div className='flex justify-center mt-2'>
                                    {sliderData.map((_, i) => (
                                        <span key={i}>
                                            <GoDotFill style={{ color: `${i === current ? "red" : "black"}` }} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <FaArrowAltCircleRight className='w-56' onClick={nextSlide} />
        </div>
    );
};

export default ImageCarousel;
