import { useState, useEffect } from 'react';
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import useGetCarouselImage from '../../../../hooks/useGetCarouselImage';

const ImageCarousel = () => {
    const {getCarouselImagefunction, getCarouselImages} = useGetCarouselImage();

    useEffect(()=>{
        getCarouselImagefunction()
    },[getCarouselImages])

    const [current, setCurrent] = useState(0);
    const length = getCarouselImages.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };
    
      if (!Array.isArray(getCarouselImages) || getCarouselImages.length <= 0) {
        return null;
      }

    return (
        <>
            <div className='relative'>
                <div className='relative h-44 overflow-hidden rounded-lg md:h-80'>
                    <div>
                        {getCarouselImages.map((slide, index) => (
                            <div key={index} className={`z-0 ${current === index ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 transition-opacity duration-1000'}`}>
                                {current === index && (
                                    <div>
                                        <div className=''>
                                            <img src={`${import.meta.env.VITE_BASE_URL}/carousel/${slide.carouselImage}`} alt="image" className='rounded-xl absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={prevSlide} className='absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 group-hover:bg-white/100 group-focus:outline-none">
                            <IoIosArrowBack />
                        </span>
                    </button>
                    <button onClick={nextSlide} className='absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 group-hover:bg-white/100 group-focus:outline-none">
                            <IoIosArrowForward />
                        </span>
                    </button>
                </div>
                <div className='flex justify-center mt-2'>
                    {getCarouselImages.map((_, i) => (
                        <span key={i}>
                            <GoDotFill style={{ color: `${i === current ? "red" : "black"}` }} />
                        </span>
                    ))}
                </div>
        </div>
        </>
    );
};

export default ImageCarousel;
