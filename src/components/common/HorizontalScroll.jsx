import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const HorizontalScrollSection = ({ items }) => {
  if (!items?.length) {
    return;
  }

  const [fadeState, setFadeState] = useState('text-white/0');
  const [activeIndex, setActiveIndex] = useState(0); // currently visible slide

  useEffect(() => {
    const newState = {};

    // ধরো তোমার slides = [0,1,2,3]
    slides.forEach((_, index) => {
      if (index === activeIndex) {
        newState[index] = 'text-white';
      } else {
        newState[index] = 'text-white/0';

        setTimeout(() => {
          setFadeState((prev) => ({
            ...prev,
            [index]: 'text-white/20',
          }));
        }, 0);

        setTimeout(() => {
          setFadeState((prev) => ({
            ...prev,
            [index]: 'text-white/0',
          }));
        }, 400);
      }
    });

    setFadeState(newState);
  }, [activeIndex]);

  const slides = [...items, ...items, ...items];

  const getSlideColor = (slideIndex) => fadeState[slideIndex] || 'text-white/0';

  return (
    <Swiper
      slidesPerView={1} // only one slide visible
      slidesPerGroup={1}
      loop={true}
      speed={700}
      modules={[Autoplay]}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      allowTouchMove={false}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="w-full"
    >
      {slides.map((item, i) => (
        <SwiperSlide key={i} className="flex justify-center">
          <h2
            className={`heading-home-hero-scroll whitespace-nowrap uppercase ${getSlideColor(i)}`}
          >
            {item?.text}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HorizontalScrollSection;
